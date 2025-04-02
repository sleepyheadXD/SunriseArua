import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GradientBackgroundProps {
  colors?: string[];
  filter?: string;
  animationSpeed?: number;
}

export default function GradientBackground({ 
  colors = ["#FF7A00", "#FFDE59"],
  filter = "none",
  animationSpeed = 1
}: GradientBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to values between 0 and 1
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  return (
    <motion.div 
      className="fixed inset-0 z-0 will-change-transform transition-all duration-700"
      style={{
        backgroundSize: "400% 400%",
        backgroundImage: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        backgroundPosition: `${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%`,
        filter: filter, // Apply the mood's filter
      }}
      key={`${colors[0]}-${colors[1]}-${filter}`} // Force re-render when colors or filter change
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 15 / animationSpeed, // Faster animation when speed is higher
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  );
}
