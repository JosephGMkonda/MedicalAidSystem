import React, { useState, useEffect } from 'react';
import { BsSearch, BsChevronDoubleRight, BsChevronDoubleLeft,BsClipboard2Check } from "react-icons/bs";

const OrderUpdate = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch orders from API
  useEffect(() => {
    fetch("http://localhost:5000/api/orders", {
      method: 'GET',
      credentials: 'include', 
    })
      .then((res) => res.json())
      .then((data) => {
        
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Expected an array but got:", data);
          setOrders([]); 
        }
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setOrders([]); 
      });
  }, []);
  

  // Open modal and set selected order
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Handle status update
  const updateOrderStatus = (status) => {
    if (!selectedOrder) return;

    fetch(`http://localhost:5000/api/orders/${selectedOrder.uuid}`, {
      method: 'PUT',
      credentials: 'include', 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((updatedOrder) => {
        setOrders(orders.map((order) => (order.uuid === updatedOrder.uuid ? updatedOrder : order)));
        setIsModalOpen(false); 
      })
      .catch((err) => console.error("Error updating order:", err));
  };

  return (
    <div className="container p-6 mt-12 overflow-auto">
    
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center rounded-[5px]">
          <input type="text" placeholder="Search" className="w-full h-[40px] px-4 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-[5px]">
            <BsSearch color="white" />
          </div>
        </div>
      </div>

      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-black">
              <th className="py-2 px-4 text-left">Order Number</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(orders) && orders.length > 0 ? (
    orders.map((order) => (
      <tr key={order.uuid} className="border-b">
        <td className="py-2 px-4">{order.orderNumber}</td>
        <td className="py-2 px-4">{order.quantity}</td>
        <td className="py-2 px-4">
          <button onClick={() => handleViewOrder(order)} className="px-4 py-1 text-white rounded-[10px] shadow-md bg-gray-500">
          <BsClipboard2Check/>
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3" className="text-center py-4">
        No orders found
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      
      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 bg-blue-100 text-gray-500 rounded-lg mr-2">
          <BsChevronDoubleLeft />
        </button>
        <button className="px-4 py-2 bg-blue-100 text-gray-500 rounded-lg ml-4">
          <BsChevronDoubleRight />
        </button>
      </div>

      {/* Order Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 ">
            <h2 className="text-xl font-bold mb-4">Invoice</h2>
            <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
            <p><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p> 
            <p><strong>Description:</strong> {selectedOrder.description}</p> 
            

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-black">
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Unit Price</th>
              <th className="py-2 px-4 text-left">Total Cost</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(selectedOrder?.OrderItems) && selectedOrder.OrderItems.length > 0 ? (
    selectedOrder.OrderItems.map((item) => (
      <tr key={item.uuid} className="border-b">
        <td className="py-2 px-4">{item.productName}</td>
        <td className="py-2 px-4">{item.quantity}</td>
        <td className="py-2 px-4">{item.unitPrice}</td>
        <td className="py-2 px-4">{item.itemTotalCost}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center py-4">
        No order items found
      </td>
    </tr>
  )}
</tbody>

 

        </table>
        
        
      </div>

      <p className="text-right font-bold mt-4">Grand Total: K {selectedOrder.totalCost?.toLocaleString()}</p>

            
            <div className="flex justify-between mt-4">
              <button onClick={() => updateOrderStatus("Dispatch")} className="px-4 py-2 bg-green-500 text-white rounded-lg">
                Dispatch
              </button>
              
            </div>

            
            <button onClick={() => setIsModalOpen(false)} className="mt-4 px-4 py-2 bg-gray-300 rounded-lg w-full">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderUpdate;
