import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editInventory } from '../features/inventory';

const EditInventory = ({ inventory, onClose }) => {
  const [formData, setFormData] = useState({
    productName: inventory.productName,
    quantity: inventory.quantity,
    batchNumber: inventory.batchNumber || '',
    expirationDate: inventory.expirationDate || '',
    unitPrice: inventory.unitPrice,
    description: inventory.description || '',
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editInventory({ id: inventory.uuid, inventoryData: formData }));
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">Edit Inventory</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleInputChange}
            placeholder="Batch Number"
            className="w-full p-2 border rounded"
          />
          <input
            type="datetime-local"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleInputChange}
            placeholder="Expiration Date"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            step="0.01"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleInputChange}
            placeholder="Unit Price"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInventory;
