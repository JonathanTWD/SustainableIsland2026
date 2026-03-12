#!/bin/bash
# =============================================================================
# init-letsencrypt.sh
# Run this script ONCE on the server to bootstrap SSL certificates.
# After that, certbot will auto-renew every 12h via docker compose.
#
# Usage:
#   1. Edit the variables below (domains, email)
#   2. chmod +x init-letsencrypt.sh
#   3. sudo ./init-letsencrypt.sh
# =============================================================================

# --- CONFIGURE THESE ---
domains=(water-calculator.space www.water-calculator.space)
email="jonathanmoreraapaza@gmail.com"   # Must be a real email for Let's Encrypt
staging=0                     # Set to 1 to test without rate limits (staging)
rsa_key_size=4096
# -----------------------

data_path="./certbot"

if [ -d "$data_path" ]; then
  read -p "Existing data found for ${domains[*]}. Replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

# Download recommended TLS parameters if not present
if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf \
    > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem \
    > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

# Create a dummy self-signed cert so nginx can start before the real cert exists
echo "### Creating dummy certificate for ${domains[0]} ..."
path="/etc/letsencrypt/live/${domains[0]}"
mkdir -p "$data_path/conf/live/${domains[0]}"
docker compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1 \
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo

echo "### Starting nginx ..."
docker compose up --force-recreate -d nginx
echo

echo "### Removing dummy certificate ..."
docker compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/${domains[0]} && \
  rm -Rf /etc/letsencrypt/archive/${domains[0]} && \
  rm -Rf /etc/letsencrypt/renewal/${domains[0]}.conf" certbot
echo

echo "### Requesting Let's Encrypt certificate for ${domains[*]} ..."
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

email_arg="--email $email"
[ -z "$email" ] && email_arg="--register-unsafely-without-email"

staging_arg=""
[ "$staging" != "0" ] && staging_arg="--staging"

docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot
echo

echo "### Reloading nginx ..."
docker compose exec nginx nginx -s reload

echo ""
echo "Done! Your site should now be available at https://${domains[0]}"
