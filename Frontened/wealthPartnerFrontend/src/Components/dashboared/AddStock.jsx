import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import AddStockForm from "../ui/AddStockForm";

const AddStock = () => {
  const [categories, setCategories] = useState([]);
  const [stock, setStock] = useState({
    name: "",
    quantity: 0,
    price: 0,
    category: "",
  });
  const [error, setError] = useState("");

  // Fetch categories from the backend on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/categories/"
        );
        setCategories(response.data);
      } catch (error) {
        console.log(error);
        setError("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = Cookies.get("email");
      const response = await axios.post(
        "http://localhost:8080/api/stocks/add",
        { ...stock, email }
      );
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "Okay",
      });
      setStock({ name: "", quantity: 0, price: 0, category: "" });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Error adding stock",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    // <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl flex flex-col items-center overflow-scroll mt-8">
    //   <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
    //     Add New Stock
    //   </h2>
    //   {error && <p className="text-red-500 text-center">{error}</p>}

    //   <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
    //     <div className="flex flex-col">
    //       <label htmlFor="name" className="text-lg text-gray-600 mb-1">
    //         Stock Name
    //       </label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="name"
    //         value={stock.name}
    //         onChange={handleChange}
    //         required
    //         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     <div className="flex flex-col">
    //       <label htmlFor="quantity" className="text-lg text-gray-600 mb-1">
    //         Quantity
    //       </label>
    //       <input
    //         type="number"
    //         id="quantity"
    //         name="quantity"
    //         value={stock.quantity}
    //         onChange={handleChange}
    //         required
    //         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     <div className="flex flex-col">
    //       <label htmlFor="price" className="text-lg text-gray-600 mb-1">
    //         Price
    //       </label>
    //       <input
    //         type="number"
    //         id="price"
    //         name="price"
    //         value={stock.price}
    //         onChange={handleChange}
    //         required
    //         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     <div className="flex flex-col">
    //       <label htmlFor="category" className="text-lg text-gray-600 mb-1">
    //         Category
    //       </label>
    //       <select
    //         id="category"
    //         name="category"
    //         value={stock.category}
    //         onChange={handleChange}
    //         required
    //         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       >
    //         <option value="">Select Category</option>
    //         {categories?.map((category) => (
    //           <option key={category._id} value={category._id}>
    //             {category.name}
    //           </option>
    //         ))}
    //       </select>
    //     </div>

    //     <button
    //       type="submit"
    //       className="w-full py-3 mt-2  text-white rounded-md "
    //     >
    //       Add Stock
    //     </button>
    //   </form>
    // </div>
    <AddStockForm stock={stock} handleChange={handleChange} handleSubmit={handleSubmit} categories={categories} error={error} />
  );
};

export default AddStock;
