import React, { useState } from "react";
import Link from "next/link";
import { useAppContext } from "../context/appContext";
import Image from "next/image";

const Payment: React.FC = () => {
  const { cart } = useAppContext();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    tableNumber: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleConfirmOrder = () => {
    const message = `New order:
    Nama: ${formData.fullName}
    No.Telp: ${formData.phone}
    Email: ${formData.email}
    No.Meja: ${formData.tableNumber}
    Items: ${cart.map((item) => `${item.name} (${item.quantity})`).join(", ")}`;

    const whatsappLink = `https://wa.me/81388365407?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="mt-8 px-4">
      <h1 className="text-2xl font-semibold mb-4">Konfirmasi Pembayaran</h1>
      <div>
        {cart.length === 0 ? (
          <p>Keranjangmu Masih Kosong Nih, Yuk Pesan Dulu!</p>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Pesanan</h2>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center mb-2 border border-[#F2EAD3] rounded-lg p-2"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 mr-2 rounded-lg border border-[#3F2305]"
                  width={200}
                  height={200}
                />
                <p>{item.name}</p>
                <p className="ml-auto">
                  Rp.{(item.price * item.quantity).toFixed(3)},-
                </p>
              </div>
            ))}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Informasi Pemesan</h2>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    onChange={handleFormChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    onChange={handleFormChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleFormChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="tableNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nomor Meja
                  </label>
                  <input
                    type="text"
                    id="tableNumber"
                    name="tableNumber"
                    onChange={handleFormChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="text-black bg-[#25D366] ring-2 ring-[#fff] px-4 py-2 rounded-md hover:bg-[#22c55e] duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                  Konfirmasi Pesanan (via WhatsApp)
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="flex my-10">
        <Link href="/cart">
          <p className="text-black bg-[#F5F5F5] border-2 border-[#F2EAD3] px-4 py-2 rounded-md hover:bg-[#DFD7BF] duration-300">
            Kembali Ke Keranjang
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
