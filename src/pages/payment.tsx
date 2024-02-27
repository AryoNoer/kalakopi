import React, { useState } from "react";
import Link from "next/link";
import { useAppContext } from "../context/appContext";
import Image from "next/image";
import axios from "axios";
import Router from "next/router";

const Payment: React.FC = () => {
  const router = Router;
  const { cart } = useAppContext();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    tableNumber: "",
    buktiPembayaranUrl: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [formError, setFormError] = useState({
    fullName: false,
    phone: false,
    tableNumber: false,
    buktiPembayaranUrl: false,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormError((prevError) => ({ ...prevError, [name]: false }));
  };

  const handleConfirmOrder = async () => {
    const isFormValid =
      formData.fullName.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.tableNumber.trim() !== "";
    formData.buktiPembayaranUrl.trim() !== "";
    if (!isFormValid) {
      setFormError({
        fullName: formData.fullName.trim() === "",
        phone: formData.phone.trim() === "",
        tableNumber: formData.tableNumber.trim() === "",
        buktiPembayaranUrl: formData.buktiPembayaranUrl.trim() === "",
      });
      return;
    }
    const totalHarga = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    try {
      const response = await axios.post("/api/saveOrder", {
        fullName: formData.fullName,
        phone: formData.phone,
        tableNumber: formData.tableNumber,
        buktiPembayaranUrl: formData.buktiPembayaranUrl,
        totalHarga: totalHarga,
        cart,
      });

      console.log(response.data);
      alert("Pesanan Berhasil Dibuat");
      router.push("/");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <div className="mt-8 px-4 max-w-2xl mx-auto">
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
                  {formError.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      Nama Lengkap wajib diisi
                    </p>
                  )}
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
                  {formError.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      No. Telepon wajib diisi
                    </p>
                  )}
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
                  {formError.tableNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      Nomor Meja wajib diisi
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="buktiPembayaranUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bukti Pembayaran
                  </label>
                  <input
                    type="file"
                    accept={"image/*"}
                    id="buktiPembayaranUrl"
                    name="buktiPembayaranUrl"
                    onChange={handleFormChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {formError.buktiPembayaranUrl && (
                    <p className="text-red-500 text-sm mt-1">
                      Wajib Upload Bukti Pembayaran
                    </p>
                  )}
                </div>

                <div className="flex justify-start items-center border-2 border-zinc-100 rounded-lg my-2">
                  <div className="">
                    <Image
                      src="/bca.svg"
                      alt="logoBCA"
                      className="w-16 h-16 mr-2 rounded-lg "
                      width={200}
                      height={200}
                    />
                  </div>
                  <div>
                    <h1 className="">
                      Rekening Pembayaran a/n Ade Satya Nugraha Permana:{" "}
                      <b>5540661971</b>
                    </h1>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="text-white bg-gray-800 ring-2 ring-[#fff] px-4 py-2 rounded-md hover:bg-gray-600 duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed w-full"
                >
                  Pesan
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="flex my-10">
        <Link
          href="/cart"
          className="text-black text-center bg-[#F5F5F5] border-2 border-[#F2EAD3] px-4 py-2 rounded-md hover:bg-[#DFD7BF] duration-300 w-full"
        >
          Kembali Ke Keranjang
        </Link>
      </div>
    </div>
  );
};
export default Payment;
