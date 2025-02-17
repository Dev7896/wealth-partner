import React, { useState } from "react";
import InvoiceFormWrapper from "../Components/Invoice/InvoiceForm/InvoiceFormWrapper";
import InvoicePreview from "../Components/Invoice/InvoicePreview/InvoicePreview";
import { prepareData } from "../Components/Invoice/InvoiceUtils"; // Utility function to create invoiceData
import jsPDF from "jspdf";

const Invoice = () => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (formData) => {
    const preparedInvoiceData = prepareData(formData);
    setInvoiceData(preparedInvoiceData);
    setIsPreviewVisible(true); // Show preview after form submission
  };

  const handleDownloadInvoice = () => {
    if (!invoiceData) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Invoice", 105, 10, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 10, 20);
    doc.text(`Date: ${invoiceData.invoiceDate}`, 10, 30);
    doc.text(`Due Date: ${invoiceData.dueDate}`, 10, 40);
    doc.text(`Customer Name: ${invoiceData.customerName}`, 10, 50);
    doc.text(`Customer Email: ${invoiceData.customerEmail}`, 10, 60);

    doc.text("Items:", 10, 70);
    invoiceData.items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} (Qty: ${item.quantity}, Price: $${
          item.price
        })`,
        10,
        80 + index * 10
      );
    });

    doc.text(`Total Amount: $${invoiceData.totalAmount}`, 10, 120);
    doc.text(`Notes: ${invoiceData.notes}`, 10, 130);

    doc.save("invoice.pdf");
  };

  return (
    <div className="container mx-auto p-6">
      {!isPreviewVisible ? (
        <InvoiceFormWrapper formData={formData} setFormData={setFormData} handleFormSubmit={handleFormSubmit} />
      ) : (
        <InvoicePreview
          invoiceData={invoiceData}
          onEdit={() => setIsPreviewVisible(false)} // Allow editing
        />
      )}
    </div>
  );
};

export default Invoice;
