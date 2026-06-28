# webhome

`jwih.org` 도메인의 **프론트 포털** — 소개 + 자가호스팅 서비스 목록(서브도메인 링크) + SSO 로그인.
홈랩(`homelab` 레포)의 k3s 클러스터에 배포되어 `https://jwih.org`(·`www`·`home`)로 서비스된다.

## 스택

- **Next.js 16** (App Router, TypeScript, Tailwind v4, `src/`, `@/*` alias)
- **Auth.js v5**(`next-auth@beta`) + **Authentik OIDC** — 홈랩 SSO 로그인
- 툴체인: **mise**(`mise.toml`: Node 22, pnpm 11.8.0) + pnpm. 공급망 하드닝은 `pnpm-workspace.yaml`(`allowBuilds`).

## 서비스 목록 (콘텐츠)

서비스 디렉터리는 **정적 설정** `src/config/site.ts`로 관리한다. 항목 추가:

```ts
// src/config/site.ts — services 배열에 추가
{ id: "myapp", name: "myapp", description: "...", href: "https://myapp.jwih.org",
  status: "live" /* | "planned" */, icon: "🚀" }
```
- `status: "live"`  → 클릭 가능한 링크 카드. `"planned"` → "Coming soon" 비활성.
- `site.ts`의 `site`는 도메인 이름·태그라인·canonical URL.

## 인증 (SSO)

- `src/auth.ts` — Auth.js + Authentik provider(`trustHost: true`).
- `src/app/api/auth/[...nextauth]/route.ts` — 핸들러.
- `src/components/auth-status.tsx` — 헤더 위젯(로그인 시 사용자명+Sign out, 아니면 Sign in).
- 환경변수(런타임): `AUTH_AUTHENTIK_ID`, `AUTH_AUTHENTIK_SECRET`, `AUTH_AUTHENTIK_ISSUER`, `AUTH_URL=https://jwih.org`, `AUTH_SECRET`.
  - 배포 시 k8s Secret `webhome-oidc`로 주입(값은 `homelab/.env`). Authentik provider는 `homelab/k8s/apps/authentik/create-webhome-provider.py`로 생성됨.
  - **프록시 뒤 주의**: Traefik `forwarded-https` 미들웨어로 `X-Forwarded-Proto: https`를 줘야 OIDC 콜백이 https로 생성됨(미설정 시 Mixed Content).

## 로컬 개발

```bash
mise install            # node 22 / pnpm 11.8.0
pnpm install
pnpm dev                # http://localhost:3000
```
`/`(포털)은 인증 없이 보이고, 로그인 위젯을 쓰려면 `.env`에 `AUTH_*`(도달 가능한 Authentik) 설정.

## 배포 (홈랩 k3s)

레지스트리 없이 노드에서 빌드 → containerd import → rollout. 상세·접근법은 **`homelab/OPERATIONS.md`**.

```bash
# 소스 → app노드 빌드 → k3s import (homelab OPERATIONS의 워크플로)
tar czf - --exclude=node_modules --exclude=.next --exclude=.git . \
  | ssh k3s-app 'rm -rf ~/webhome && mkdir -p ~/webhome && tar xzf - -C ~/webhome'
ssh k3s-app 'cd ~/webhome && sudo docker build -t webhome:<태그> . \
  && sudo docker save webhome:<태그> | sudo k3s ctr -n k8s.io images import -'
# homelab/k8s/apps/webhome.yaml 이미지 태그 갱신 후:
kubectl -n apps set image deploy/webhome webhome=webhome:<태그>
```
- 매니페스트(Deployment/Service/Ingress + forwarded-https 미들웨어): `homelab/k8s/apps/webhome.yaml`
- 공개 경로: CF Tunnel → Traefik(`10.0.0.22`) → webhome. hostname은 Cloudflare Zero Trust에서 관리.
- 현재 이미지: `webhome:0.3.0`.
