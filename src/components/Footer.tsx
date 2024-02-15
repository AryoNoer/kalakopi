import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3F2305] p-4">
      <div className="w-full  text-center text-white text-xs">
        <p>
          &copy; 2024 KalaKopiMenggoda. All rights reserved.{" "}
          <span className="mx-2">||</span>
          <Link
            href="https://www.instagram.com/kalakopi.menggoda/"
            className="cursor-pointer"
          >
            Instagram
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
