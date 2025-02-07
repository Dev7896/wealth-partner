import jsPDF from "jspdf";
import "jspdf-autotable";

export const prepareData = (formData) => {
  const invoiceNumber = `INV-${Date.now()}`; // Example of generating a unique invoice number
  const currentDate = new Date().toISOString().split("T")[0]; // Today's date

  return {
    companyName: formData.companyName || "Your Company Name",
    companyAddress: formData.companyAddress || "Your Company Address",
    companyEmail: formData.companyEmail || "Your Company Email",
    companyPhone: formData.companyPhone || "Your Company Phone",
    customerName: formData.customerName || "Customer Name",
    customerAddress: formData.customerAddress || "Customer Address",
    customerEmail: formData.customerEmail || "Customer Email",
    customerPhone: formData.customerPhone || "Customer Phone",
    invoiceNumber,
    invoiceDate: currentDate,
    dueDate: formData.dueDate || "2025-02-15",
    paymentTerms: formData.paymentTerms || "Net 30",
    items: formData.items || [],
    totalAmount:
      formData.items?.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      ) || 0,
    notes:
      formData.notes ||
      "Payment is due within 30 days. Thank you for your business!",
  };
};

const handleDownloadInvoice = () => {
  if (!invoiceData) return;

  const doc = new jsPDF();

  // **Header Section**
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("INVOICE", 105, 20, { align: "center" });

  // **Company Details**
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Company Name ${invoiceData.companyName}`, 10, 30);
  doc.text(`Company Address : ${invoiceData.companyAddress}`, 10, 38);
  doc.text(`Company Email: ${invoiceData.companyEmail}`, 10, 46);
  doc.text(`Company Phone: ${invoiceData.companyPhone}`, 10, 54);

  // **Invoice Details**
  const startY = 65;
  doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 140, startY);
  doc.text(`Date: ${invoiceData.invoiceDate}`, 140, startY + 8);
  doc.text(`Due Date: ${invoiceData.dueDate}`, 140, startY + 16);

  // **Customer Details**
  doc.text(`Bill To: ${invoiceData.customerName}`, 10, startY + 30);
  doc.text(`Email: ${invoiceData.customerEmail}`, 10, startY + 38);

  // **Item Table**
  const tableStartY = startY + 50;
  const tableHeaders = ["Item", "Quantity", "Unit Price ($)", "Total ($)"];
  const tableData = invoiceData.items.map((item) => [
    item.name,
    item.quantity,
    `$${item.price.toFixed(2)}`,
    `$${(item.quantity * item.price).toFixed(2)}`,
  ]);

  doc.autoTable({
    startY: tableStartY,
    head: [tableHeaders],
    body: tableData,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255] }, // Dark blue header
  });

  // **Total Amount**
  const totalAmountY = doc.autoTable.previous.finalY + 10;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(
    `Total Amount: $${invoiceData.totalAmount.toFixed(2)}`,
    10,
    totalAmountY
  );

  // **Notes Section**
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(`Notes: ${invoiceData.notes || "N/A"}`, 10, totalAmountY + 10);

  // **Save PDF**
  doc.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);
};
