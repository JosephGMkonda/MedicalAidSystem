import React, { useState } from 'react'
import {editUser} from '../features/UserSlice'
import { useDispatch } from 'react-redux'



const EditUser = ({user, onClose}) => {
  const [formData, setFormData] = useState(user);
  const dispatch = useDispatch()


  const handleChange = (e) => {
     setFormData({...formData, [e.target.name]: e.target.value});

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(formData))
    onClose();
  };



  



  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
    <h2 className="text-2xl font-bold mb-4">Add User</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          
        />
      </div>

      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
      
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          
        />
      </div>

      
  

      
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="client">Client</option>
        </select>
      </div>

      
      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add User
        </button>
      </div>
    </form>
  </div>
  )
}

export default EditUser