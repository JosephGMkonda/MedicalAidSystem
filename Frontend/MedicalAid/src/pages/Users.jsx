import React, {useEffect, useState} from 'react'
import { BsBoxFill,BsClipboard2Check, BsFillPencilFill, BsFillTrashFill,  BsChevronDoubleRight, BsChevronDoubleLeft} from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { fetchUser, deleteUser } from '../features/UserSlice';
import EditUser from '../components/editUser';



const Users = () => {

  const dispatch = useDispatch()
  const {users, isLoading, isError, message} =  useSelector((state) => state.users)
  const [editUser, setEditUser] = useState(null)


  useEffect(() => {
    dispatch(fetchUser())
  },[dispatch])

  const handleDelete = (id) => {
    dispatch(deleteUser())

  };

  const handleEdit = (user) => {
    setEditUser(user)
  }

  return (

    <div className="container p-6 mt-12  overflow-auto">
    <div className="flex items-center justify-between mb-4">
      <div className="bg-blue-500">
        <button className="flex justify-center items-center py-[10px] h-[30px] rounded-[10px] px-[10px] bg-blue-500 text-green">
          <Link to="/form" className="flex items-center space-x-2 text-white">
            <BsBoxFill />
            <span>Add</span>
          </Link>
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
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
                <tr className="border-b">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  
                  <td className="py-2 px-4">
                
                  <button 
                   onClick={() => handleEdit(user)}
                  className="px-2 text-blue-500"><BsFillPencilFill/></button>
                  <button 
                  onClick={() => handleDelete(user.id)}
                  className="px-2 text-red-500"><BsFillTrashFill/></button>
                  </td>
                </tr>
              ))}
        
          </tbody>
        </table>
      </div>

      {
        editUser && (
          <EditUser
          user={editUser}
          onClose={() => setEditUser(null)}
          />
        )
      }
    

    
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

export default Users