#!/usr/bin/env ash
set -e

export PATH=$PATH:/usr/local/bin

echo "=== sing-box 极简版（IPv6 + Reality）==="

REALITY_PORT=${1:-41000}
DOMAIN=$2
INPUT_IPV6=$3

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

echo "生成 Reality 密钥..."
KEY_PAIR=$(/usr/local/bin/sing-box generate reality-keypair)
PRIVATE_KEY=$(echo "$KEY_PAIR" | grep PrivateKey | awk '{print $2}')
PUBLIC_KEY=$(echo "$KEY_PAIR" | grep PublicKey | awk '{print $2}')

# ===== IPv6 获取 =====
if [ -n "$INPUT_IPV6" ]; then
  IPV6="$INPUT_IPV6"
else
  IPV6=$(curl -6 -s --max-time 3 ifconfig.me || true)
fi

# IPv6 格式处理
HOST_V6=$(echo "$IPV6" | grep -q ":" && echo "[$IPV6]" || echo "$IPV6")

# 优先域名
if [ -n "$DOMAIN" ]; then
  HOST="$DOMAIN"
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
      "users": [
        { "uuid": "$UUID" }
      ],
      "tls": {
        "enabled": true,
        "reality": {
          "enabled": true,
          "handshake": {
            "server": "www.cloudflare.com",
            "server_port": 443
          },
          "private_key": "$PRIVATE_KEY",
          "short_id": ["a1b2"]
        }
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
echo "========= Reality 节点 ========="

echo "vless://$UUID@$HOST:$REALITY_PORT?encryption=none&security=reality&sni=www.cloudflare.com&fp=chrome&pbk=$PUBLIC_KEY&sid=a1b2&type=tcp#Reality"

echo ""
echo "UUID: $UUID"
echo "PublicKey: $PUBLIC_KEY"

# mkdir singbox
# cd singbox
# curl -O https://raw.githubusercontent.com/raclen/raclen.github.io/refs/heads/master/demo/singbox/install.sh
# chmod +x install.sh
# ash install.sh 41000 www.cloudflare.com 2a01:4f9:4b:f33b::a