import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package, ShoppingCart, DollarSign } from "lucide-react";

const StatCard = ({ type, value }) => {
  // Select icon based on the type
  const getIcon = () => {
    switch (type) {
      case "stock":
        return <Package className="text-blue-600" size={28} />;
      case "sales":
        return <ShoppingCart className="text-green-600" size={28} />;
      case "revenue":
        return <DollarSign className="text-yellow-600" size={28} />;
      default:
        return <Package className="text-gray-600" size={28} />;
    }
  };

  // Select title based on the type
  const getTitle = () => {
    switch (type) {
      case "stock":
        return "Total Stock";
      case "sales":
        return "Total Sales";
      case "revenue":
        return "Total Revenue";
      default:
        return "Statistics";
    }
  };

  return (
    <Card className="w-full max-w-sm bg-white shadow-md hover:shadow-lg transition-all rounded-lg p-4">
      <CardHeader className="flex items-center space-x-3">
        <div className="bg-gray-100 p-1 rounded-full">{getIcon()}</div>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {getTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col items-start">
        <p className="text-4xl font-bold text-gray-900 mx-auto">
        {type === "revenue" ? `₹${(value ?? 0).toLocaleString()}` : value ?? 0}
        </p>
        <p className="text-sm text-gray-500 mt-1 text-center">
          Updated just now • Keep track of your {type}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
