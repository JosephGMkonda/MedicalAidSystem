import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData } from "../features/AdminSlice";
import LowStock from "./Charts/LowStock";
import ExpiryPieChart from "./Charts/ExpiryPieChart"

const Dashboard = () => {
  const dispatch = useDispatch();
  const { clientCount, totalValue, projectedProfit, isLoading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  
  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className=" p-6 mt-12 space-y-6">
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        <div className="bg-white p-6 rounded-lg shadow-md transform transition hover:scale-105">
          <h2 className="text-lg font-semibold text-blue-600">Clients</h2>
          <p className="text-2xl font-bold text-gray-800">{clientCount}</p>
        </div>

        
        <div className="bg-white p-6 rounded-lg shadow-md transform transition hover:scale-105">
          <h2 className="text-lg font-semibold text-green-600">Total Value</h2>
          <p className="text-2xl font-bold text-gray-800">
            K {totalValue?.toLocaleString()}
          </p>
        </div>

        
        <div className="bg-white p-6 rounded-lg shadow-md transform transition hover:scale-105">
          <h2 className="text-lg font-semibold text-purple-600">
            Projected Profit
          </h2>
          <p className="text-2xl font-bold text-gray-800">
            K {projectedProfit?.toLocaleString()}
          </p>
        
          <div className="relative mt-4 w-full h-4 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-purple-500 rounded-full"
              style={{ width: "80%" }}
            ></div>
            <span className="absolute top-1/2 left-4 text-sm text-white transform -translate-y-1/2">
              80%
            </span>
          </div>
        </div>
      </div>


      <div className="flex mt-[22px] w-full gap-[30px]">
        <div className="basis-[50%]">
          <LowStock/>

        </div>

        <div className="basis-[50%]">
          <ExpiryPieChart/>

        </div>

        

      </div>
    </div>
  );
};

export default Dashboard;
