import Link from "next/link";

const Footer = () => {
  return (
    <footer className={"mt-10 p-4 text-center md:p-10"}>
      <div className={"mx-auto text-sm md:text-base"}>
        Fait avec amour par{" "}
        <Link
          className={"text-project-main inline-block underline"}
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/alexandre-mace"
        >
          alexandre-mace
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
