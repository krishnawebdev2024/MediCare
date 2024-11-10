import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./AnimeComponents/preloader/Preloader";
import ScrollToTop from "./AnimeComponents/ScrollToTop/ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./PageComponents/Navbar/NavBar";
import HeroSection from "./PageComponents/hero-section/HeroSection";
import About from "./PageComponents/about/About";
import Services from "./PageComponents/services/Services";
import Contact from "./PageComponents/contact/Contact";
import Footer from "./PageComponents/footer/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Simulate loading behavior
  useEffect(() => {
    // Disable scroll while preloader is active
    document.body.style.overflow = "hidden";

    // Simulate loading state for a few seconds
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide preloader after loading is complete
      document.body.style.overflow = "auto"; // Re-enable scroll
    }, 2000); // You can change the duration here to match your needs

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto"; // Ensure scroll is re-enabled when component unmounts
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Router>
        <ScrollToTop />
        <NavBar />

        <Routes>
          <Route exact path="/" element={<HeroSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}
