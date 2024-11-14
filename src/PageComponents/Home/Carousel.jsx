import React, { useState } from "react";
import carousalA1 from "../../assets/carousalA1.png";
import carousalA2 from "../../assets/carousalA2.png";
import carousalA3 from "../../assets/carousalA3.png";
import carousalA4 from "../../assets/carousalA4.png";
import carousalA5 from "../../assets/carousalA5.png";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const posts = [
    {
      title: "Schedule Your Appointments with Ease",
      image: carousalA1,
      description:
        "With our Appointment Maker, booking doctor visits is quick and convenient. No more long waiting times!",
    },
    {
      title: "Reminders for Upcoming Appointments",
      image: carousalA2,
      description:
        "Never miss an appointment again. Our app sends you timely reminders so you can stay on top of your health.",
    },
    {
      title: "Choose from a Variety of Specialists",
      image: carousalA3,
      description:
        "The Appointment Maker app gives you access to a wide range of healthcare professionals in your area.",
    },
    {
      title: "Track Your Health Journey",
      image: carousalA4,
      description:
        "Keep track of your medical history and appointments easily with our user-friendly interface.",
    },
    {
      title: "Easy Online Consultations",
      image: carousalA5,
      description:
        "Consult with doctors from the comfort of your home using our secure online consultation feature.",
    },
  ];

  const nextPost = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const prevPost = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + posts.length) % posts.length
    );
  };

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div className="flex-shrink-0">
          <img
            src={posts[currentIndex].image}
            alt={posts[currentIndex].title}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-transparent">
          <h2 className="text-white text-2xl font-semibold">
            {posts[currentIndex].title}
          </h2>
          <p className="text-white">{posts[currentIndex].description}</p>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4">
        <button
          onClick={prevPost}
          className="text-white bg-black p-2 rounded-full shadow-lg"
        >
          &#60;
        </button>
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4">
        <button
          onClick={nextPost}
          className="text-white bg-black p-2 rounded-full shadow-lg"
        >
          &#62;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
