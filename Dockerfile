# Base stage
FROM node:lts-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Build stage
FROM base AS build
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build
RUN npm prune --production

# Production/Runner stage
FROM base AS runner
WORKDIR /app
# Copy necessary files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

ENV PORT=4321
EXPOSE 4321

CMD ["npx", "astro", "preview", "--host"]
