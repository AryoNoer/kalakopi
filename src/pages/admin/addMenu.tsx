// pages/admin/addMenu.tsx
import PopupMessage from "@/components/PopupMessage";
import Link from "next/link";
import { useState } from "react";

const AdminMenuPage: React.FC = () => {
  const [menuName, setMenuName] = useState("");
  const [menuImage, setMenuImage] = useState("");
  const [menuPrice, setMenuPrice] = useState(0);
  const [menuDescription, setMenuDescription] = useState("");
  const [menuCategory, setMenuCategory] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleAddMenu = async () => {
    // Cek apakah ada input yang kosong
    if (
      !menuName ||
      !menuImage ||
      !menuPrice ||
      !menuDescription ||
      !menuCategory
    ) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch("/api/saveMenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuName,
          menuImage,
          menuPrice,
          menuDescription,
          menuCategory,
        }),
      });

      if (response.ok) {
        console.log("Menu added successfully");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
        // Reset form
        setMenuName("");
        setMenuImage("");
        setMenuPrice(0);
        setMenuDescription("");
        setMenuCategory("");
        // Lakukan hal lain jika perlu, seperti memperbarui state lokal atau mereset form
      } else {
        console.error("Failed to add menu");
      }
    } catch (error) {
      console.error("Error during menu addition:", error);
    }
  };

  return (
    <div className="w-full mx-auto min-h-screen py-20 bg-[#F2EAD3]">
      <div className="max-w-3xl mx-auto p-8 pt-20 shadow-md rounded-lg bg-slate-100">
        <h1 className="text-3xl font-bold mb-8">Tambah Menu</h1>
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Nama Menu:</span>
          <input
            type="text"
            className="form-input mt-1 block w-full p-2 rounded-md border-zinc-300"
            placeholder="Masukkan Nama Menu"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Gambar Menu:</span>
          <input
            type="text"
            className="form-input mt-1 block w-full p-2 rounded-md"
            placeholder="Masukkan URL Gambar Menu"
            value={menuImage}
            onChange={(e) => setMenuImage(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Harga Menu:</span>
          <input
            type="number"
            className="form-input mt-1 block w-full p-2 rounded-md"
            placeholder="Masukkan Harga Menu"
            value={menuPrice}
            onChange={(e) => setMenuPrice(Number(e.target.value))}
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Deskripsi Menu:</span>
          <textarea
            className="form-input mt-1 block w-full p-2 rounded-md resize:none "
            placeholder="Masukkan Deskripsi Menu"
            style={{ resize: "none" }}
            rows={4}
            cols={50}
            value={menuDescription}
            onChange={(e) => setMenuDescription(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Kategori Menu:</span>
          <input
            type="text"
            placeholder="Masukkan Kategori Menu"
            className="form-input mt-1 block w-full p-2 rounded-md "
            value={menuCategory}
            onChange={(e) => setMenuCategory(e.target.value)}
          />
        </label>
        <button
          onClick={handleAddMenu}
          className="bg-zinc-800 w-full rounded-lg hover:bg-zinc-600 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline duration-300"
        >
          Tambah Menu
        </button>
        <Link href="/admin/dashboard">
          <button className="w-full mt-4 rounded-lg hover:bg-red-500 hover:text-white duration-300 text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline border-2 border-zinc-800">
            Kembali
          </button>
        </Link>
      </div>
      {showSuccessMessage && (
        <PopupMessage
          message="Berhasil Menambahkan Menu"
          onClose={() => setShowSuccessMessage(false)}
        />
      )}
    </div>
  );
};

export default AdminMenuPage;
