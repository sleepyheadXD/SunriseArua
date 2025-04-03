import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ParticlesProps {
  count?: number;
  color?: string;
  speed?: number;
  amplitude?: number;
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

export default function Particles({ 
  count = 50, 
  color = "#FFFFFF", 
  speed = 1,
  amplitude = 20
}: ParticlesProps) {
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
        duration: (Math.random() * 6 + 3) / speed, // Adjust duration inversely with speed
        delay: Math.random() * 5, // 0-5s
        opacity: Math.random() * 0.5 + 0.1, // 0.1-0.6
      });
    }
    
    setParticles(newParticles);
  }, [count, speed]);
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            backgroundColor: color,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`,
            transition: "background-color 0.5s, box-shadow 0.5s",
          }}
          animate={{
            y: [0, -amplitude * speed, 0], // Amplitude affected by speed
            x: [0, Math.random() * 10 * speed - 5 * speed, 0] // Add slight horizontal movement
          }}
          transition={{
            y: {
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            },
            x: {
              duration: particle.duration * 1.3, // Make horizontal movement slower
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
