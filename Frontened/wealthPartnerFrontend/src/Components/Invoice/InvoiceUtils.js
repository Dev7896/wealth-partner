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
      totalAmount: formData.items?.reduce(
        (total, item) => total + item.quantity * item.unitPrice,
        0
      ) || 0,
      notes: formData.notes || "Payment is due within 30 days. Thank you for your business!",
    };
  };
  