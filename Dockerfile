# -------- Base Image (shared) --------
FROM node:18-alpine AS base
WORKDIR /app

# -------- Dependencies & Build Stage --------
FROM base AS builder

# Only copy manifest, install all deps, build, then prune dev‑deps
COPY package.json package-lock.json ./

# Install both prod & dev deps
RUN npm ci

# Copy source, build Next.js
COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npm run build

# Remove dev‑dependencies to shrink node_modules
RUN npm prune --production

# -------- Production Image --------
FROM node:18-alpine AS production
WORKDIR /app

# Create non‑root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

ENV NODE_ENV=production

# Copy only what’s needed at runtime:
#  - next build artifacts
#  - public assets
#  - production node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/middleware.ts ./middleware.ts
COPY --from=builder /app/db ./db

EXPOSE 3000
USER nextjs

# Use the Next.js start script
CMD ["npm", "start"]
