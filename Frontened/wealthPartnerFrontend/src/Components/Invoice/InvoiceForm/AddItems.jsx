import React, { useState } from "react";

const AddItems = ({ items, onItemsChange }) => {
  const [itemList, setItemList] = useState(items);

  const handleAddItem = () => {
    setItemList([...itemList, { name: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = itemList.filter((_, i) => i !== index);
    setItemList(updatedItems);
    onItemsChange(updatedItems);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...itemList];
    updatedItems[index][field] = value;
    setItemList(updatedItems);
    onItemsChange(updatedItems);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Product Items</h3>

      {itemList.map((item, index) => (
        <div key={index} className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Item Name"
            value={item.name}
            onChange={(e) => handleItemChange(index, "name", e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            min="1"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
            className="w-20 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(index, "price", e.target.value)}
            className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleRemoveItem(index)}
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={handleAddItem}
        type="button"
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Add Item
      </button>
    </div>
  );
};

export default AddItems;
