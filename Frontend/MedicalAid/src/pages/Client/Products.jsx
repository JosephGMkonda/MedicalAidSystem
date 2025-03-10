import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../../features/ClientProductSlice";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.inventoryProduct);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [description, setDescription] = useState("");

  // Fetch products
  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  // Handle product selection
  const handleProductChange = (e, index) => {
    const { value } = e.target;
    setOrderItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].inventoryId = value;
      return newItems;
    });
  };

  // Handle quantity change
  const handleQuantityChange = (e, index) => {
    const { value } = e.target;
    setOrderItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].quantity = value;
      return newItems;
    });
  };

  const getProductDetails = (inventoryId) => {
    return products.find((product) => product.uuid === inventoryId);
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => {
      const product = getProductDetails(item.inventoryId);
      return sum + (product ? product.unitPrice * item.quantity : 0);
    }, 0);
  };

  // Add a new product row
  const addProductRow = () => {
    setOrderItems((prevItems) => [...prevItems, { inventoryId: "", quantity: 1 }]);
  };

  // Handle "View Invoice" button click
  const handleViewInvoice = () => {
    setIsFormOpen(false);
    setIsInvoiceOpen(true);
  };

  // Handle final order submission
  const handleSubmit = async () => {
    const orderData = {
      items: orderItems,
      deliveryAddress,
      description,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/orders", orderData);
      console.log("Order created:", response.data);
      setIsInvoiceOpen(false);
    } catch (error) {
      console.error("Error creating order:", error.response || error);
    }
  };

  return (
    <div className="container p-6 mt-12 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Products</h1>
        <button
          className="flex justify-center items-center py-[10px] h-[30px] rounded-[10px] px-[10px] bg-blue-500 text-white"
          onClick={() => setIsFormOpen(true)}
        >
          <FiShoppingCart />
          <span>Order</span>
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Restoring the original product table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 border-b text-left font-medium text-gray-600">Product Name</th>
              <th className="p-4 border-b text-left font-medium text-gray-600">Unit Price</th>
              <th className="p-4 border-b text-left font-medium text-gray-600">Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.uuid} className="hover:bg-gray-50">
                <td className="p-4 border-b">{product.productName}</td>
                <td className="p-4 border-b">K {product.unitPrice?.toLocaleString()}</td>
                <td className="p-4 border-b">
                  {new Date(product.expirationDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Order</h2>

            <div className="mb-4">
              <label className="block mb-1">Delivery Address</label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {orderItems.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center space-x-2">
                  <select
                    value={item.inventoryId}
                    onChange={(e) => handleProductChange(e, index)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product.uuid} value={product.uuid}>
                        {product.productName}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, index)}
                    className="w-24 p-2 border border-gray-300 rounded-lg"
                    placeholder="Quantity"
                    min="1"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addProductRow}
              className="px-4 py-2 bg-green-500 text-white rounded-lg mt-4"
            >
              Add Product
            </button>

            <div className="flex justify-between items-center mt-4">
              <button className="px-4 py-2 bg-gray-200 rounded-lg" onClick={() => setIsFormOpen(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleViewInvoice}>
                View Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {isInvoiceOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">Invoice</h2>
            <p><strong>Delivery Address:</strong> {deliveryAddress}</p>
            <p><strong>Description:</strong> {description}</p>

            <table className="w-full mt-4 border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, index) => {
                  const product = products.find((p) => p.uuid === item.inventoryId);
                  return (
                    <tr key={index}>
                      <td className="p-2 border">{product?.productName || "Unknown"}</td>
                      <td className="p-2 border">{item.quantity}</td>
                      <td className="p-2 border">K {product ? item.quantity * product.unitPrice : 0?.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <p className="text-right font-bold mt-4">Grand Total: K {calculateTotal()?.toLocaleString()}</p>

            <button className="px-4 py-2 bg-gray-300 rounded-lg mt-4" onClick={() => setIsInvoiceOpen(false)}>
              Back
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-4" onClick={handleSubmit}>
              Submit Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
