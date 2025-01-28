import React, { useState } from "react";
import Step1CustomerDetails from "./Step1CustomerDetails";
import Step2ProductDetails from "./Step2ProductDetails";
import PaymentDetails from "./Step3PaymentDetails";
import { prepareData } from "../InvoiceUtils";
import { showMessage } from "../../LoginSections/SignupUtility";

const InvoiceFormWrapper = ({handleFormSubmit}) => {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    const invoiceData = prepareData(formData);
    // console.log("Final Form Data:", formData);
    showMessage("invoice submiited succesfully", "success");
    handleFormSubmit(invoiceData) ;

  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-lg">
      {step === 1 && (
        <Step1CustomerDetails
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2ProductDetails
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <PaymentDetails
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default InvoiceFormWrapper;
