import { useEffect, useState, useRef } from "react";
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
  const cursorRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<CursorParticle[]>([]);
  const [isActive, setIsActive] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const lastEmitTime = useRef(0);
  const throttleAmount = 50; // Only emit particles every 50ms

  // Track mouse position with optimized performance
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Direct DOM manipulation for cursor position (more responsive)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0)`;
        cursorRef.current.style.opacity = "1";
      }
      
      mousePosition.current = { x: e.clientX, y: e.clientY };
      setIsActive(true);
      
      // Throttle particle creation for better performance
      const now = Date.now();
      if (now - lastEmitTime.current > throttleAmount) {
        // Add new particle on mouse move (throttled)
        const newParticle: CursorParticle = {
          id: now,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 7 + 3, // 3-10px (slightly smaller for performance)
          opacity: Math.random() * 0.5 + 0.5, // 0.5-1
          color: getRandomColor(),
        };
        
        setParticles(prev => [...prev, newParticle]);
        lastEmitTime.current = now;
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      setIsActive(true);
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
    };
    
    // Clean up particles for performance (keep fewer particles)
    const cleanupInterval = setInterval(() => {
      setParticles(prev => prev.length > 15 ? prev.slice(-15) : prev); // Keep only 15 most recent particles
    }, 100);
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(cleanupInterval);
    };
  }, []);
  
  // Get a random color from current theme
  const getRandomColor = () => {
    // Use CSS variables to get current theme colors
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary') || '#FF7A00';
    const secondary = getComputedStyle(document.documentElement).getPropertyValue('--theme-secondary') || '#FFDE59';
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--theme-accent') || '#FFEB3B';
    
    const colors = [
      primary,
      secondary,
      accent,
      // Create some variations with opacity
      primary + "CC", // 80% opacity
      secondary + "CC", // 80% opacity
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  return (
    <>
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full will-change-transform"
              style={{
                left: 0,
                top: 0,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                backfaceVisibility: "hidden", // Performance optimization
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
              transition={{ duration: 0.5, ease: "easeOut" }} // Shorter duration for better performance
            />
          ))}
        </AnimatePresence>
        
        {/* Custom cursor using direct DOM manipulation (more responsive) */}
        <div
          ref={cursorRef}
          className="w-4 h-4 rounded-full bg-white mix-blend-difference fixed pointer-events-none will-change-transform"
          style={{ 
            opacity: isActive ? 1 : 0,
            transform: `translate3d(0px, 0px, 0)`,
            backfaceVisibility: "hidden", // Performance optimization
          }}
        />
      </div>
    </>
  );
}