import React from "react";
import loop from "../../assets/loop.svg";
import TestimonialsCard from "./TestimonialsCard";
import person1 from "../../assets/person1.jpg";
import person2 from "../../assets/person2.jpg";
import person3 from "../../assets/person3.jpg";

const testimonials = [
  {
    name: "John Doe",
    testimonial:
      "Dhananjay has transformed my financial management. Highly recommend!",
    avatar: person1,
  },
  {
    name: "Jane Smith",
    testimonial: "Amazing tools and insights. Helped me save a lot.",
    avatar: person2,
  },
  {
    name: "Robert Brown",
    testimonial: "Excellent features and easy to use. Great experience!",
    avatar: person3,
  },
];

export default function Testimonials() {
  return (
    <div className="testimonials mt-12">
      <h1 className="capitalize text-2xl md:text-4xl text-center primary-color font-semibold mt-10">
        save more with Dhananjay
      </h1>
      <p className="mt-4 text-xl flex flex-col md:flex-row items-center gap-4 justify-center text-center md:text-left">
        <span>We believe you can surpass these averages and become</span>
        <span className="flex items-center gap-2">
          <span className="container-tag">
            <span className="tag">our next success</span>
            <img className="w-40 md:w-40 h-auto" src={loop} alt="loop image" />
          </span>
        </span>
        <span>story.</span>
      </p>
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialsCard
            key={index}
            name={testimonial.name}
            testimonial={testimonial.testimonial}
            avatar={testimonial.avatar}
          />
        ))}
      </div>
    </div>
  );
}
