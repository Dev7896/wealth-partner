import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Package, List, Hash, IndianRupee } from "lucide-react";

export default function EditStockForm({ stock, onClose, handleUpdateStock }) {
  const [formData, setFormData] = useState({
    id: stock._id,
    name: stock.name,
    category: stock.category.name,
    quantity: stock.quantity,
    price: stock.price,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData) ;
    await handleUpdateStock(formData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto border-2 border-black shadow-lg shadow-black/40 p-6 rounded-xl bg-white">
        <DialogHeader className="flex justify-between items-center mb-2">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-600" /> Edit Stock
          </DialogTitle>
          {/* <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-red-500" />
          </Button> */}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Stock Name */}
          <div className="relative">
            <Package className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Stock Name"
              className="pl-10"
            />
          </div>

          {/* Category */}
          <div className="relative">
            <List className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <Input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="Category"
              className="pl-10"
            />
          </div>

          {/* Quantity */}
          <div className="relative">
            <Hash className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <Input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
              placeholder="Quantity"
              className="pl-10"
            />
          </div>

          {/* Price */}
          <div className="relative">
            <IndianRupee className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Price"
              className="pl-10"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
