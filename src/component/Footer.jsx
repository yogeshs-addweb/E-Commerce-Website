import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Info */}
        <div>
          <Link to="/">
            <h1 className="text-red-500 text-3xl font-bold mb-2">Store</h1>
          </Link>
          <p className="text-sm leading-relaxed mb-2">
            Powering Your World with the Best in Electronics.
          </p>
          <p className="text-sm mb-1">Location : Ahmedabad, Gujarat, India</p>
          <p className="text-sm mb-1">Email: badshah@store.com</p>
          <p className="text-sm">Phone: +91 98798 71016</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              "Contact Us",
              "Shipping & Returns",
              "FAQs",
              "Order Tracking",
              "Size Guide",
            ].map((item, index) => (
              <li
                key={index}
                className="hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white ms-2">
            Follow Me
          </h3>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://www.instagram.com/badshahh__16"
              target="_black"
              className="hover:text-blue-500"
            >
              <FaInstagram size={26} />
            </a>

            <a
              href="https://www.linkedin.com/in/yogesh-solanki-749405262"
              target="_black"
              className="hover:text-blue-500"
            >
              <FaLinkedin size={26} />
            </a>

            <a
              href="https://github.com/Yogesh-Solanki-16"
              target="_black"
              className="hover:text-blue-500"
            >
              <IoLogoGithub size={26} />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">
            Stay in the Loop
          </h3>
          <p className="text-sm mb-4">
            Subscribe to get special offers, free giveaways, and more.
          </p>
          <form className="flex my-6">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow p-2 rounded-l-md bg-gray-800 text-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500 w-[150px]"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-4 text-sm text-white rounded-r-md transition duration-300 w-[100px]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-red-500 font-medium">Yogesh Solanki</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
