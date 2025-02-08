import { useState, useEffect } from "react";
import { Trash2, RotateCcw } from "lucide-react";
import { toast } from "react-hot-toast";
import { formatPrice } from "../../utils/formatPrice";
import { Order } from "../../types/types";
import { getOrders } from "../../utils/getOrders";


const ManageOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
        setOrders(
          JSON.parse(storedOrders).map((order: any) => ({
            ...order,
            totalPrice: Number(order.totalPrice), 
          }))
        );
      } else {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      const formattedOrders = response.map((order: any) => ({
        id: order.id,
        customerName: `User ${order.userId}`,
        totalPrice: Number((Math.random() * 200 + 20).toFixed(2)), // Ensures it's a number
        status: "Processing" as "Processing" | "Shipped",

      }));
      setOrders(formattedOrders);
      localStorage.setItem("orders", JSON.stringify(formattedOrders));
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const handleDeleteOrder = (id: number) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order deleted successfully");
  };

  const toggleOrderStatus = (id: number) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, status: order.status === "Processing" ? "Shipped" : "Processing" as "Processing" | "Shipped" }
        : order
    );
  
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order status updated");
  };

  return (
    <div className="p-6"  data-aos="fade-up">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Order ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Total Price</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="border-b last:border-b-0">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">{formatPrice(order.totalPrice)}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      order.status === "Processing" ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 flex space-x-2">
                  <button
                    onClick={() => toggleOrderStatus(order.id)}
                    className="text-blue-500 cursor-pointer p-1 rounded"
                  >
                    <RotateCcw size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="text-red-500 cursor-pointer p-1 rounded"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4">No orders available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrder;
