import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GradientBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to values between 0 and 1
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  // Adjust gradient position slightly based on mouse movement for interactive effect
  const gradientStyle = {
    backgroundPosition: `${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%`
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-0"
      style={{
        background: "linear-gradient(135deg, #FF7A00, #FFDE59)",
        backgroundSize: "400% 400%",
        ...gradientStyle
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  );
}
