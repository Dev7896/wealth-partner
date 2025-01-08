import React from 'react';
import bgImage from "../../assets/footerBackground.svg"; // Set the path to your background image
import avatar from "../../assets/avatar.png"; // Set the path to the author's avatar

export default function Footer() {
  return (
    <footer
      className="text-white py-10"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="container mx-auto px-4 text-black">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img className="w-20 h-20 rounded-full object-cover" src={avatar} alt="Author Avatar" />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold">Rahul Acharya</h2>
              <p className="text-gray-300">wealthPartner9@example.com</p>
              <div className="flex justify-center md:justify-start gap-4 mt-2">
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                  <i className="ri-twitter-line text-xl"></i>
                </a>
                <a href="https://linkedin.com/in/author" target="_blank" rel="noopener noreferrer">
                  <i className="ri-linkedin-line text-xl"></i>
                </a>
                <a href="https://github.com/Dev7896" target="_blank" rel="noopener noreferrer">
                  <i className="ri-github-line text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-6 md:mt-0">
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            <a href="/contact-us" className="hover:underline">Contact Us</a>
            <a href="/terms-of-use" className="hover:underline">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}