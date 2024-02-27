import React from "react";

import Image from "next/image";

const About: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#DFD7BF] p-4">
      <div className="flex flex-col md:flex-row items-start">
        <div className="md:w-1/2">
          <Image
            src="/about.jpeg"
            alt="Kala Kopi"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 md:ml-8 mt-8 md:mt-0">
          <h1 className="text-3xl font-semibold mb-4">
            Tentang KalaKopiMenggoda
          </h1>
          <p className="text-gray-600 font-medium">
            Selamat datang di KalaKopiMenggoda, destinasi istimewa bagi para
            pencinta kopi yang mencari pengalaman minum kopi tak terlupakan.
            Kami dengan antusias menyajikan racikan kopi terbaik dari Indonesia,
            menciptakan suasana nyaman untuk Anda bersantai dan menikmati setiap
            tegukan. Suasana hangat dan keramahan staf kami membuat
            KalaKopiMenggoda menjadi tempat ideal untuk melupakan sejenak
            hiruk-pikuk kehidupan dan menikmati setiap momen bersama kami.
            Segera nikmati perjalanan rasa kopi yang menakjubkan di tengah
            atmosfer yang menginspirasi.
          </p>
          <div className=" font-semibold text-base my-6">
            <h1 className="">Alamat :</h1>
            <div className="flex gap-4 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                />
              </svg>
              <div className="flex-col">
                <div className="flex gap-2">
                  <p>1.</p>
                  <p>
                    KalaKopiMenggoda Pasar Minggu, Apple 1 Condovilla, Jati
                    Padang, Jakarta Selatan.
                  </p>
                </div>

                <div className="flex gap-2">
                  <p>2.</p>
                  <p>
                    KalaKopiMenggoda Tanjung Barat, Jl. Nangka No.38,
                    Jagarkarsa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
