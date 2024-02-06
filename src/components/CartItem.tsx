// components/CartItem.tsx
import Image from "next/image";
import React from "react";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string; // Tambahkan properti image
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  image,
}) => {
  return (
    <div className="border p-4 mb-4">
      <Image src={image} alt={name} className="mb-2" width={200} height={200} />
      <p className="text-lg font-semibold">{name}</p>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <p>Jumlah: {quantity}</p>
      <p>Total: Rp.{(price * quantity).toFixed(3)},-</p>
    </div>
  );
};

export default CartItem;
