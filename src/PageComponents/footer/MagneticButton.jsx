import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const MagneticButton = ({ onClick }) => {
  // State to track hover
  const [isHovered, setIsHovered] = useState(false);

  // Use motion values for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Scale up on hover
  const scale = useTransform(x, [-20, 20], [1, 1.1]);

  // Mouse move event for magnetic effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (left + width / 2);
    const dy = e.clientY - (top + height / 2);
    x.set(dx / 2); // Adjust magnetic strength by dividing
    y.set(dy / 2);
  };

  // Reset position on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      className="flex items-center justify-center w-[140px] h-[140px] rounded-full bg-indigo-600 cursor-pointer overflow-hidden"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x,
        y,
        scale,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.span
        initial={{ scale: 2.5 }}
        animate={{ scale: isHovered ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
      >
        Patient SignUp
      </motion.span>
    </motion.div>
  );
};

export default MagneticButton;
