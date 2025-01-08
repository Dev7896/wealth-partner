import Comparison from "./Comparison";
import ComparisonTwo from "./comparisonTwo";
import FAQ from "./FAQ";
import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Testimonials from "./Testimonials";

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
