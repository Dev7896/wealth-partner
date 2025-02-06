import Payment from "../Components/payment/payment";

export default function Pricingpage() {
  const pricingFeatures = [
    "Access to all financial tools in one platform.",
    "Real-time expense tracking and detailed analytics.",
    "Customizable financial reports and insights.",
    "Seamless integration with your existing accounts.",
    "Dedicated support team available 24/7.",
    "Unlimited transactions and data storage.",
  ];
  return (
    <article id="pricingpage" className="">
      <p className="text-5xl font-bold landscape:text-4xl text-center mt-14 mb-8 capitalize">
        our suitable packages
      </p>
      <p className="text-gray-400 text-center mb-12 capitalize text-xl">
        7 days Free trial . <br /> no credit card required
      </p>
      <hr className="border border-gray-200 landscape:hidden mx-6" />
      <div
        id="pricingcard"
        className="py-10 px-8 landscape:py-12 landscape:px-10 items-center w-full landscape:w-2/3 mx-auto flex flex-col gap-12 landscape:gap-0 landscape:flex-row justify-between capitalize text-xl rounded-3xl landscape:border "
      >
        <div className="flex flex-col items-center landscape:flex landscape:items-start">
          <p className="text-gray-400 mb-8">
            <span className=" mr-2 text-4xl font-bold primary-color">
              $ 80.00
            </span>{" "}
            / Month
          </p>
          <p className="mb-8 text-3xl font-bold">enterprise plan</p>
          <p>best plan for the enterprises</p>
          {/* <button className="mt-8 landscape:self-start">purchase plan</button> */}
          <Payment />
        </div>
        <div className="p-10 rounded-3xl bg-gray-50 ">
          <ul className="flex flex-col gap-4">
            {pricingFeatures.map((statement, index) => {
              return (
                <div key={index} className="flex items-center">
                  <i class="ri-checkbox-circle-line text-3xl landscape:text-2xl mr-4 primary-color "></i>
                  <li>{statement}</li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}
