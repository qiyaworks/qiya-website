# Alibaba ECS Deployment Guide (Qiya Website)

This guide covers two production options on Alibaba ECS:

1) Static build served by Nginx (recommended)
2) Docker Compose with Nginx reverse proxy

## Prerequisites

- Alibaba ECS instance (RHEL/CentOS 7+ recommended)
- Open security group ports: 80, 443, 22
- Node.js 22+ (for building)
- Nginx
- Git

## Option A: Static Nginx Deployment (Recommended)

### 1) Install dependencies (RHEL/CentOS)

```bash
sudo yum update -y
sudo yum install -y git nginx
```

### 2) Build the site

```bash
git clone <your-repo-url> qiya-website
cd qiya-website
npm ci

cat > .env.production <<'EOF'
GEMINI_API_KEY=your_key_here
EOF

npm run build
```

### 3) Copy build artifacts

```bash
sudo mkdir -p /var/www/qiya
sudo cp -r dist/* /var/www/qiya/
```

Ensure Nginx can read the files:

```bash
sudo chmod 755 /var/www
sudo chown -R nginx:nginx /var/www/qiya
sudo find /var/www/qiya -type d -exec chmod 755 {} \;
sudo find /var/www/qiya -type f -exec chmod 644 {} \;
```

### 4) Configure Nginx

Use the provided Nginx config template in [deploy/nginx/qiya.conf](deploy/nginx/qiya.conf). It already includes HTTP (80) and HTTPS (443) blocks:

```bash
sudo cp deploy/nginx/qiya.conf /etc/nginx/conf.d/qiya.conf
```

Make sure the cert paths in `qiya.conf` match your ECS cert files:

- `/etc/nginx/ssl/www.qiyaworks.com.pem`
- `/etc/nginx/ssl/www.qiyaworks.com.key`

Then reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 5) Run the email API service (required for Contact form)

Create the server env file and install production dependencies:

```bash
cp .env.server.example .env.server
# Edit .env.server with your SMTP credentials and sender address

npm ci --omit=dev
```

Run as a systemd service:

```bash
sudo tee /etc/systemd/system/qiya-email.service > /dev/null <<'EOF'
[Unit]
Description=Qiya Website Email Service
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/apps/qiya-website
Environment=DOTENV_PATH=/opt/apps/qiya-website/.env.server
ExecStart=/usr/bin/node /opt/apps/qiya-website/server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable qiya-email
sudo systemctl start qiya-email
```

Verify the service:

```bash
curl -s http://127.0.0.1:8080/api/health
```

## Option B: Docker Compose + Nginx Reverse Proxy

This option runs the build and a lightweight static server in a container, with Nginx reverse proxy on the host.

### 1) Install Docker

Follow Docker's official install guide for your OS, then confirm:

```bash
docker --version
docker compose version
```

### 2) Dockerfile

Use the Dockerfile provided in [Dockerfile](Dockerfile).

### 3) Docker Compose

Use the Compose file provided in [docker-compose.yml](docker-compose.yml).

### 4) Start the container

```bash
docker compose up -d --build
```

### 5) Configure Nginx reverse proxy

```bash
sudo tee /etc/nginx/conf.d/qiya.conf > /dev/null <<'EOF'
upstream qiya_website {
  server 127.0.0.1:3001;
  keepalive 32;
}

server {
  listen 80;
  server_name www.qiyaworks.com qiyaworks.com;
  return 301 https://www.qiyaworks.com$request_uri;
}

server {
  listen 443 ssl http2;
  server_name www.qiyaworks.com qiyaworks.com;

  ssl_certificate /etc/nginx/ssl/www.qiyaworks.com.pem;
  ssl_certificate_key /etc/nginx/ssl/www.qiyaworks.com.key;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;

  location /api/ {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location / {
    proxy_pass http://qiya_website;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
EOF
```

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Updates

```bash
git pull origin main
npm ci
npm run build
sudo cp -r dist/* /var/www/qiya/
sudo systemctl reload nginx
```

For Docker:

```bash
git pull origin main
docker compose up -d --build
```
docker image prune -a

# Remove unused containers
docker container prune

# Remove everything unused
docker system prune -a --volumes
```

---

## Step 7: Configure Domain DNS

**Before proceeding, configure your domain DNS:**

1. Go to your domain registrar (where you purchased qiyaworks.com)
2. Add an **A Record** pointing to your ECS IP:
   - **Type**: A
   - **Name**: www
   - **Value**: 47.97.61.76
   - **TTL**: 3600 (or default)

3. Optionally, add a root domain redirect:
   - **Type**: A
   - **Name**: @ (or leave blank)
   - **Value**: 47.97.61.76

4. Wait 5-15 minutes for DNS propagation
5. Verify DNS with: `nslookup www.qiyaworks.com`

---

## Step 8: Setup HTTPS with SSL Certificate (Required for HTTPS)

**Important:** For domains pointing to Mainland China ECS instances, you must complete ICP filing (备案) before the domain will work. Direct IP access is not affected by ICP requirements.

Once your domain is configured, DNS has propagated, and ICP filing is approved:

### Option A: Using Alibaba Cloud SSL Certificate (Recommended for Alibaba Cloud)

```bash
# 1. Download certificate from Alibaba Cloud Console
# - Log in to Alibaba Cloud Console → SSL Certificates
# - Find your purchased certificate → Click Download
# - Select "Nginx" as server type
# - Download the .zip file containing .pem and .key files

# 2. Upload certificate files to ECS
scp your-domain.pem alibaba-ecs:/tmp/
scp your-domain.key alibaba-ecs:/tmp/

# 3. Place certificate files in nginx SSL directory
sudo mkdir -p /etc/nginx/ssl
sudo cp /tmp/www.qiyaworks.com.pem /etc/nginx/ssl/
sudo cp /tmp/www.qiyaworks.com.key /etc/nginx/ssl/
sudo chmod 600 /etc/nginx/ssl/www.qiyaworks.com.key
sudo chmod 644 /etc/nginx/ssl/www.qiyaworks.com.pem

# 4. Verify nginx configuration references the correct cert paths
# In /etc/nginx/conf.d/qiya.conf:
# ssl_certificate /etc/nginx/ssl/www.qiyaworks.com.pem;
# ssl_certificate_key /etc/nginx/ssl/www.qiyaworks.com.key;

# 5. Open port 443 in Aliyun Security Group
# - Go to ECS → Security Groups
# - Add inbound rule: Protocol HTTPS (443), Source 0.0.0.0/0

# 6. Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx

# 7. Verify HTTPS is working
curl -Ik https://localhost/
curl -Ik https://www.qiyaworks.com/
```

```

**Note:** The nginx configuration at `/etc/nginx/conf.d/qiya.conf` already includes HTTP → HTTPS redirect (301) and HTTPS server block. Once certificates are in place and port 443 is open in Security Group, HTTPS will work automatically.

---

## Step 9: Verify Deployment

```bash
# Check Nginx on the instance
curl -I http://localhost

# Check Nginx (before SSL)
curl http://47.97.61.76

# Check domain (before SSL)
curl http://www.qiyaworks.com

# Check HTTPS (after SSL setup)
curl -Ik https://www.qiyaworks.com

# Check email API service
curl -s http://127.0.0.1:8080/api/health

# View Docker logs
docker compose logs -f
```

Visit in browser:
```
http://www.qiyaworks.com (before SSL)
or
https://www.qiyaworks.com (after SSL setup)
```

---

## Monitoring and Maintenance

### View Real-time Logs

**Docker Compose:**
```bash
# View all logs
docker compose logs -f

# View specific service logs
docker compose logs -f web

# View last 100 lines
docker compose logs --tail=100

# nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Update Application

```bash
cd /opt/apps/qiya-website

# Pull latest code
git pull origin main

# Rebuild and restart
docker compose up -d --build

# Verify new container is running
docker compose ps
docker compose logs --tail=50
```

### Monitor System Resources

```bash
# Docker container stats
docker stats

# Docker disk usage
docker system df

# System resources
top                 # CPU and memory usage
df -h              # Disk space
sudo ss -tlnp      # Open ports and processes

# Install Alibaba Cloud monitoring agent (optional)
wget http://cms-download-1258344699.file.myqcloud.com/agent/linux64/wrapper
chmod +x wrapper
sudo ./wrapper
```

---

## Backup and Recovery

### Backup Application Code

```bash
# Create backup
tar -czf qiya-website-backup-$(date +%Y%m%d).tar.gz /opt/apps/qiya-website/

# Upload to Alibaba OSS (optional)
# Configure Alibaba OSS CLI, then:
# ossutil cp qiya-website-backup-*.tar.gz oss://your-bucket/backups/
```

### Backup Docker Images

```bash
# Save Docker image
docker save qiya-website:latest | gzip > qiya-website-latest.tar.gz

# Load Docker image (restore)
docker load < qiya-website-latest.tar.gz
```

---

## Troubleshooting

### Application not starting (Docker)

```bash
# Check container status
docker compose ps

# View logs for errors
docker compose logs

# Check if port is already in use
sudo ss -ltnp | grep :3001

# Restart container
docker compose restart

# Rebuild from scratch
docker compose down
docker compose up -d --build
```

### Port already in use (80 or 3000)

```bash
# Check what is using port 80 (nginx should own this)
sudo lsof -i :80
sudo ss -ltnp | grep :80

# Common fixes:
# If Apache is running on 80
sudo systemctl stop httpd
sudo systemctl disable httpd

# If a Docker container exposes 80
docker ps
docker stop <CONTAINER_ID>

# If your Node app is listening on 80, move it back to 3000
# Then update nginx to proxy to 127.0.0.1:3000

# Check port 3000 (your app should own this)
sudo lsof -i :3000
sudo ss -ltnp | grep :3000

# Kill the specific PID if needed
sudo kill -9 <PID>

# Re-test and restart nginx
sudo nginx -t
sudo systemctl restart nginx
```

### Nginx not forwarding requests

```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### High memory usage

```bash
# Check container stats
docker stats

# Restart container
docker compose restart

# Set memory limits in docker-compose.yml (optional)
# Add under 'deploy' section:
#   resources:
#     limits:
#       memory: 512M
```

---

## Performance Optimization

### 1. Enable Gzip Compression (Nginx)
Add to `/etc/nginx/conf.d/qiya-website.conf`:
```nginx
gzip on;
gzip_types text/plain text/css text/javascript application/json;
gzip_min_length 1000;
```

### 2. Caching Headers
Add to Express (server.js):
```javascript
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});
```

### 3. Database Connection Pooling (if using DB)
Configure appropriate pool sizes for your database.

### 4. Load Balancing
- Use Alibaba SLB (Server Load Balancer)
- Deploy multiple ECS instances
- Configure auto-scaling groups

---

## Security Hardening

### 1. Firewall Configuration
```bash
# Install and enable firewall (RHEL/CentOS)
sudo systemctl start firewalld
sudo systemctl enable firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### 2. Disable Root SSH Login
```bash
# Create non-root user
sudo useradd -m -s /bin/bash nodeuser
sudo usermod -aG sudoers nodeuser

# Configure SSH
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
# Set: PubkeyAuthentication yes

sudo systemctl restart sshd
```

### 3. Keep System Updated
```bash
# RHEL/CentOS
sudo yum update -y
```

---

## Scaling the Application

### Vertical Scaling (Upgrade ECS Instance)
1. Stop the instance
2. Upgrade to larger instance type
3. Restart

### Horizontal Scaling (Multiple Instances)
1. Create AMI from configured instance
2. Launch multiple instances
3. Configure Alibaba SLB
4. Add instances to load balancer

---

## Cost Optimization

- Use **pay-as-you-go** billing for development
- Switch to **subscription** for production
- Use **reserved instances** for long-term costs
- Configure **auto-scaling** based on traffic
- Use Alibaba **CDN** for static assets

---

## Troubleshooting SSH Connection Issues

### "client_loop: send disconnect: Connection reset" Error

This error occurs when the SSH connection is dropped unexpectedly. **Prevention strategies:**

#### 1. Enable SSH Keep-Alive (Client Side)
Add to your local SSH config file (`~/.ssh/config` on macOS/Linux, or `%USERPROFILE%\.ssh\config` on Windows):

```
Host alibaba-ecs
    HostName 47.97.61.76
    User root
    IdentityFile ~/.ssh/website-ecs-keypair.pem
    ServerAliveInterval 60
    ServerAliveCountMax 10
    TCPKeepAlive yes
```

#### 2. Configure Server-Side SSH (on ECS instance)
Edit `/etc/ssh/sshd_config`:

```bash
sudo nano /etc/ssh/sshd_config
```

Add or modify these settings:
```
ClientAliveInterval 60
ClientAliveCountMax 10
```

Then restart SSH:
```bash
sudo systemctl restart sshd
```

#### 3. Check Security Group Rules
Ensure your Alibaba ECS Security Group allows:
- **Port 22 (SSH)** inbound from your IP
- No overly restrictive egress rules

#### 4. Network Stability
- Avoid unstable networks; use wired connection if possible
- If on mobile/unstable connection, use tmux or screen:
  ```bash
  # On remote server
  sudo yum install -y tmux
  
  # Create a session
  tmux new-session -d -s deployment
  
  # Attach to session
  tmux attach -t deployment
  ```

#### 5. Verify ECS Instance Health
- Check **ECS Console** for instance status
- Verify CPU/Memory/Disk not full
- Review security group rules

---

## Support and Resources

- **Alibaba ECS Docs**: https://www.alibabacloud.com/help/en/ecs
- **Docker Docs**: https://docs.docker.com
- **Docker Compose Docs**: https://docs.docker.com/compose
- **Node.js Docs**: https://nodejs.org/docs
- **Nginx Docs**: https://nginx.org/en/docs

---

**Last Updated**: February 8, 2026

