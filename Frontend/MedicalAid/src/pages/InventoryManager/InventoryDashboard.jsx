import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInventorySummary  } from "../../features/InventoryManagerSlice";
import LowStock from "../Charts/LowStock";
import ExpiryPieChart from "../Charts/ExpiryPieChart"

const InventoryDashboard = () => {
  const dispatch = useDispatch();
  const { totalValue, totalQuantity, expiredProductCount, loading, error } = useSelector(
      (state) => state.inventory
  );

  useEffect(() => {
    dispatch(fetchInventorySummary());
  }, [dispatch]);

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className=" p-6 mt-12 space-y-6">
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        <div className="bg-white p-6 rounded-lg shadow-md transform transition hover:scale-105">
          <h2 className="text-lg font-semibold text-blue-600">Total Quantity</h2>
          <p className="text-2xl font-bold text-gray-800">{totalQuantity}</p>
        </div>

        
        <div className="bg-white p-6 rounded-lg shadow-md transform transition hover:scale-105">
          <h2 className="text-lg font-semibold text-green-600">Total Value</h2>
          <p className="text-2xl font-bold text-gray-800">
            K {totalValue?.toLocaleString()}
          </p>
        </div>

        
        <div className="bg-white p-6 rounded-lg shadow-md transform transition hover:scale-105">
          <h2 className="text-lg font-semibold text-purple-600">
          Expired Products
          </h2>
          <p className="text-2xl font-bold text-gray-800">
            {expiredProductCount}
          </p>
        
         
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

export default InventoryDashboard;
