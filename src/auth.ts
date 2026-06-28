import NextAuth from "next-auth";
import Authentik from "next-auth/providers/authentik";

/**
 * Auth.js (NextAuth v5) — Authentik OIDC.
 *
 * client id/secret/issuer 는 환경변수에서 자동 로딩:
 *   AUTH_AUTHENTIK_ID, AUTH_AUTHENTIK_SECRET, AUTH_AUTHENTIK_ISSUER
 * 세션 암호화 키: AUTH_SECRET.
 *
 * trustHost: CF Tunnel + Traefik 뒤라서 X-Forwarded-Host/Proto 기반으로
 * 콜백 URL을 구성해야 함 (프록시가 https proto를 넘겨줘야 정상 — webhome ingress에
 * forwarded-https 미들웨어 적용).
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [Authentik],
});
