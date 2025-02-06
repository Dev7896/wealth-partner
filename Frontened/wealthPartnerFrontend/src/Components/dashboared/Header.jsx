import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Assuming you already have this component
import { Button } from "@/components/ui/button"; // Assuming you already have this component
import { cn } from "@/lib/utils"; // Utility function for combining classes
import Cookies from "js-cookie";
import {Smile} from 'lucide-react' ;
const Header = () => {
  const username = Cookies.get("email").split("@")[0];
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // You can add the functionality for searching here
  };

  return (
    <header className="w-full bg-white shadow-md p-4 flex justify-between items-center rounded-xl">
      {/* Logo or Title */}
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold text-gray-700">
          Hello {username || "User"}
          <span className="ml-2">👋</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-72 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </Button>
      </div>
    </header>
  );
};

export default Header;
