// pages/index.tsx
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const prisma = new PrismaClient();

interface Menu {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface MenuPageProps {
  menus: Menu[];
}

const MenuPage: React.FC<MenuPageProps> = ({ menus }) => {
  const foodMenus = menus.filter((menu) => menu.category === "Makanan");
  const drinkMenus = menus.filter((menu) => menu.category === "Minuman");
  return (
    <div className="bg-slate-100 min-h-screen pt-20">
      <div className="container mx-auto p-8 bg-slate-50 rounded-lg ">
        <h1 className="text-4xl font-bold mb-8">Menu List</h1>
        <div className="flex space-x-4 justify-end">
          <Link
            href="/admin/dashboard"
            className="bg-zinc-800 text-white px-3 py-2 rounded-md mb-4 hover:bg-zinc-700 duration-300 ease-in-out"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/addMenu"
            className="bg-zinc-800 text-white px-3 py-2 rounded-md mb-4 hover:bg-zinc-700 duration-300 ease-in-out"
          >
            Tambah Menu
          </Link>
        </div>

        <section className="border-2 border-zinc-200 rounded-md my-4 p-4">
          <h1 className="text-xl font-semibold">Makanan</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {foodMenus.map((menu) => (
              <div
                key={menu.id}
                className="border p-4 rounded-lg bg-white shadow-md relative"
              >
                <h2 className="text-lg font-semibold mb-2">{menu.name}</h2>
                <div className="relative h-32 w-full mb-4">
                  <Image
                    src={menu.image}
                    alt={menu.name}
                    layout="fill"
                    className="rounded-lg object-cover"
                  />
                </div>
                <p className="text-gray-700 mb-2">{menu.description}</p>
                <p className="text-gray-800 font-bold text-lg">
                  Rp.{menu.price.toFixed(3)},-
                </p>
                <p className="text-gray-600">{menu.category}</p>
                <div className="absolute bottom-4 right-4">
                  <Link
                    href={`/admin/edit-menu/${menu.id}`}
                    className="text-blue-500 font-bold"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="border-2 border-zinc-200 rounded-md my-4 p-4">
          <h1 className="text-xl font-semibold">Minuman</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {drinkMenus.map((menu) => (
              <div
                key={menu.id}
                className="border p-4 rounded-lg bg-white shadow-md relative"
              >
                <h2 className="text-lg font-semibold mb-2">{menu.name}</h2>
                <div className="relative h-32 w-full mb-4">
                  <Image
                    src={menu.image}
                    alt={menu.name}
                    layout="fill"
                    className="rounded-lg object-cover"
                  />
                </div>
                <p className="text-gray-700 mb-2">{menu.description}</p>
                <p className="text-gray-800 font-bold text-lg">
                  Rp.{menu.price.toFixed(3)},-
                </p>
                <p className="text-gray-600">{menu.category}</p>
                <div className="absolute bottom-4 right-4">
                  <Link
                    href={`/admin/edit-menu/${menu.id}`}
                    className="text-blue-500 font-bold"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MenuPage;

export async function getServerSideProps() {
  const menus: Menu[] = await prisma.menu.findMany();
  return {
    props: {
      menus,
    },
  };
}
