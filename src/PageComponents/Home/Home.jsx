import React from "react";
import { useState } from "react";
import HeroImage from "../../assets/HeroImage.png";
import AccordionImage from "../../assets/accordionImage.png";
import { Link } from "react-router-dom";

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <div className="w-screen overflow-x-hidden">
        <div
          className="w-screen overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center mt-[80px] p-6"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="bg-slate-800 dark:bg-slate-200 w-full h-full rounded-3xl overflow-hidden relative">
            <img
              src={HeroImage}
              alt="Medical Practice"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-10 text-left text-white dark:text-white p-6">
              <h1 className="text-6xl font-semibold mb-4">
                Your modern medical practice
              </h1>
              <Link to="/createAccount">
                <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Book an Appointment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-screen overflow-hidden h-auto bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-6">
        <div className=" text- z-10 p-6">
          <h1 className="text-4xl font-semibold mb-4 text-slate-900 dark:text-slate-200">
            Healthcare reimagined for the modern world.
          </h1>
          <p className="text-4xl font-medium mb-6 text-slate-700 dark:text-slate-400">
            Driven by empathy. Guided by technology. We offer a seamless,
            personalized care experience, built to empower you on every step of
            your wellness journey. Our mission: to make exceptional healthcare
            accessible, reliable, and always centered around you.
          </p>
        </div>
      </div>

      <div className="w-screen overflow-hidden   bg-slate-100 dark:bg-slate-800 flex items-center justify-center py-6 px-[80px]">
        <div className="bg-[#EFC712] dark:bg-slate-600 w-full h-full rounded-3xl x-overflow-hidden ">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 md:p-8 lg:p-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {service.title}
                </h2>
                <p className="text-center text-gray-700 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-screen overflow-hidden h-auto bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-6">
        <div className=" text- z-10 p-6">
          <h1 className="text-4xl  font-semibold mb-4 text-slate-900 dark:text-slate-200">
            Empowering Financial Wellness for the Future.
          </h1>
          <p className="text-4xl  font-medium mb-6 text-slate-700 dark:text-slate-400">
            Built on trust. Powered by innovation. We bring you a seamless,
            personalized financial experience, crafted to support your goals at
            every stage. Our mission: to make exceptional financial solutions
            accessible, dependable, and designed around your unique journey.
          </p>
        </div>
      </div>

      <div className="w-screen overflow-hidden   bg-slate-100 dark:bg-slate-800 flex items-center justify-center  pb-[80px] px-[80px]">
        <div className=" flex flex-wrap sm:flex-nowrap gap-8 bg-slate-400 dark:bg-slate-600 w-full h-full rounded-3xl overflow-hidden p-8">
          <div className="space-y-4 flex-1">
            {items.map((item, index) => (
              <div key={index} className="collapse collapse-plus bg-base-200">
                <input
                  type="radio"
                  name="my-accordion-3"
                  checked={selectedIndex === index}
                  onChange={() =>
                    setSelectedIndex(selectedIndex === index ? null : index)
                  }
                />
                <div className="collapse-title text-xl font-medium">
                  {item.title}
                </div>
                <div className="collapse-content">
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 ">
            <img
              src={AccordionImage}
              alt="Medical Practice"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

const services = [
  {
    title: "Comprehensive Care",
    description:
      "Providing all aspects of healthcare management, from appointments to follow-ups, to ensure holistic care.",
    icon: "💼",
  },
  {
    title: "Personalized Health Tracking",
    description:
      "Access your medical history, prescriptions, and treatment plans all in one secure place.",
    icon: "📈",
  },
  {
    title: "Specialist Access",
    description:
      "Connect with highly qualified specialists across various fields for expert care.",
    icon: "🩺",
  },
  {
    title: "Appointment Scheduling",
    description:
      "Book, reschedule, or cancel appointments at your convenience, with reminders for seamless management.",
    icon: "📅",
  },
  {
    title: "Telemedicine Services",
    description:
      "Consult with healthcare professionals from the comfort of your home, anytime.",
    icon: "💻",
  },
  {
    title: "24/7 Support",
    description:
      "Our team is here to support you round the clock, ensuring your health needs are always met.",
    icon: "📞",
  },
];

const items = [
  {
    title: "The Wellness Journey Program",
    content:
      "A holistic approach to health, supporting you every step of the way. Join our Wellness Journey Program to receive tailored care plans designed just for you.",
  },
  {
    title: "Personalized Health Guidance",
    content:
      "It’s not just about treatments, but about understanding your unique needs. With our program, you get personalized health advice from a dedicated team that works with you on your wellness goals.",
  },
  {
    title: "Dedicated Health Coordinators",
    content:
      "Your health journey is supported by a team of professionals who provide assistance when needed. From health questions to appointment scheduling, our coordinators are your go-to for seamless care.",
  },
  {
    title: "Comprehensive Health Assessments",
    content:
      "Regular check-ups are key to long-term health. You will receive an annual, in-depth health review to monitor progress and ensure you stay on track toward your health goals.",
  },
  {
    title: "Telemedicine and Virtual Care",
    content:
      "Access healthcare professionals from the comfort of your home. Our virtual consultations make it easy to get medical advice, prescriptions, and follow-up care without the need for an in-person visit.",
  },
  {
    title: "24/7 Health Support Line",
    content:
      "Our dedicated health support line is always available, ensuring you have access to a healthcare professional whenever you need it. Get answers to urgent health inquiries around the clock.",
  },
  {
    title: "Continuous Care and Support",
    content:
      "We don’t just treat; we build long-lasting relationships. In case of emergency or when your regular physician is unavailable, our team is always ready to step in with your full medical history.",
  },
  {
    title: "Priority Access to Care",
    content:
      "Sometimes life doesn’t wait. As part of our program, you’ll receive priority access to time slots for appointments and treatments, ensuring you never have to wait too long for care.",
  },
];
