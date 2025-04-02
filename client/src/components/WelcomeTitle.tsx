import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface WelcomeTitleProps {
  scrollProgress: number;
}

export default function WelcomeTitle({ scrollProgress }: WelcomeTitleProps) {
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the screen
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  // Update aura size and intensity based on scroll progress
  useEffect(() => {
    controls.start({
      width: 220 + scrollProgress * 200,
      height: 220 + scrollProgress * 200,
      opacity: 0.7 + scrollProgress * 0.3,
    });
  }, [scrollProgress, controls]);
  
  return (
    <div className="relative inline-block">
      {/* Aura effect */}
      <motion.div
        className="absolute rounded-full z-[-1]"
        style={{
          filter: "blur(60px)",
          background: "#FFEB3B",
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
        }}
        initial={{
          width: 220,
          height: 220,
          opacity: 0.7,
        }}
        animate={controls}
      />
      
      {/* Title text */}
      <motion.h1
        className="text-6xl md:text-8xl font-extrabold text-white mb-4 relative"
        style={{
          textShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ 
          opacity: 1,
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ 
          opacity: { duration: 0.8 },
          y: { duration: 0.5 },
          x: { duration: 0.1, type: "spring", stiffness: 50 },
        }}
        whileHover={{
          y: -5,
          textShadow: "0 0 25px rgba(255, 255, 255, 0.8)",
          transition: { duration: 0.3 }
        }}
      >
        Sunrise
      </motion.h1>
    </div>
  );
}
