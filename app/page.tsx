import Link from "next/link";
import { GARMENT_COLORS, GARMENT_TYPES } from "@/constants/garments";

const FEATURES = [
  {
    title: "No design skills needed",
    description:
      "Upload your artwork and place it — the software handles the technical work of getting it print-ready.",
  },
  {
    title: "Non-destructive editing",
    description:
      "Every edit is reversible. Your original images are never changed, so you're always free to experiment.",
  },
  {
    title: "See exactly what you'll get",
    description:
      "What you see on screen is what gets printed — no surprises after you export.",
  },
  {
    title: "Professional print files",
    description:
      "Export print-ready artwork and a complete production package your print shop can use immediately.",
  },
];

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center gap-6 px-6 py-24 text-center sm:py-32">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Turn your clothing idea into a real, printable design
        </h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          No graphic design experience. No printing knowledge. Just your idea,
          turned into a professional print-ready garment.
        </p>
        <Link
          href="/designer"
          className="mt-2 flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Start Designing
        </Link>
      </section>

      <section className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 py-16 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">{feature.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      <section className="flex flex-col items-center gap-6 px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Supported garments
        </h2>
        <p className="max-w-md text-zinc-600 dark:text-zinc-400">
          {GARMENT_TYPES[0].name}, available in {GARMENT_COLORS.length} colors,
          printable on the front and back.
        </p>
        <div className="flex gap-4">
          {GARMENT_COLORS.map((color) => (
            <div key={color.name} className="flex flex-col items-center gap-2">
              <span
                className="h-10 w-10 rounded-full border border-black/[.1] dark:border-white/[.15]"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 px-6 py-24 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Ready to bring your idea to life?
        </h2>
        <Link
          href="/designer"
          className="mt-2 flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Start Designing
        </Link>
      </section>
    </>
  );
}
