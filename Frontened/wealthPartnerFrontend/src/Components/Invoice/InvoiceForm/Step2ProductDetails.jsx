import React, { useState } from "react";
import AddItems from "./AddItems";

const Step2ProductDetails = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemsChange = (items) => {
    setFormData({ ...formData, items }); // Update items in formData
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextStep(); // Move to the next step
  };

  const handleBack = (e) => {
    e.preventDefault();
    prevStep(); // Move to the previous step
  };

  return (
    <form
      onSubmit={handleNext}
      className="space-y-6 p-6 bg-white shadow-md rounded-md w-full flex flex-col overflow-auto"
    >
      <h2 className="text-3xl font-bold text-gray-800">Product Details</h2>

      {/* Invoice Number */}
      <div className="flex flex-col">
        <label htmlFor="invoiceNumber" className="text-sm font-medium text-gray-700">
          Invoice Number
        </label>
        <input
          type="text"
          id="invoiceNumber"
          name="invoiceNumber"
          value={formData.invoiceNumber || ""}
          onChange={handleChange}
          required
          placeholder="Enter invoice number"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Invoice Date */}
      <div className="flex flex-col">
        <label htmlFor="invoiceDate" className="text-sm font-medium text-gray-700">
          Invoice Date
        </label>
        <input
          type="date"
          id="invoiceDate"
          name="invoiceDate"
          value={formData.invoiceDate || ""}
          onChange={handleChange}
          required
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Due Date */}
      <div className="flex flex-col">
        <label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate || ""}
          onChange={handleChange}
          required
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Add Items */}
      <AddItems items={formData.items || []} onItemsChange={handleItemsChange} />

      {/* Notes */}
      <div className="flex flex-col">
        <label htmlFor="notes" className="text-sm font-medium text-gray-700">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes || ""}
          onChange={handleChange}
          placeholder="Additional details or terms (e.g., late fees)"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2ProductDetails;
