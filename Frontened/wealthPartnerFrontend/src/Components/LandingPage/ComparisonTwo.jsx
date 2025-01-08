import sales from "../../assets/sales.svg";
import arrow9 from "../../assets/arrow9.svg";

const features = [
  "Automated Data Management ",
  "User-friendly Interface",
  "Enhanced Security",
  "Expert Support",
];

export default function ComparisonTwo() {
  return (
    <div className="comparisonTwo mt-12 relative">
      <div className="container flex flex-col gap-12 md:flex-row justify-between">
        <div>
          <h1 className="title primary-color font-bold text-center mb-3">
            Dhannajay vs Excel
          </h1>
          <p className="mb-3 text-center md:text-start">
            At Dhananjay, we empower you with <br />
            robust financial tools designed to make your business <br />
            and personal finance management effortless.
          </p>
          {features.map((feature, index) => (
            <div key={index} className="flex gap-1 mb-2 items-center">
              <i className="ri-check-line primary-color ri-2x"></i>
              <p>{feature}</p>
            </div>
          ))}
        </div>

        <img
          className="w-full h-auto md:w-1/2 md:h-auto"
          src={sales}
          alt="sales image"
          loading="lazy"
        />
      </div>
          <img className="absolute md:w-1/4 bottom-0  right-1/2 rotate-12 arrows" src={arrow9} alt="arrow9 image" />
    </div>
  );
}
