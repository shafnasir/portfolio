import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell py-[clamp(5rem,16vh,12rem)]">
      <p className="eyebrow text-muted">404</p>
      <h1 className="mt-5 text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.05em]">
        Nothing here<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 text-lg text-muted">
        <Link href="/" className="link text-ink">
          Back to the homepage
        </Link>
      </p>
    </section>
  );
}
