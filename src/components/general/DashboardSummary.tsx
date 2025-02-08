import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getOrders } from "../../utils/getOrders";
import { getProducts } from "../../utils/getProducts";
import { Order, Product } from "../../types/types";
import { formatPrice } from "../../utils/formatPrice";

const DashboardSummary = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedOrders = localStorage.getItem("orders");
      const storedProducts = localStorage.getItem("products");
      
      if (storedOrders) setOrders(JSON.parse(storedOrders));
      else setOrders(await getOrders());
      
      if (storedProducts) setProducts(JSON.parse(storedProducts));
      else setProducts(await getProducts());
    };
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);
  const pendingOrders = orders.filter(order => order.status === "Processing").length;

  const revenueByCategory = products.reduce((acc:any, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.price;
    return acc;
  }, {});

  const barChartData = Object.keys(revenueByCategory).map(category => ({
    category,
    revenue: revenueByCategory[category],
  }));

  const orderStatusData = [
    { name: "Processing", value: pendingOrders },
    { name: "Shipped", value: orders.length - pendingOrders },
  ];

  const COLORS = ["#FF8042", "#0088FE"];

  return (
    <div className="p-6"  data-aos="zoom-in">
      <h2 className="text-2xl font-bold mb-4">Dashboard Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold">
            {formatPrice(Number(totalRevenue.toFixed(2)))}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(1)}%)`
                }
              >
                {orderStatusData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
