import React, { useState } from "react";
import loop4 from "../../assets/loop4.svg";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What is Dhananjay?",
    answer:
      "Dhananjay is a comprehensive financial management tool designed to help you manage your personal and business finances effortlessly.",
  },
  {
    question: "How does Dhananjay help in saving?",
    answer:
      "Dhananjay provides robust financial tools and insights to help you track expenses, set budget limits, and manage payments, helping you save more.",
  },
  {
    question: "Is my data secure with Dhananjay?",
    answer:
      "Yes, Dhananjay uses advanced security measures to ensure your data is safe and secure.",
  },
  {
    question: "Can I track expenses across multiple categories?",
    answer:
      "Absolutely! Dhananjay allows you to track expenses across various categories to give you a clear understanding of your spending habits.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div id="faq" className="faq-section m-10">
        <div className="container">
          <div className="flex justify-center">
            <div className="container-tag text-center">
              <h1 className="title tag text-4xl font-bold mb-4">FAQ</h1>
              <img className="w-48 mx-auto" src={loop4} alt="loop image" />
            </div>
          </div>
          <div className="faq-container mt-8 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item border-b border-gray-200 pb-4"
              >
                <div
                  className="faq-question cursor-pointer text-xl font-semibold"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                </div>
                <div
                  className={`faq-answer mt-2 text-gray-600 transition-all duration-300 overflow-hidden ${
                    openIndex === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-6">
        <p className="text-xl text-center mt-8">
          Join Dhananjay today and take the first step towards financial <br />
          empowerment and freedom.
        </p>
        <button className="mx-auto"> <Link to='/signup'>Get started</Link></button>
      </div>
    </>
  );
}
