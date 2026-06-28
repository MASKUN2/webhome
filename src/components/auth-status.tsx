/**
 * Auth status slot (top-right of the header).
 *
 * PLACEHOLDER for the SSO phase. Today webhome is fully public and there is no
 * login, so this renders a disabled stub. Once Authentik (auth.jwih.org) is up
 * and webhome is wired as an OIDC client (Auth.js), replace the stub with the
 * real session widget:
 *
 *   - signed out → "Sign in" button → next-auth signIn("authentik")
 *   - signed in  → avatar / name + "Sign out"
 *
 * Because every *.jwih.org app authenticates against the same Authentik IdP,
 * a session established here is silently recognized by the other services (SSO).
 */
export function AuthStatus() {
  return (
    <span
      aria-disabled
      title="Sign-in arrives with SSO (Authentik) — not wired up yet"
      className="cursor-not-allowed rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-400 select-none dark:border-zinc-700 dark:text-zinc-600"
    >
      Sign in
    </span>
  );
}
