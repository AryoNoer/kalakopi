// pages/index.tsx
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
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

export default function MenuPage({ menus }: MenuPageProps) {
  return (
    <div>
      <h1>Menu List</h1>
      {menus.map((menu) => (
        <div key={menu.id}>
          <h2>{menu.name}</h2>
          <Image src={menu.image} alt={menu.name} width={200} height={200} />
          <p>{menu.price}</p>
          <p>{menu.description}</p>
          <p>{menu.category}</p>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const menus: Menu[] = await prisma.menu.findMany();
  return {
    props: {
      menus,
    },
  };
}
