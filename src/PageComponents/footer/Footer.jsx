import React from "react";
import ActionButton from "./ActionButton";
import TimeDisplay from "./TimeDisplay";
import SocialLinks from "./SocialLinks";
import MagneticButton from "./MagneticButton";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <section className="flex flex-col justify-between bg-[#1C1D20] px-6 pt-12 text-white sm:px-10 sm:py-18">
        {/* Heading with responsive text size */}
        <div>
          <p className="text-3xl font-bold uppercase tracking-tight text-left sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl">
            Ready to Experience Healthcare Redefined?
          </p>
          <div className="mt-4">
            <Link to="/patient-signup" className="hover:text-gray-300">
              <MagneticButton />
            </Link>
          </div>

          {/* Horizontal line with consistent width and spacing */}
          <div className="w-full h-[1px] bg-slate-400 my-8 mx-auto" />

          {/* Buttons section with responsive layout */}
          <div className="flex flex-wrap gap-4 ">
            <div className="flex flex-wrap gap-4 ">
              <Link to="/" className="hover:text-gray-300">
                <ActionButton href="#" label="home" />
              </Link>
              <Link to="/about" className="hover:text-gray-300">
                <ActionButton href="#About" label="About" />
              </Link>
              <Link to="/services" className="hover:text-gray-300">
                <ActionButton href="#services" label="Services" />
              </Link>
              <Link to="/contact" className="hover:text-gray-300">
                <ActionButton href="#contact" label="Contact" />
              </Link>
            </div>
          </div>
        </div>

        {/* Horizontal line */}
        <div className="w-full h-[1px] bg-slate-400 my-8 mx-auto" />

        {/* Bottom information row */}
        <div className="flex flex-row md:flex-row items-center justify-between bg-[#1C1D20] text-white mb-10">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-slate-400 mb-1">Version:</p>
            <p className="text-sm text-slate-400">2024 © MedicareApp Edition</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-slate-400 mb-1">
              Current Time:
            </p>
            <TimeDisplay />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
