import React from "react";
import Link from "next/link";
import { useAppContext } from "../context/appContext";
import Image from "next/image";

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useAppContext();

  return (
    <div className="container mx-auto mt-8 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 mx-4">Keranjang Pesanan</h1>
      {cart.length === 0 ? (
        <div className="mt-36 flex-col justify-center items-center mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#3F2305"
            aria-label="Cart Icon"
            className="w-24 h-2w-24 mx-auto mb-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>

          <h1 className="text-base text-center font-semibold text-[#3F2305]">
            Keranjangmu Masih Kosong Nih, Yuk Pesan Dulu!
          </h1>
        </div>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 border border-[#F2EAD3] p-4 rounded-md"
            >
              <div className="flex items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 mr-4 rounded-md"
                  width={200}
                  height={200}
                />
                <div>
                  <p className="text-sm md:text-lg font-semibold">
                    {item.name}
                  </p>
                  <p className="text-gray-600">Rp.{item.price.toFixed(3)},-</p>
                </div>
              </div>
              <div className="flex items-center">
                <label className="mr-2 md:mr-6 text-sm md:text-base">
                  Jumlah :
                </label>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) => updateQuantity(item.id, +e.target.value)}
                  className="w-10 md:w-14 md:mr-4 text-center ring-2 ring-[#F2EAD3] rounded-md"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-center gap-5 my-10">
            <Link href="/">
              <p className="text-black border-2 border-[#F2EAD3] px-4 py-2 rounded-md hover:bg-[#DFD7BF] duration-300">
                Tambah Pesanan
              </p>
            </Link>
            <Link href="/payment">
              <p className="text-black border-2 border-[#F2EAD3] px-4 py-2 rounded-md hover:bg-[#DFD7BF] duration-300">
                Proses Pembayaran
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
