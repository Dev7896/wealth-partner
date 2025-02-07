import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Search, IndianRupee } from "lucide-react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import EditStockForm from "../ui/EditStockFrom";

const ManageStocks = ({ updateReport }) => {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");
  const [editStock, setEditStock] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    const email = Cookies.get("email");
    try {
      const response = await fetch(
        `http://localhost:8080/api/stocks?email=${email}`
      );
      const data = await response.json();
      setStocks(data.stocks);
      updateReport(data.stocks);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleSell = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/stocks/sell/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        Swal.fire("Success", "Stock sold successfully!", "success");
        fetchStocks();
      } else {
        const data = await response.json();
        Swal.fire("Error", data.error || "Failed to sell stock", "error");
      }
    } catch (error) {
      console.error("Error selling stock:", error);
    }
  };

  const handleEditClick = (stock) => {
    setEditStock(stock);
  };

  const handleUpdateStock = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/stocks/${formData.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        Swal.fire("Success", "Stock updated successfully!", "success");
        fetchStocks();
        setEditStock(null);
      } else {
        Swal.fire("Error", "Failed to update stock", "error");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  return (
    <Card className="p-6 shadow-xl rounded-lg mt-8 bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Manage Stocks</h2>

      <div className="flex items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-gray-300"
        />
        <Button
          variant="outline"
          className="border-gray-300 text-black shadow-xl"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Stock Name</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks
              .filter((stock) =>
                stock.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((stock) => (
                <TableRow key={stock._id} className="text-center">
                  <TableCell>{stock.name}</TableCell>
                  <TableCell>{stock.category.name}</TableCell>
                  <TableCell>{stock.quantity}</TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center">
                      <IndianRupee size={16} /> {stock.price}
                    </div>
                  </TableCell>
                  <TableCell className="flex justify-center gap-3">
                    <Button
                      className={" bg-white hover:shadow-xl "}
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSell(stock._id)}
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                    <Button
                      className={" bg-white hover:shadow-xl"}
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(stock)}
                    >
                      <Pencil className="w-5 h-5 text-blue-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {editStock && (
        <EditStockForm
          stock={editStock}
          onClose={() => setEditStock(null)}
          handleUpdateStock={handleUpdateStock}
        />
      )}
    </Card>
  );
};

export default ManageStocks;
