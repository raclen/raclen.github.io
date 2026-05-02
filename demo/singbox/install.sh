#!/usr/bin/env ash
set -e

export PATH=$PATH:/usr/local/bin

REALITY_PORT=${1:-41000}
HY2_PORT=${2:-42000}
ANY_PORT=${3:-43000}

INPUT_DOMAIN=$4
INPUT_IPV4=$5
INPUT_IPV6=$6

echo "=== sing-box 终极部署版 ==="

apk add --no-cache curl openssl ca-certificates

VERSION='1.13.11'

cd /usr/local

echo "下载 sing-box..."
curl -LO https://github.com/SagerNet/sing-box/releases/download/v${VERSION}/sing-box-${VERSION}-linux-amd64-musl.tar.gz

tar -xzf sing-box-${VERSION}-linux-amd64-musl.tar.gz
mv sing-box-${VERSION}-linux-amd64-musl/sing-box /usr/local/bin/
chmod +x /usr/local/bin/sing-box

mkdir -p /etc/sing-box

UUID=$(cat /proc/sys/kernel/random/uuid)
HY_PASS=$(openssl rand -hex 8)

KEY_PAIR=$(/usr/local/bin/sing-box generate reality-keypair)
PRIVATE_KEY=$(echo "$KEY_PAIR" | grep PrivateKey | awk '{print $2}')
PUBLIC_KEY=$(echo "$KEY_PAIR" | grep PublicKey | awk '{print $2}')

# ========= IP / 域名处理 =========

# 自动获取 IP（fallback）
[ -z "$INPUT_IPV4" ] && IPV4=$(curl -4 -s --max-time 5 ifconfig.me || true) || IPV4=$INPUT_IPV4
[ -z "$INPUT_IPV6" ] && IPV6=$(curl -6 -s --max-time 5 ifconfig.me || true) || IPV6=$INPUT_IPV6

DOMAIN=$INPUT_DOMAIN

# host 格式化
format_host() {
  IP="$1"
  echo "$IP" | grep -q ":" && echo "[$IP]" || echo "$IP"
}

HOST_V4=$(format_host "$IPV4")
HOST_V6=$(format_host "$IPV6")

# 优先使用域名
if [ -n "$DOMAIN" ]; then
  CONNECT_HOST="$DOMAIN"
elif [ -n "$IPV4" ]; then
  CONNECT_HOST="$HOST_V4"
else
  CONNECT_HOST="$HOST_V6"
fi

echo "使用连接地址: $CONNECT_HOST"

# ========= 配置 =========

cat > /etc/sing-box/config.json <<EOF
{
  "log": { "level": "error" },
  "inbounds": [
    {
      "type": "vless",
      "listen": "::",
      "listen_port": $REALITY_PORT,
      "users": [{ "uuid": "$UUID" }],
      "tls": {
        "enabled": true,
        "reality": {
          "enabled": true,
          "handshake": {
            "server": "www.cloudflare.com",
            "server_port": 443
          },
          "private_key": "$PRIVATE_KEY",
          "short_id": ["a1b2","c3d4","e5f6"]
        }
      }
    },
    {
      "type": "hysteria2",
      "listen": "::",
      "listen_port": $HY2_PORT,
      "users": [{ "password": "$HY_PASS" }]
    }
  ],
  "outbounds": [{ "type": "direct" }]
}
EOF

# ========= 启动 =========

cat > /etc/init.d/sing-box <<'INITEOF'
#!/sbin/openrc-run
command="/usr/local/bin/sing-box"
command_args="run -c /etc/sing-box/config.json"
command_background=true
depend() { need net; }
INITEOF

chmod +x /etc/init.d/sing-box
rc-service sing-box start
rc-update add sing-box

# ========= 输出 =========

echo ""
echo "========= 节点 ========="

echo ""
echo "[Reality]"
echo "vless://$UUID@$CONNECT_HOST:$REALITY_PORT?encryption=none&security=reality&sni=www.cloudflare.com&fp=chrome&pbk=$PUBLIC_KEY&sid=a1b2&type=tcp#Reality"

echo ""
echo "[Hysteria2]"
echo "hysteria2://$HY_PASS@$CONNECT_HOST:$HY2_PORT?sni=www.bing.com&alpn=h3&insecure=1#Hy2"

echo ""
echo "UUID: $UUID"
echo "PublicKey: $PUBLIC_KEY"

# mkdir singbox
# cd singbox
# curl -O https://raw.githubusercontent.com/raclen/raclen.github.io/refs/heads/master/demo/singbox/install.sh
# chmod +x install.sh
# sudo ash install.sh 41000 42000 43000 www.cloudflare.com "" 2a01:4f9:4b:f33b::a