import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 flex justify-center items-center">
      <Link href="/" className="text-link hover:text-pink mr-2">
        Home
      </Link>
      <span className="text-secondary">|</span>
      <a
        href="https://github.com/secondl1ght/amboss-demo"
        target="_blank"
        rel="noreferrer"
        className="text-link hover:text-pink ml-2"
      >
        Code
      </a>
    </footer>
  );
}
