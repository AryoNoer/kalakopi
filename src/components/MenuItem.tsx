//src/components/MenuItem.tsx
import Image from "next/image";
import React from "react";

interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  onAddToCart: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  name,
  price,
  image,
  description,
  onAddToCart,
}) => {
  return (
    <div className="border p-4 mb-4 rounded-lg bg-[#F2EAD3] shadow-md h-auto flex flex-col">
      <div className="relative h-32 md:h-60 w-full mb-2">
        <Image
          src={image}
          alt={name}
          className="rounded-lg object-cover"
          layout="fill"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <p className="text-lg font-semibold mb-2">{name}</p>
        <p className="text-gray-700 text-sm md:text-base flex-grow">
          {description}
        </p>
        <div className="flex items-end justify-between mt-2">
          <p className="text-gray-600 font-bold text-base md:text-2xl">
            Rp.{price.toFixed(3)},-
          </p>
          <button
            onClick={onAddToCart}
            className="border-solid border-2 border-[#3F2305] px-2 py-1 rounded-full hover:bg-[#DFD7BF] duration-300 self-end"
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
    </div>
  );
};

export default MenuItem;
