import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { fetchNearExpiryProducts } from "../../features/Expiry";

const ExpiryPieChart = () => {
  const dispatch = useDispatch();
  const { percentageData, isLoading, error } = useSelector((state) => state.nearExpiry);

  useEffect(() => {
    dispatch(fetchNearExpiryProducts());
  }, [dispatch]);

  useEffect(() => {
    console.table("Percentage Data:", percentageData); // Debugging line
  }, [percentageData]);

  if (isLoading) return <p>Loading pie chart data...</p>;
  if (error) return <p>Error: {error.message || JSON.stringify(error)}</p>;
  

  const COLORS = ["#0088FE", "#FFBB28", "#FF4D4F", "#00C49F", "#FF8042"];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Near Expiry Products Distribution
      </h3>
  
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={percentageData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              fill="#8884d8"
              label={(entry) => `${entry.name}: ${entry.value}%`}
            >
              {percentageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              wrapperStyle={{ marginTop: 20 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
  
};

export default ExpiryPieChart;
