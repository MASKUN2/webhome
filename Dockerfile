# syntax=docker/dockerfile:1
# webhome — Next.js standalone 컨테이너 이미지 (멀티스테이지)

FROM node:22-slim AS base
RUN corepack enable && corepack prepare pnpm@11.8.0 --activate
WORKDIR /app

# --- deps: lockfile 기준 의존성 설치 ---
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# --- build: Next 빌드 (standalone 출력) ---
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# --- runner: 최소 런타임 ---
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN groupadd -r nodejs && useradd -r -g nodejs nextjs
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
