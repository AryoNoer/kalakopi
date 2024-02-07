// pages/index.tsx
import React, { useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import { useAppContext } from "../context/appContext";
import HeroSection from "@/components/HeroSection";
import PopupMessage from "@/components/PopupMessage";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
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

    setTimeout(() => setShowSuccessMessage(false), 3000);
    console.log(`Item '${name}' successfully added to the cart.`);
  };

  const renderMenuItemsByCategory = (category: string) => {
    const filteredItems = menuItems.filter(
      (item) => item.category === category
    );

    return (
      <div key={category}>
        <h2 className="text-2xl md:text-3xl font-semibold my-4 mx-4 md:mx-8 ">
          {category}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 bg-[#DFD7BF] py-4 px-4 md:px-8">
          {filteredItems.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              onAddToCart={() =>
                handleAddToCart(item.id, item.name, item.price, item.image)
              }
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#F2EAD3]">
      <HeroSection
        title="Selamat Datang Di Kala Kopi Menggoda"
        description="Selamat menikmati aroma dan cita rasa penuh karakter hanya di Kalakopi!"
        imageUrl="/coffeeH.jpg"
      />
      <h1 className="text-2xl md:text-4xl font-semibold my-20 px-4 md:my-32 text-center">
        Bagaimana Harimu? Yuk Pesan Kopi Sekarang!
      </h1>
      {renderMenuItemsByCategory("Minuman")}
      {renderMenuItemsByCategory("Makanan")}
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
