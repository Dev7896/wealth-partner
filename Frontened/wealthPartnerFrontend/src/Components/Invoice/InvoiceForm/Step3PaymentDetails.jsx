import React from "react";

const PaymentDetails = ({ formData, setFormData, prevStep, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = (e) => {
    e.preventDefault();
    prevStep(); // Go back to the previous step
  };

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit(); // Final form submission
  };

  return (
    <form onSubmit={submitForm} className="space-y-6 p-6 bg-white shadow-md rounded-md w-full flex flex-col ">
      <h2 className="text-3xl font-bold text-gray-800">Payment Details</h2>

      {/* Payment Method */}
      <div className="flex flex-col">
        <label htmlFor="paymentMethod" className="text-sm font-medium text-gray-700">
          Payment Method
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod || ""}
          onChange={handleChange}
          required
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select a payment method
          </option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
          <option value="PayPal">PayPal</option>
        </select>
      </div>

      {/* Transaction ID */}
      <div className="flex flex-col">
        <label htmlFor="transactionId" className="text-sm font-medium text-gray-700">
          Transaction ID (Optional)
        </label>
        <input
          type="text"
          id="transactionId"
          name="transactionId"
          value={formData.transactionId || ""}
          onChange={handleChange}
          placeholder="Enter transaction ID"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Total Amount */}
      <div className="flex flex-col">
        <label htmlFor="totalAmount" className="text-sm font-medium text-gray-700">
          Total Amount
        </label>
        <input
          type="number"
          id="totalAmount"
          name="totalAmount"
          value={formData.totalAmount || ""}
          onChange={handleChange}
          required
          placeholder="Enter total amount"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PaymentDetails;
