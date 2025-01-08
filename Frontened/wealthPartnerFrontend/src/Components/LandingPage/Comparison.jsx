import analytics from "../../assets/analytics.svg";
import arrow1 from "../../assets/arrow1.svg";

const features = [
  "Instant financial reports for quick decisions.",
  "Visual charts for income, expense, profit, and loss.",
  "Track expenses across multiple categories.",
  "Set and monitor budget limits easily.",
  "Automatic reminders and payment tracking.",
];

export default function Comparison() {
  return (
    <>
      <div className="comparison relative mt-12">
        <div className="container flex flex-col gap-12 md:flex-row justify-between">
          <img
            className="w-full h-auto md:w-1/2 md:h-auto"
            src={analytics}
            loading="lazy"
            alt=""
          />
          <div>
            <h1 className="title primary-color font-bold text-center mb-3">
              Why choose Dhananjay?
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
        </div>
        <img
          className="absolute  bottom-0 md:-rotate-12 arrows md:w-1/4 md:left-1/2 md:right-1/2"
          src={arrow1}
          alt="arrow1 image"
        />
      </div>
    </>
  );
}
