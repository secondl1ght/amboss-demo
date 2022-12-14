export default function Footer() {
  return (
    <footer className="py-8 flex justify-center items-center">
      <a href="/" className="text-link hover:text-pink mr-2">
        Home
      </a>
      <span className="text-secondary">|</span>
      <a
        href="https://github.com/secondl1ght/amboss-demo"
        className="text-link hover:text-pink ml-2"
      >
        Code
      </a>
    </footer>
  );
}
