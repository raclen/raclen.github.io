#!/usr/bin/env ash
set -e

export PATH=$PATH:/usr/local/bin

echo "=== sing-box 精简版（Reality + Hy2）==="

REALITY_PORT=${1:-41000}
HY2_PORT=${2:-42000}
DOMAIN=$3
INPUT_IPV4=$4
INPUT_IPV6=$5

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

echo "生成 Reality 密钥..."
KEY_PAIR=$(/usr/local/bin/sing-box generate reality-keypair)
PRIVATE_KEY=$(echo "$KEY_PAIR" | grep PrivateKey | awk '{print $2}')
PUBLIC_KEY=$(echo "$KEY_PAIR" | grep PublicKey | awk '{print $2}')

echo "生成 Hy2 自签证书..."
openssl req -x509 -newkey rsa:2048 -nodes \
-keyout /etc/sing-box/key.pem \
-out /etc/sing-box/cert.pem \
-days 3650 \
-subj "/CN=www.bing.com"

# ===== IP 获取 =====
[ -z "$INPUT_IPV4" ] && IPV4=$(curl -4 -s --max-time 3 ifconfig.me || true) || IPV4=$INPUT_IPV4
[ -z "$INPUT_IPV6" ] && IPV6=$(curl -6 -s --max-time 3 ifconfig.me || true) || IPV6=$INPUT_IPV6

format_host() {
  echo "$1" | grep -q ":" && echo "[$1]" || echo "$1"
}

HOST_V4=$(format_host "$IPV4")
HOST_V6=$(format_host "$IPV6")

# 优先域名
if [ -n "$DOMAIN" ]; then
  HOST="$DOMAIN"
elif [ -n "$IPV4" ]; then
  HOST="$HOST_V4"
else
  HOST="$HOST_V6"
fi

echo "连接地址: $HOST"

# ===== 配置 =====
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
          "short_id": ["a1b2","c3d4"]
        }
      }
    },
    {
      "type": "hysteria2",
      "listen": "::",
      "listen_port": $HY2_PORT,
      "users": [{ "password": "$HY_PASS" }],
      "tls": {
        "enabled": true,
        "certificate_path": "/etc/sing-box/cert.pem",
        "key_path": "/etc/sing-box/key.pem"
      }
    }
  ],

  "outbounds": [
    { "type": "direct" }
  ]
}
EOF

# ===== OpenRC =====
cat > /etc/init.d/sing-box <<'EOF'
#!/sbin/openrc-run

name="sing-box"
command="/usr/local/bin/sing-box"
command_args="run -c /etc/sing-box/config.json"
command_background=true
pidfile="/run/sing-box.pid"

depend() {
    need net
}
EOF

chmod +x /etc/init.d/sing-box
rc-service sing-box restart
rc-update add sing-box

# ===== 输出 =====
echo ""
echo "========= 节点 ========="

echo ""
echo "[Reality]"
echo "vless://$UUID@$HOST:$REALITY_PORT?encryption=none&security=reality&sni=www.cloudflare.com&fp=chrome&pbk=$PUBLIC_KEY&sid=a1b2&type=tcp#Reality"

echo ""
echo "[Hysteria2]"
echo "hysteria2://$HY_PASS@$HOST:$HY2_PORT?sni=www.bing.com&alpn=h3&insecure=1#Hy2"

echo ""
echo "UUID: $UUID"
echo "PublicKey: $PUBLIC_KEY"

# mkdir singbox
# cd singbox
# curl -O https://raw.githubusercontent.com/raclen/raclen.github.io/refs/heads/master/demo/singbox/install.sh
# chmod +x install.sh
# sudo ash install.sh 41000 42000 43000 "" "" 2a01:4f9:4b:f33b::a