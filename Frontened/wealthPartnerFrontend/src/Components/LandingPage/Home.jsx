import finance from "../../assets/finance.svg";
import "../../styles/LandingPage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import arrow9 from "../../assets/arrow9.svg";
import loop from "../../assets/loop.svg";

export default function Home() {
  return (
    <>
      <div id="home" className="home flex flex-col relative md:flex-row items-center justify-between">
        <div className="flex flex-col md:w-1/2 space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl text-center leading-normal capitalize md:text-5xl font-bold md:text-start animate-fadeUp">
              Empower your <br /> financial <br />
              journey with us
            </h1>
            <p className="text-lg text-center md:text-xl text-gray-600 md:text-start animate-fadeUp">
              we simplify financial management by offering comprehensive tools
              and insights tailored to your unique needs.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row animate-fadeUp">
            <button className="bg-primary-color text-white py-2 px-4 rounded-md">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signup"
              >
                get started <i className="ri-arrow-right-up-line"></i>
              </Link>
            </button>
            <p className="animate-fadeUp" >
              <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span>Built on</span>{" "}
                <span className="container-tag">
                  <span className="tag">trust</span>
                  <img
                    src={loop}
                    alt="first image"
                    style={{ width: "80px" }}
                    className="circle"
                    
                  />
                </span>{" "}
              </p>
              driven by success
            </p>
          </div>
        </div>

        <img
          src={finance}
          className="w-full md:w-1/2 h-auto md:mt-0 animate-fadeUp md:animate-slideInRight"
          alt="financial analytics"
          loading="lazy"
        />
        <img
          className="block mx-auto md:w-1/4 transform rotate-10 absolute bottom-0 left-1/2 -translate-x-1/2 arrows animate-fadeUp"
          src={arrow9}
          alt="arrow"
        />
      </div>
    </>
  );
}
