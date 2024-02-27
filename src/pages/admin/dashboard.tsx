import { useEffect, useState } from "react";
import Link from "next/link";
interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  orderId: number;
  image: string;
}

interface Order {
  id: number;
  customer: string;
  phone: string;
  tableNumber: string;
  createdAt: string;
  totalHarga: number;
  buktiPembayaranUrl: string;
  items: Item[];
}

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getOrders");
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="flex space-x-4 justify-end">
        <Link
          href="/admin/menu"
          className="bg-zinc-800 text-white px-3 py-2 rounded-md mb-4 hover:bg-zinc-700 duration-300 ease-in-out"
        >
          Menu List
        </Link>
        <Link
          href="/admin/addMenu"
          className="bg-zinc-800 text-white px-3 py-2 rounded-md mb-4 hover:bg-zinc-700 duration-300 ease-in-out"
        >
          Tambah Menu
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-300 border-2 rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Table Number</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Total Harga</th>
              <th className="p-2 border">Bukti Pembayaran</th>
              <th className="p-2 border">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="transition-all hover:bg-gray-50">
                <td className="p-2 border text-center w-4">{order.id}</td>
                <td className="p-2 border text-center">{order.customer}</td>
                <td className="p-2 border text-center">{order.phone}</td>
                <td className="p-2 border text-center">{order.tableNumber}</td>
                <td className="p-2 border text-center">{order.createdAt}</td>
                <td className="p-2 border text-center">
                  Rp.{order.totalHarga}k
                </td>
                <td className="p-2 border text-center">
                  {order.buktiPembayaranUrl}
                </td>
                <td className="p-2 border">
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        <strong>Menu:</strong> {item.name}
                        <br />
                        <strong>Jumlah:</strong> {item.quantity}
                        <br />
                        <strong>Harga:</strong> {item.price}K
                        <hr className="my-2" />
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
