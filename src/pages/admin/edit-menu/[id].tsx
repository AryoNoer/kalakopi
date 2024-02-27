import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const EditMenu = () => {
  const router = useRouter();
  const { id } = router.query;

  // State untuk menyimpan data menu yang akan di-edit
  const [menu, setMenu] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    // Fungsi untuk mengambil data menu berdasarkan ID dari database
    const fetchMenu = async () => {
      try {
        const response = await prisma.menu.findUnique({
          where: {
            id: parseInt(id as string),
          },
        });

        if (response) {
          setMenu({
            name: response.name,
            price: response.price,
            category: response.category,
            description: response.description,
            image: response.image,
          });
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    if (id) {
      fetchMenu();
    }
  }, [id]);

  // Fungsi untuk menyimpan perubahan pada menu
  const handleSaveChanges = async () => {
    try {
      await prisma.menu.update({
        where: {
          id: parseInt(id as string),
        },
        data: {
          name: menu.name,
          price: menu.price,
          category: menu.category,
          description: menu.description,
          image: menu.image,
        },
      });

      // Redirect kembali ke halaman admin/dashboard setelah penyimpanan
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };
  // Fungsi untuk menghapus menu dari database
  const handleDeleteMenu = async () => {
    try {
      await fetch(`/api/menu/${id}`, {
        method: "DELETE",
      });

      // Redirect kembali ke halaman admin/dashboard setelah penghapusan
      router.push("/admin/menu");
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  return (
    <div className="w-full mx-auto min-h-screen py-20 bg-[#F2EAD3]">
      <div className="max-w-3xl mx-auto p-20 shadow-md rounded-lg bg-slate-100">
        <h1 className="text-4xl font-bold mb-8">Edit Menu</h1>
        <div className="max-w-md mx-auto">
          <label className="block mb-4">
            <span className="text-gray-700">Menu Name:</span>
            <input
              type="text"
              value={menu.name}
              onChange={(e) => setMenu({ ...menu, name: e.target.value })}
              className="form-input mt-1 block w-full p-2 rounded-md"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Menu Image:</span>
            <input
              type="text"
              value={menu.image}
              onChange={(e) => setMenu({ ...menu, image: e.target.value })}
              className="form-input mt-1 block w-full p-2 rounded-md"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Menu Price:</span>
            <input
              type="number"
              value={menu.price}
              onChange={(e) =>
                setMenu({ ...menu, price: parseFloat(e.target.value) })
              }
              className="form-input mt-1 block w-full"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Menu Description:</span>
            <textarea
              value={menu.description}
              onChange={(e) =>
                setMenu({ ...menu, description: e.target.value })
              }
              className="form-input mt-1 block w-full p-2 rounded-md resize-none"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Menu Category:</span>
            <input
              type="text"
              value={menu.category}
              onChange={(e) => setMenu({ ...menu, category: e.target.value })}
              className="form-input mt-1 block w-full p-2 rounded-md"
            />
          </label>
          <div className="flex justify-between">
            <button
              onClick={handleSaveChanges}
              className="bg-zinc-900 text-white py-2 px-4 rounded hover:bg-zinc-600 focus:outline-none focus:shadow-outline-blue active:bg-zinc-800 duration-300"
            >
              Save Changes
            </button>
            <button
              onClick={handleDeleteMenu}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800 duration-300"
            >
              Delete Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
