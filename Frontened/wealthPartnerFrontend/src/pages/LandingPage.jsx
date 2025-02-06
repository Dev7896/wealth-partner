import Comparison from "../Components/LandingPage/Comparison";
import ComparisonTwo from "../Components/LandingPage/comparisonTwo";
import FAQ from "../Components/LandingPage/FAQ";
import Features from "../Components/LandingPage/Features";
import Footer from "../Components/LandingPage/Footer";
import Header from "../Components/LandingPage/Header";
import Home from "../Components/LandingPage/Home";
import Testimonials from "../Components/LandingPage/Testimonials";

export default function LandingPage() {
  return (
    // <div>this is my landing page</div>
    <>
      <Header />
      <Home />
      <Features />
      <Comparison />
      <ComparisonTwo />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
