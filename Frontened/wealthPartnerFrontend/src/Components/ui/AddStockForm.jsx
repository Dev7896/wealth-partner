import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PackagePlus, List, Tag, Boxes, DollarSign } from "lucide-react";
import { color } from "framer-motion";

const AddStockForm = ({ stock, handleChange, handleSubmit, categories, error }) => {
  return (
    <Card className="max-w-md mx-auto p-6 shadow-lg rounded-xl mt-8">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Add New Stock
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 text-center">Categories not found</p>}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Stock Name */}
          <div className="flex flex-col">
            <Label htmlFor="name">
              <div className="flex items-center gap-2 text-lg text-gray-600">
                <PackagePlus size={20} className="text-blue-600" /> Stock Name
              </div>
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={stock.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <Label htmlFor="quantity">
              <div className="flex items-center gap-2 text-lg text-gray-600">
                <Boxes size={20} className="text-green-600" /> Quantity
              </div>
            </Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              value={stock.quantity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <Label htmlFor="price">
              <div className="flex items-center gap-2 text-lg text-gray-600">
                <DollarSign size={20} className="text-yellow-600" /> Price
              </div>
            </Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={stock.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category Selection */}
          <div className="flex flex-col">
            <Label htmlFor="category">
              <div className="flex items-center gap-2 text-lg text-gray-600">
                <List size={20} className="text-purple-600" /> Category
              </div>
            </Label>
            <Select
              value={stock.category}
              onValueChange={(value) => handleChange({ target: { name: "category", value } })}
              required
             
            >
              <SelectTrigger style={{ color: "black" }}>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-2">
            Add Stock
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddStockForm;
