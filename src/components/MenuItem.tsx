// components/MenuItem.tsx
import Image from "next/image";
import React from "react";

interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  name,
  price,
  image,
  onAddToCart,
}) => {
  return (
    <div className="border p-4 mb-4 rounded-lg bg-[#F2EAD3] shadow-md">
      <Image
        src={image}
        alt={name}
        className="mb-2 h-32 md:h-80 w-full object-cover rounded-lg"
        width={300}
        height={300}
      />
      <p className="text-lg font-semibold">{name}</p>
      <div className="flex items-end justify-between">
        <p className="text-gray-600 font-bold text-base md:text-2xl">
          Rp.{price.toFixed(3)},-
        </p>
        <button
          onClick={onAddToCart}
          className="border-solid border-2 border-[#3F2305] px-4  py-2 mt-2 rounded-full hover:bg-[#DFD7BF] duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#3F2305"
            className="w-4 h-4 md:w-6 md:h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
