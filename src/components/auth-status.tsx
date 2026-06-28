import { auth, signIn, signOut } from "@/auth";

/**
 * Auth status slot (top-right of the header).
 *
 * Server component: reads the Authentik OIDC session via Auth.js.
 *   - signed out → "Sign in" → signIn("authentik") (server action)
 *   - signed in  → name/email + "Sign out"
 *
 * Every *.jwih.org app authenticates against the same Authentik IdP, so a session
 * established here is silently recognized by the other services (SSO).
 */
const btn =
  "rounded-full border border-zinc-300 px-3 py-1 text-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800";

export async function AuthStatus() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("authentik");
        }}
      >
        <button type="submit" className={btn}>
          Sign in
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-zinc-600 dark:text-zinc-400">
        {user.name ?? user.email}
      </span>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit" className={btn}>
          Sign out
        </button>
      </form>
    </div>
  );
}
