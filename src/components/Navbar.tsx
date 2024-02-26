"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Fungsi untuk menangani logout
  const handleLogout = async () => {
    try {
      // Cek apakah kode dijalankan di sisi klien
      if (typeof window !== "undefined") {
        // Kirim request ke API logout
        const response = await fetch("/api/logout");

        if (response.ok) {
          // Hapus token JWT dari penyimpanan lokal
          localStorage.removeItem("jwtToken");

          // Setel status login kembali ke false
          setIsLoggedIn(false);

          // Redirect ke halaman utama setelah logout
          router.push("/");
        } else {
          console.error("Logout failed");
        }
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    // Cek apakah kode dijalankan di sisi klien
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwtToken");
      setIsLoggedIn(!!token);
    }
  }, []);

  return (
    <nav className="bg-[#DFD7BF] p-4 md:px-8 top-0 sticky z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <p className="text-[#3F2305] font-bold text-lg md:text-xl">
            KalaKopiMenggoda
          </p>
        </Link>
        <div className="flex space-x-4 md:gap-10">
          <Link href="/">
            <p className="text-[#3F2305] font-semibold md:text-base text-base hover:opacity-70 hover:scale-105 ease-in-out duration-150">
              Beranda
            </p>
          </Link>
          <Link href="/about">
            <p className="text-[#3F2305] font-semibold md:text-base text-base hover:opacity-70 hover:scale-105 ease-in-out duration-150">
              Tentang Kami
            </p>
          </Link>
          <Link href="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#3F2305"
              aria-label="Cart Icon"
              className="w-6 h-6 hover:stroke-black hover:scale-105 ease-in-out duration-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </Link>
          {isLoggedIn ? ( // Tampilkan Logout jika sudah login
            <button
              onClick={handleLogout}
              className="text-[#3F2305] font-semibold md:text-base text-base hover:opacity-70 hover:scale-105 ease-in-out duration-150"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="text-[#3F2305] font-semibold md:text-base text-base hover:opacity-70 hover:scale-105 ease-in-out duration-150"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
