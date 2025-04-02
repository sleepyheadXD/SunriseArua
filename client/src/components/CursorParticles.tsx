import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CursorParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

export default function CursorParticles() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<CursorParticle[]>([]);
  const [isActive, setIsActive] = useState(false);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsActive(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add new particle on mouse move
      const newParticle: CursorParticle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4, // 4-12px
        opacity: Math.random() * 0.5 + 0.5, // 0.5-1
        color: getRandomColor(),
      };
      
      setParticles(prev => [...prev, newParticle]);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    const handleMouseEnter = () => {
      setIsActive(true);
    };
    
    // Clean up particles after a certain time
    const cleanupInterval = setInterval(() => {
      setParticles(prev => prev.slice(-25)); // Keep only the 25 most recent particles
    }, 100);
    
    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(cleanupInterval);
    };
  }, []);
  
  // Get a random color in the yellow/orange spectrum
  const getRandomColor = () => {
    const colors = [
      "#FFDE59", // Yellow
      "#FFC107", // Amber
      "#FF9800", // Orange
      "#FF7A00", // Deep Orange
      "#FFEB3B", // Light Yellow
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Custom cursor
  const cursorVariants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      opacity: isActive ? 1 : 0,
    },
  };
  
  return (
    <>
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: 0,
                top: 0,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
              }}
              initial={{ 
                x: particle.x,
                y: particle.y,
                scale: 1,
                opacity: particle.opacity,
              }}
              animate={{ 
                x: particle.x,
                y: particle.y,
                scale: 0,
                opacity: 0,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
        
        {/* Custom cursor */}
        <motion.div
          className="w-4 h-4 rounded-full bg-white mix-blend-difference fixed pointer-events-none"
          variants={cursorVariants}
          animate="default"
        />
      </div>
    </>
  );
}