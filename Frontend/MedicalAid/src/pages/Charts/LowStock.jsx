import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { fetchLowStockProducts } from "../../features/LowStockSlice";

const LowStock = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.lowStock);

  useEffect(() => {
    dispatch(fetchLowStockProducts());
  }, [dispatch]);

  if (isLoading) return <p>Loading bar chart data...</p>;
  if (error) return <p>Error: {error}</p>;

  
  const totalValue = products.reduce(
    (acc, product) => acc + product.quantity * product.unitPrice,
    0
  );

  // Colors for bars: highlight critically low stock (quantity < 10)
  const barColors = products.map((product) =>
    product.quantity < 10 ? "#FF4D4F" : "#1890FF"
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Low Stock Products
      </h3>

    

      {/* Bar chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={products} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="productName" tick={{ fill: "#8884d8" }} />
          <YAxis tick={{ fill: "#8884d8" }} />
          <Tooltip
            formatter={(value, name, entry) =>
              name === "quantity"
                ? [`${value} units`, "Quantity"]
                : [`K${entry.payload.unitPrice}`, "Unit Price"]
            }
          />
          <Legend />
          <Bar dataKey="quantity" name="Quantity">
            {products.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LowStock;
