import loop4 from "../../assets/loop4.svg";
import underline from "../../assets/underline.png";
import FeatureBox from "./FeatureBox";
export default function Features() {
  const features = [
    {
      title: "Personalized Insights",
      description:
        "Gain insights into your financial situation and make informed decisions.",
      icon: 'ri-lightbulb-line',
    },
    {
      title: "Budget Management",
      description: "Set and track your budget, ensuring you don't overspend.",
      icon: 'ri-wallet-line',
    },
    {
      title: "Expense Tracking",
      description: "Monitor your expenses and identify areas for improvement.",
      icon: 'ri-bar-chart-line',
    },
  ];
  return (
    <>
      <div id="services" className="features mt-12">
        <div className="mb-8" style={{ display: "flex", justifyContent: "center" }}>
          <div className="container-tag">
            <h1 className="title tag">Features</h1>
            <img style={{ width: "200px" }} src={loop4} alt="" />
          </div>
        </div>
        <div className="container flex flex-col flex-nowrap md:flex-row md:flex-nowrap justify-center gap-4">
          {features.map((feature, index) => (
            <FeatureBox
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </>
  );
}
