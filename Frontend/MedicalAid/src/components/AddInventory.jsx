import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInventory } from '../features/inventory';

const AddInventory = ({ onClose }) => {
  const [formData, setFormData] = useState({
    productName: '',
    unitPrice: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addInventory(formData));
    onClose();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter Product Name"
            required
          />
        </div>

        <div>
          <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
          Unit Price
          </label>
          <input
            type="number"
            id="unitPrice"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter unitPrice"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventory;
