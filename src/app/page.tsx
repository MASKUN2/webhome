import { SiteHeader } from "@/components/site-header";
import { ServiceCard } from "@/components/service-card";
import { site, services } from "@/config/site";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6">
        <section className="py-16 sm:py-24">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {site.description}
          </p>
        </section>

        <section className="pb-24">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
            Services
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 px-6 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800">
        {site.tagline} · {site.url.replace(/^https?:\/\//, "")}
      </footer>
    </>
  );
}
