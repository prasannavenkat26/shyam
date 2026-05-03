import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ReactNode } from "react";

export const PageShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 pt-24">{children}</main>
    <Footer />
  </div>
);

export const PageHeader = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => (
  <section className="py-16 sm:py-24 text-center relative">
    <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
    <div className="relative mx-auto max-w-3xl px-4">
      {eyebrow && <p className="text-sm text-primary uppercase tracking-widest font-medium">{eyebrow}</p>}
      <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  </section>
);
