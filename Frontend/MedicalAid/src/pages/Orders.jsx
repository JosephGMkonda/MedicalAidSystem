import React from 'react'
import { BsBoxFill,BsClipboard2Check, BsFillPencilFill, BsFillTrashFill,  BsChevronDoubleRight, BsChevronDoubleLeft} from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const Orders = () => {
  return (

    <div className="container p-6 mt-12  overflow-auto">
    <div className="flex items-center justify-between mb-4">
      {/* <div className="bg-blue-500">
        <button className="flex justify-center items-center py-[10px] h-[30px] rounded-[10px] px-[10px] bg-blue-500 text-green">
          <Link to="/form" className="flex items-center space-x-2 text-white">
            <BsBoxFill />
            <span>Add</span>
          </Link>
        </button>
      </div> */}

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
              <th className="py-2 px-4 text-left">Order Number</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              
              
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            
                <tr className="border-b">
                  <td className="py-2 px-4">kkkl</td>
                  <td className="py-2 px-4">ooo</td>
                  
                  
                  <td className="py-2 px-4">
                
                  <button className="px-4 text-white rounded-[10px] shadow-md bg-gray-500">Approve</button>
                  <button className="px-4 text-white rounded-[10px] shadow-md bg-red-500">Reject</button>
                  </td>
                </tr>
        
        
          </tbody>
        </table>
      </div>
    

    
    <div className="flex justify-center mt-4">
      <button
        
        className="px-4 py-2 bg-blue-100 text-gray-500 rounded-lg mr-2"
      >
        <BsChevronDoubleLeft/>
      </button>
    
      <button
    
    
        className="px-4 py-2 bg-blue-100 text-gray-500 rounded-lg ml-4"
      >
        < BsChevronDoubleRight/>
      </button>
    </div>

    </div>

 
  )
}

export default Orders