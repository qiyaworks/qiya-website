<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Qiya AI Website

Qiya AI is a single-page site built with React + Vite. This README covers local development and production deployment on Alibaba ECS (static hosting via Nginx).


## Overview

- Frontend: React 19 + Vite
- Build output: static files in `dist/`
- Deployment: Nginx serving static assets
- Runtime configuration: build-time via `.env.*` files

## Project Structure

```
.
├── App.tsx
├── index.tsx
├── index.html
├── index.css
├── vite.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js 22+ and npm
- Git (for cloning)
- Nginx (for production static hosting)
- Open ports 80/443 in your Alibaba ECS security group

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a local env file:
   ```bash
   cp .env.local.example .env.local
   ```
   If you do not have an example file, create `.env.local` manually.
3. Set your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_key_here
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## Production Deployment on Alibaba ECS

The site is a static build. Use Nginx to serve `dist/`.

### 1) Provision the server

```bash
sudo apt-get update
sudo apt-get install -y git nginx
```

Install Node.js 22+ using your preferred method (NodeSource, nvm, or system packages).

### 2) Clone and build

```bash
git clone <your-repo-url> qiya-website
cd qiya-website
npm ci
```

Create a production env file:

```bash
cat > .env.production <<'EOF'
GEMINI_API_KEY=your_key_here
EOF
```

Build the site:

```bash
npm run build
```

### 3) Copy build artifacts

```bash
sudo mkdir -p /var/www/qiya
sudo cp -r dist/* /var/www/qiya/
```

### 4) Configure Nginx

Create a site config (replace `example.com` with your domain or server IP):

```bash
sudo tee /etc/nginx/conf.d/qiya.conf > /dev/null <<'EOF'
server {
  listen 80;
  server_name example.com;

  root /var/www/qiya;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(css|js|svg|png|jpg|jpeg|gif|ico|woff2?)$ {
    expires 7d;
    add_header Cache-Control "public";
  }
}
EOF
```

Reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Your site is now live on port 80. For HTTPS, add a TLS certificate (for example, using Certbot) and update the Nginx config accordingly.

## Configuration

Vite loads environment variables from `.env.*` files. The project reads `GEMINI_API_KEY` at build time and inlines it into the bundle via `vite.config.ts`.

- Local dev: `.env.local`
- Production build: `.env.production`

Important: any value injected at build time is visible in the client bundle. Do not put server-only secrets here.

## Useful Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build to `dist/`
- `npm run preview` - preview the production build locally

## Troubleshooting

- If the page is blank in production, verify `dist/` is deployed and Nginx uses `try_files` to route all requests to `index.html`.
- If the dev server is not reachable on ECS, ensure port 3000 is open and `vite` is bound to `0.0.0.0` (already configured in `vite.config.ts`).
"# qiya-website" 
