import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-black/[.08] bg-background/80 backdrop-blur dark:border-white/[.1]">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          From Idea To Apparel
        </Link>
        <Link
          href="/designer"
          className="flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Start Designing
        </Link>
      </nav>
    </header>
  );
}
