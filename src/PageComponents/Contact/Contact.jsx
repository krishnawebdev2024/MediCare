import React from "react";

const Contact = () => {
  return (
    <div className="mt-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200  py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-5xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Contact Us
        </h1>
        <p className="text-center text-lg mb-8 max-w-2xl mx-auto">
          We’d love to hear from you! Whether you have questions, feedback, or
          need assistance, our team is here to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Get In Touch
            </h2>
            <form action="#" method="POST" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full p-3 mt-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-3 mt-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full p-3 mt-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 mt-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Our Location
            </h2>
            <p className="mb-4">123 Medicare Avenue, Health City, HC 4567</p>
            <div className="flex space-x-4">
              <a
                href="tel:+1234567890"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Call Us: +1 234 567 890
              </a>
              <a
                href="mailto:support@medicare.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Email Us: support@medicare.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
