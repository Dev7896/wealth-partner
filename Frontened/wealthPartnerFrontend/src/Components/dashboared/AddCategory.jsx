import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Import Swal styles
import Cookies from 'js-cookie';
import AddCategoryForm from '../ui/AddCategoryForm';

const AddCategory = () => {
  const [category, setCategory] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = Cookies.get('email')
      const response = await axios.post('http://localhost:8080/api/categories/add', { ...category, email });
      // Using Swal to show a success message
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#28a745',
      });
      setCategory({ name: '', description: '' });
    } catch (error) {
      // Using Swal to show an error message
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Error adding category',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#dc3545',
      });
    }
  };

  return (
    // <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-xl flex flex-col gap-2 items-center mt-8">
    //   <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add New Category</h2>
    //   <form onSubmit={handleSubmit} className="flex flex-col gap-12">
    //     <div className="flex flex-col">
    //       <label htmlFor="name" className="text-lg text-gray-600 mb-2">Category Name</label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="name"
    //         value={category.name}
    //         onChange={handleChange}
    //         required
    //         className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>
    //     <div className="flex flex-col">
    //       <label htmlFor="description" className="text-lg text-gray-600 mb-2">Description</label>
    //       <textarea
    //         id="description"
    //         name="description"
    //         value={category.description}
    //         onChange={handleChange}
    //         className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         rows="4"
    //       ></textarea>
    //     </div>
    //     <button
    //       type="submit"
    //       className="w-full py-3 mt-4  text-white rounded-md"
    //     >
    //       Add Category
    //     </button>
    //   </form>
    // </div>
    <AddCategoryForm category={category} handleChange={handleChange} handleSubmit={handleSubmit} />
  );
};

export default AddCategory;
