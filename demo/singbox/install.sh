#!/usr/bin/env ash
set -e

export PATH=$PATH:/usr/local/bin

echo "=== sing-box 极简版（IPv6 + Hy2）==="

HY2_PORT=${1:-42000}
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

HY_PASS=$(openssl rand -hex 8)

echo "生成自签证书..."
openssl req -x509 -newkey rsa:2048 -nodes \
-keyout /etc/sing-box/key.pem \
-out /etc/sing-box/cert.pem \
-days 3650 \
-subj "/CN=www.bing.com"

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
      "type": "hysteria2",
      "listen": "::",
      "listen_port": $HY2_PORT,
      "users": [
        { "password": "$HY_PASS" }
      ],
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
echo "========= Hysteria2 节点 ========="

echo "hysteria2://$HY_PASS@$HOST:$HY2_PORT?sni=www.bing.com&alpn=h3&insecure=1#Hy2"

echo ""
echo "Password: $HY_PASS"

# mkdir singbox
# cd singbox
# curl -O https://raw.githubusercontent.com/raclen/raclen.github.io/refs/heads/master/demo/singbox/install.sh
# chmod +x install.sh
# ash install.sh 41000 "" 2a01:4f9:4b:f33b::a