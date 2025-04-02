import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ParticlesProps {
  count?: number;
}

interface Particle {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Particles({ count = 50 }: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Create particles on component mount
    const particleCount = window.innerWidth < 768 ? Math.floor(count / 1.5) : count;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: `${Math.random() * 100}vw`,
        y: `${Math.random() * 100}vh`,
        size: Math.random() * 4 + 2, // 2-6px
        duration: Math.random() * 6 + 3, // 3-9s
        delay: Math.random() * 5, // 0-5s
        opacity: Math.random() * 0.5 + 0.1, // 0.1-0.6
      });
    }
    
    setParticles(newParticles);
  }, [count]);
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/50"
          style={{
            left: particle.x,
            top: particle.y,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -20, 0]
          }}
          transition={{
            y: {
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }
          }}
        />
      ))}
    </div>
  );
}
