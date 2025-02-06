import React from "react";

const InvoicePreview = ({ invoiceData, onEdit, onDownload }) => {
  return (
    <div className="max-w-4xl mx-auto my-10 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-primary text-white p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Invoice</h1>
          <p className="text-sm">A comprehensive summary of your transaction</p>
        </div>
        <div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 mr-2"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
            onClick={onDownload}
          >
            Download
          </button>
        </div>
      </div>

      {/* Company and Customer Details */}
      <div className="grid grid-cols-2 gap-6 p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Company Details</h2>
          <p className="mt-1 text-gray-600">
            <strong>{invoiceData?.companyName || "Your Company Name"}</strong>
          </p>
          <p className="text-gray-600">{invoiceData?.companyAddress || "123 Business Street, City, Country"}</p>
          <p className="text-gray-600">{invoiceData?.companyEmail || "company@example.com"}</p>
          <p className="text-gray-600">{invoiceData?.companyPhone || "+123 456 7890"}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800">Bill To</h2>
          <p className="mt-1 text-gray-600">
            <strong>{invoiceData?.customerName || "Customer Name"}</strong>
          </p>
          <p className="text-gray-600">{invoiceData?.customerAddress || "Customer Address"}</p>
          <p className="text-gray-600">{invoiceData?.customerEmail || "customer@example.com"}</p>
          <p className="text-gray-600">{invoiceData?.customerPhone || "+987 654 3210"}</p>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-2 gap-6 px-6 pb-6">
        <div>
          <p className="text-gray-600">
            <span className="font-semibold">Invoice Number: </span>
            {invoiceData?.invoiceNumber || "INV-0001"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Invoice Date: </span>
            {invoiceData?.invoiceDate || "2025-01-01"}
          </p>
        </div>
        <div>
          <p className="text-gray-600">
            <span className="font-semibold">Due Date: </span>
            {invoiceData?.dueDate || "2025-01-15"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Payment Terms: </span>
            {invoiceData?.paymentTerms || "Net 30"}
          </p>
        </div>
      </div>

      {/* Items Table */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Invoice Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Item</th>
                <th className="px-4 py-2 text-right text-gray-600">Quantity</th>
                <th className="px-4 py-2 text-right text-gray-600">Unit Price</th>
                <th className="px-4 py-2 text-right text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData?.items?.length > 0 ? (
                invoiceData.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 text-gray-700">{item.name}</td>
                    <td className="px-4 py-2 text-right text-gray-700">{item.quantity}</td>
                    <td className="px-4 py-2 text-right text-gray-700">{item.price}</td>
                    <td className="px-4 py-2 text-right text-gray-700">
                      {item.quantity * item.price}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-600">
                    No items added to the invoice.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Section */}
      <div className="px-6 py-4 bg-gray-100">
        <div className="flex justify-between items-center text-gray-700">
          <h3 className="text-lg font-semibold">Total</h3>
          <p className="text-2xl font-bold">
            ${invoiceData?.totalAmount?.toFixed(2) || "0.00"}
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {invoiceData?.notes || "Thank you for your business!"}
        </p>
      </div>

      {/* Footer */}
      <div className="bg-gray-200 text-gray-600 text-center py-4 text-sm">
        <p>
          Need help? Contact us at{" "}
          <a
            href={`mailto:${invoiceData?.companyEmail || "support@example.com"}`}
            className="text-blue-500 underline"
          >
            {invoiceData?.companyEmail || "support@example.com"}
          </a>
        </p>
        <p>
          © {new Date().getFullYear()} {invoiceData?.companyName || "Your Company Name"}
        </p>
      </div>
    </div>
  );
};

export default InvoicePreview;
