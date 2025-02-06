import React from "react";

const Step1CustomerDetails = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextStep(); // Moves to the next step
  };

  return (
    <form
      onSubmit={handleNext}
      className="space-y-6 p-6 bg-white shadow-md rounded-md flex flex-col w-full overflow-auto"
    >
      <h2 className="text-3xl font-bold text-gray-800">Customer Details</h2>

      {/* Customer Name */}
      <div className="flex flex-col">
        <label htmlFor="customerName" className="text-sm font-medium text-gray-700">
          Customer Name
        </label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName || ""}
          onChange={handleChange}
          required
          placeholder="Enter customer's full name"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Customer Address */}
      <div className="flex flex-col">
        <label htmlFor="customerAddress" className="text-sm font-medium text-gray-700">
          Customer Address
        </label>
        <textarea
          id="customerAddress"
          name="customerAddress"
          value={formData.customerAddress || ""}
          onChange={handleChange}
          required
          placeholder="Enter customer's full address"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      {/* Customer Email */}
      <div className="flex flex-col">
        <label htmlFor="customerEmail" className="text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          value={formData.customerEmail || ""}
          onChange={handleChange}
          required
          placeholder="Enter customer's email"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Customer Phone */}
      <div className="flex flex-col">
        <label htmlFor="customerPhone" className="text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="customerPhone"
          name="customerPhone"
          value={formData.customerPhone || ""}
          onChange={handleChange}
          required
          placeholder="Enter customer's phone number"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tax Identification Number */}
      <div className="flex flex-col">
        <label htmlFor="taxId" className="text-sm font-medium text-gray-700">
          Tax Identification Number (Optional)
        </label>
        <input
          type="text"
          id="taxId"
          name="taxId"
          value={formData.taxId || ""}
          onChange={handleChange}
          placeholder="Enter tax ID (e.g., GSTIN/VAT)"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Next Button */}
      <div className="text-right">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step1CustomerDetails;
