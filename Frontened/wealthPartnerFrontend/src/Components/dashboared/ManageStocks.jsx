import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const ManageStocks = ({updateReport}) => {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStocks();
  }, []);
  const fetchStocks = async () => {
    const email = Cookies.get("email"); // Get the email from cookies
    try {
      // Send the email as a query parameter in the GET request
      const response = await fetch(
        `http://localhost:8080/api/stocks?email=${email}`
      );
      const data = await response.json();
      setStocks(data.stocks); // Update stocks state
      updateReport(data.stocks);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleSell = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/stocks/sell/${id}`,  // Corrected URL
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Ensure headers are set
          },
        }
      );
      // console.log(response);
      if (response.ok) {
        Swal.fire("Success", "Stock sold successfully!", "success");
        fetchStocks(); // Refresh stock list after selling
      } else {
        const data = await response.json();
        console.log(data);
        Swal.fire("Error", data.error || "Failed to sell stock", "error");
      }
    } catch (error) {
      console.error("Error selling stock:", error);
    }
  };
  

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Manage Stocks
      </h2>

      <input
        type="text"
        placeholder="Search stocks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500"
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Stock Name</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Quantity</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks
              .filter((stock) =>
                stock.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((stock) => (
                <tr key={stock._id} className="text-center">
                  <td className="border p-3">{stock.name}</td>
                  <td className="border p-3">{stock.category.name}</td>
                  <td className="border p-3">{stock.quantity}</td>
                  <td className="border p-3">${stock.price}</td>
                  <td className="border p-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleSell(stock._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Sell
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStocks;
