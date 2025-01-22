import React, { useEffect, useState } from 'react';
import { BsBoxFill, BsClipboard2Check, BsFillPencilFill, BsFillTrashFill, BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventory,deleteInventory } from '../features/inventory';
import AddInventory from '../components/AddInventory';
import EditInventory from '../components/EditInventory';
import ViewDetails from '../components/ViewDetails';

const Inventory = () => {
  const dispatch = useDispatch();
  const { inventories, isLoading, isError, message } = useSelector((state) => state.inventories);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentInventory, setCurrentInventory] = useState(null);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false); 


  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openEditPopup = (inventory) => {
    setCurrentInventory(inventory);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setCurrentInventory(null);
  };


  const openViewPopup = (inventory) => {
    setCurrentInventory(inventory);
    setIsViewPopupOpen(true);
  };

  const closeViewPopup = () => {
    setIsViewPopupOpen(false);
    setCurrentInventory(null);
  };

  const handleDelete = (id) => {
    
      dispatch(deleteInventory(id)); 
    
  };


  return (
    <div className="container p-6 mt-12 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-blue-500">
          <button
            onClick={openPopup}
            className="flex justify-center items-center py-[10px] h-[30px] rounded-[10px] px-[10px] bg-blue-500 text-green"
          >
            <span className="flex items-center space-x-2 text-white">
              <BsBoxFill />
              <span>Add</span>
            </span>
          </button>
        </div>

        <div className="flex items-center rounded-[5px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-[40px] px-4 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-[5px]">
            <BsSearch color="white" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-black">
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Total Value</th>
              <th className="py-2 px-4 text-left">Expiration Date</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {inventories.map((inventory) => (
              <tr key={inventory.id} className="border-b">
                <td className="py-2 px-4">{inventory.productName}</td>
                <td className="py-2 px-4">{inventory.quantity}</td>
                <td className="py-2 px-4">K {inventory.totalValue}</td>
                <td className="py-2 px-4">{inventory.expirationDate}</td>
                <td className="py-2 px-4">
                  <button 
                  onClick={() => openViewPopup(inventory)} 
                  className="px-2 text-blue-500">
                    <BsClipboard2Check />
                  </button>
                  <button 
                  onClick={() => openEditPopup(inventory)}
                  className="px-2 text-green-500">
                    <BsFillPencilFill />
                  </button>
                  <button 
                  onClick={() => handleDelete(inventory.id)} 
                  className="px-2 text-red-500">
                    <BsFillTrashFill />
                  </button>
                </td>
              </tr>
            ))}
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

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <AddInventory onClose={closePopup} />
        </div>
      )}


{isEditPopupOpen && currentInventory && (
        <EditInventory inventory={currentInventory} onClose={closeEditPopup} />
      )}


            {isViewPopupOpen && currentInventory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ViewDetails inventory={currentInventory} onClose={closeViewPopup} />
        </div>
      )}
    </div>

  );
};

export default Inventory;
