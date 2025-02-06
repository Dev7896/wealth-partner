import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileText, FileTextIcon, FolderPlus, PackagePlus } from "lucide-react";

const AddCategoryForm = ({ category, handleChange, handleSubmit }) => {
  const { toast } = useToast();

  return (
    <Card className="max-w-lg mx-auto shadow-lg rounded-xl p-6 bg-white mt-6">
      <CardHeader className="flex items-center gap-3">
        <PackagePlus className="text-blue-600" size={28} />
        <CardTitle className="text-xl font-semibold text-gray-800">
          Add New Category
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-auto">
          {/* Category Name */}
          <div className="flex flex-col">
            <Label htmlFor="name" className="text-gray-600 text-lg mb-1">
                <FolderPlus size={20} className="text-blue-600 inline-block mr-2" />
              Category Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={category.name}
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <Label htmlFor="description" className="text-gray-600 text-lg mb-1">
                <FileTextIcon size={20} className="text-blue-600 inline-block mr-2" />
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={category.description}
              onChange={handleChange}
              rows="4"
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Add Category
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddCategoryForm;
