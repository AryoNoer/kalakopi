// pages/index.tsx
import React, { useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import Link from "next/link";
import { useAppContext } from "../context/appContext";
import Image from "next/image";
import menuData from "../../public/data/menuData.json"; // Import file JSON
import HeroSection from "@/components/HeroSection";
import PopupMessage from "@/components/PopupMessage";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Home: React.FC = () => {
  const { addToCart } = useAppContext();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/menuData.json");
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (
    id: number,
    name: string,
    price: number,
    image: string
  ) => {
    addToCart({ id, name, price, quantity: 1, image });
    setShowSuccessMessage(true);

    // Hide the success message after 3 seconds
    setTimeout(() => setShowSuccessMessage(false), 3000);

    // Log success message to console
    console.log(`Item '${name}' successfully added to the cart.`);
  };

  return (
    <div className="bg-[#F2EAD3]">
      <HeroSection
        title="Selamat Datang Di Kala Kopi"
        description="Selamat menikmati aroma dan cita rasa penuh karakter hanya di Kalakopi!"
        imageUrl="/coffeeH.jpg" // Ganti dengan path gambar yang sesuai
      />
      <h1 className="text-2xl md:text-4xl font-semibold my-20 px-4 md:my-32 text-center">
        Bagaimana Harimu? Yuk Pesan Kopi Sekarang!
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-[#DFD7BF] py-20 px-4 md:px-8">
        {/* Render menu items */}
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            onAddToCart={() =>
              handleAddToCart(item.id, item.name, item.price, item.image)
            }
          />
        ))}
      </div>
      {showSuccessMessage && (
        <PopupMessage
          message="Added to cart!"
          onClose={() => setShowSuccessMessage(false)}
        />
      )}
    </div>
  );
};

export default Home;
