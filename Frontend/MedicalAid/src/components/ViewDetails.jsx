import React from 'react';

const ViewDetails = ({ inventory, onClose }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Product Details</h2>
      <p><strong>Product Name:</strong> {inventory.productName}</p>
      <p><strong>Quantity:</strong> {inventory.quantity}</p>
      <p><strong>Batch Number:</strong> {inventory.batchNumber || 'N/A'}</p>
      <p><strong>Expiration Date:</strong> {inventory.expirationDate || 'N/A'}</p>
      <p><strong>Unit Price:</strong> K {inventory.unitPrice}</p>
      <p><strong>Total Price:</strong> K {inventory.totalValue}</p>
      <p><strong>Created At:</strong> {inventory.createdAt}</p>
      <p><strong> Updated At:</strong> {inventory.updatedAt}</p>

      
      <p><strong>Description:</strong> {inventory.description || 'No description provided.'}</p>
      <button 
        onClick={onClose} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Close
      </button>
    </div>
  );
};

export default ViewDetails;
