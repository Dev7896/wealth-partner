import React from 'react';
import vector from "../../assets/Vector.svg";

const TestimonialsCard = ({ name, testimonial, avatar }) => {
  return (
    <div className="relative border border-gray-300 p-6 flex flex-col items-center h-auto rounded-lg shadow-md md:h-60 md:w-1/3">
      <div className="mb-4 flex flex-col items-center">
        <img className="w-16 h-16 rounded-full mb-2" src={avatar} alt="person" />
        <h2 className="text-xl font-bold text-center">{name}</h2>
      </div>
      <p className="text-gray-600 text-center mb-8">{testimonial}</p>
      <img className="w-full h-auto absolute bottom-0 left-0" src={vector} alt="vector" />
    </div>
  );
};

export default TestimonialsCard;