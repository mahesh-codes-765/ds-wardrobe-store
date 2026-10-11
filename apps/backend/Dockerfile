# DS Wardrobe backend (Medusa v2) - production image
# Build from the repository root:  docker build -f apps/backend/Dockerfile .

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/
# --ignore-scripts skips the root postinstall that installs the storefront
RUN npm ci --workspace apps/backend --include-workspace-root --ignore-scripts
COPY apps/backend apps/backend
WORKDIR /app/apps/backend
RUN npx medusa build

FROM node:22-alpine
WORKDIR /server
ENV NODE_ENV=production
COPY --from=build /app/apps/backend/.medusa/server ./
RUN npm install --omit=dev --ignore-scripts && npm cache clean --force
EXPOSE 9000
# Migrations are idempotent; run them on start so a new image never serves an old schema.
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa db:migrate:search && npx medusa start"]
