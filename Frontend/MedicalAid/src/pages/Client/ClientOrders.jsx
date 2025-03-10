import React, { useState, useEffect } from 'react';
import { BsSearch, BsChevronDoubleRight, BsChevronDoubleLeft,BsClipboard2Check } from "react-icons/bs";

const ClientOrders = () => {
  const [orders, setOrders] = useState([]); 
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Function to fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'GET',
          credentials: 'include', 
        });
        
        const data = await response.json();
        
        
        if (Array.isArray(data)) {
          setOrders(data); 
        } else {
          console.error('Expected an array of orders, but got:', data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []); 


  const viewInvoice = (order) => {
    setSelectedOrder(order);
  };

  
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Client Orders</h1>

      
      <table className="table-auto w-full border-collapse mb-6">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left">Order Number</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Quantity</th>
            <th className="py-2 px-4 text-left">Total Cost</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.orderNumber} className="border-b">
                <td className="py-2 px-4">{order.orderNumber}</td>
                <td className="py-2 px-4">{order.status}</td>
                <td className="py-2 px-4">{order.quantity}</td>
                <td className="py-2 px-4">{order.totalCost}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => viewInvoice(order)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <BsClipboard2Check/>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 px-4 text-center">
                No orders available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
          <h2 className="text-xl font-bold mb-4">Invoice</h2>
            
            
            <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
            <p><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p> 
            <p><strong>Description:</strong> {selectedOrder.description}</p> 

            <table className="table-auto w-full border-collapse mb-6">
            <thead>
            <tr className="bg-blue-100 text-black">
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Unit Price</th>
              <th className="py-2 px-4 text-left">Total Cost</th>
            </tr>
          </thead>
              <tbody>
                {selectedOrder.OrderItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{item.productName}</td>
                    <td className="py-2 px-4">{item.unitPrice}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">{item.itemTotalCost}</td>
                  </tr>
                  
                ))}
              </tbody>
            </table>

            <p className="text-right font-bold mt-4">Grand Total: K {selectedOrder.totalCost?.toLocaleString()}</p>

            <button
              onClick={() => setSelectedOrder(null)}
              className="text-red-600 hover:text-red-800 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientOrders;
