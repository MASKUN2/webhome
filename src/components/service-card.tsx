import type { Service } from "@/config/site";

export function ServiceCard({ service }: { service: Service }) {
  const isLive = service.status === "live";

  const inner = (
    <>
      <div className="flex items-center gap-3">
        {service.icon && (
          <span className="text-2xl" aria-hidden>
            {service.icon}
          </span>
        )}
        <span className="font-medium">{service.name}</span>
        {!isLive && (
          <span className="ml-auto rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            Coming soon
          </span>
        )}
        {isLive && (
          <span
            className="ml-auto text-zinc-400 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          >
            →
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {service.description}
      </p>
    </>
  );

  const base =
    "block rounded-xl border p-5 transition-colors border-zinc-200 dark:border-zinc-800";

  if (!isLive) {
    return (
      <div className={`${base} cursor-not-allowed opacity-60`}>{inner}</div>
    );
  }

  return (
    <a
      href={service.href}
      className={`${base} group bg-white hover:border-zinc-300 hover:shadow-sm dark:bg-zinc-950 dark:hover:border-zinc-700`}
    >
      {inner}
    </a>
  );
}
