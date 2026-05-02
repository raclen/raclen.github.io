#!/usr/bin/env ash
set -e

echo "=== NAT高位端口 sing-box 部署 (Alpine Linux) ==="

REALITY_PORT=${1:-41000}
HY2_PORT=${2:-42000}
ANY_PORT=${3:-43000}

# Alpine 使用 apk 包管理器
apk update
apk add --no-cache curl openssl ca-certificates

VERSION='1.13.11'

curl -LO https://github.com/SagerNet/sing-box/releases/download/v${VERSION}/sing-box-${VERSION}-linux-amd64-musl.tar.gz

tar -xzf sing-box-${VERSION}-linux-amd64-musl.tar.gz
mv sing-box-${VERSION}-linux-amd64-musl/sing-box /usr/local/bin/
chmod +x /usr/local/bin/sing-box

mkdir -p /etc/sing-box

UUID=$(cat /proc/sys/kernel/random/uuid)
HY_PASS=$(openssl rand -hex 8)
ANY_PASS=$(openssl rand -hex 8)

KEY_PAIR=$(sing-box generate reality-keypair)
PRIVATE_KEY=$(echo "$KEY_PAIR" | grep PrivateKey | awk '{print $2}')
PUBLIC_KEY=$(echo "$KEY_PAIR" | grep PublicKey | awk '{print $2}')

cat > /etc/sing-box/config.json <<EOF
{
  "log": { "level": "info" },
  "inbounds": [

    {
      "type": "vless",
      "tag": "reality",
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
          "short_id": ["a1b2"]
        }
      }
    },

    {
      "type": "hysteria2",
      "tag": "hy2",
      "listen": "::",
      "listen_port": $HY2_PORT,
      "users": [{ "password": "$HY_PASS" }]
    },

    {
      "type": "anytls",
      "tag": "anytls",
      "listen": "::",
      "listen_port": $ANY_PORT,
      "users": [{ "password": "$ANY_PASS" }]
    }

  ],
  "outbounds": [{ "type": "direct" }]
}
EOF

cat > /etc/init.d/sing-box <<'INITEOF'
#!/sbin/openrc-run

description="sing-box proxy server"
command="/usr/local/bin/sing-box"
command_args="run -c /etc/sing-box/config.json"
pidfile="/var/run/sing-box.pid"
command_background=true

depend() {
    need net
}
INITEOF

chmod +x /etc/init.d/sing-box

# Alpine 默认使用 OpenRC，如果安装了 systemd 才使用 systemd
if command -v systemctl &> /dev/null; then
    mkdir -p /etc/systemd/system
    cat > /etc/systemd/system/sing-box.service <<EOF
[Unit]
Description=sing-box
After=network.target

[Service]
ExecStart=/usr/local/bin/sing-box run -c /etc/sing-box/config.json
Restart=always

[Install]
WantedBy=multi-user.target
EOF
    systemctl daemon-reload
    systemctl enable sing-box
    systemctl restart sing-box
else
    # 使用 OpenRC
    rc-service sing-box start
    rc-update add sing-box
fi

IP=$(curl -s ifconfig.me)

echo ""
echo "========= v2rayN 链接 ========="

echo ""
echo "[Reality]"
echo "vless://$UUID@$IP:$REALITY_PORT?encryption=none&security=reality&sni=www.cloudflare.com&fp=chrome&pbk=$PUBLIC_KEY&sid=a1b2&type=tcp#Reality"

echo ""
echo "[Hysteria2]"
echo "hysteria2://$HY_PASS@$IP:$HY2_PORT?sni=www.bing.com#Hy2"

echo ""
echo "[AnyTLS]"
echo "anytls://$ANY_PASS@$IP:$ANY_PORT#AnyTLS"

echo ""
echo "Reality PublicKey: $PUBLIC_KEY"
echo "UUID: $UUID"

# mkdir singbox
# cd singbox
# curl -O https://raw.githubusercontent.com/raclen/raclen.github.io/refs/heads/master/demo/singbox/install.sh
# chmod +x install.sh
# sudo ash install.sh 41000 42000 43000