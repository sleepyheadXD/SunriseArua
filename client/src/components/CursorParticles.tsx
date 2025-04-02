import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CursorParticlesProps {
  particleColor?: string;
  particleSpeed?: number;
  particleDensity?: number;
}

interface CursorParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

export default function CursorParticles({
  particleColor = "#FFEB3B",
  particleSpeed = 1,
  particleDensity = 30
}: CursorParticlesProps) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<CursorParticle[]>([]);
  const particleIdRef = useRef(0);
  const frameIdRef = useRef<number | null>(null);
  const lastEmitTime = useRef(0);
  const isFirstRender = useRef(true);
  
  // Rate limiting for particle creation
  const emitRate = Math.max(20, 50 - particleDensity / 2); // ms between particles
  
  // Effect for mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create particles based on emission rate and density
      const now = Date.now();
      if (now - lastEmitTime.current > emitRate) {
        lastEmitTime.current = now;
        createParticle(e.clientX, e.clientY);
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        
        // Create particles based on emission rate and density
        const now = Date.now();
        if (now - lastEmitTime.current > emitRate) {
          lastEmitTime.current = now;
          createParticle(e.touches[0].clientX, e.touches[0].clientY);
        }
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [particleDensity]);
  
  // Update particles on animation frame
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    const updateParticles = () => {
      setParticles(prevParticles => {
        // Remove particles that have faded out
        const now = Date.now();
        const decayFactor = 0.94 - particleSpeed * 0.02; // Faster speed, faster decay
        
        const updatedParticles = prevParticles
          .filter(p => p.opacity > 0.01)
          .map(p => ({
            ...p,
            opacity: p.opacity * decayFactor,
            size: p.size * 0.98, // Gradually reduce size
          }));
          
        return updatedParticles;
      });
      
      frameIdRef.current = requestAnimationFrame(updateParticles);
    };
    
    frameIdRef.current = requestAnimationFrame(updateParticles);
    
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [particleSpeed]);
  
  // Function to create particles
  const createParticle = (x: number, y: number) => {
    const id = particleIdRef.current++;
    const size = Math.random() * 8 + 4; // Size between 4-12
    const opacity = Math.random() * 0.3 + 0.7; // Opacity between 0.7-1
    
    setParticles(prevParticles => {
      // Limit max number of particles based on density
      const maxParticles = particleDensity;
      const newParticles = [...prevParticles];
      
      if (newParticles.length >= maxParticles) {
        newParticles.shift(); // Remove oldest particle
      }
      
      const newParticle: CursorParticle = {
        id,
        x,
        y,
        size,
        opacity,
        color: particleColor
      };
      
      return [...newParticles, newParticle];
    });
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full will-change-transform will-change-opacity"
            style={{
              x: particle.x,
              y: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: `translate(-50%, -50%)`, // Center the particle on cursor
              boxShadow: `0 0 ${particle.size * 1.5}px ${particle.color}`,
            }}
            transition={{ duration: 0.1 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}