import { useEffect, useState } from "react";
import GradientBackground from "@/components/GradientBackground";
import WelcomeTitle from "@/components/WelcomeTitle";
import Particles from "@/components/Particles";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    // Update scroll progress state when scrolling
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / (scrollHeight || 1); // Avoid division by zero
      setScrollProgress(Math.min(progress, 1));
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Create an artificially tall page to enable scrolling
    document.body.style.height = "300vh";
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.height = "";
    };
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <GradientBackground />
      <Particles count={50} />
      
      <div className="container mx-auto px-6 min-h-screen flex flex-col items-center justify-center relative z-10">
        <WelcomeTitle scrollProgress={scrollProgress} />
        
        <h2 className="text-xl md:text-2xl font-light text-white opacity-90 mt-4">
          Unblocking for fun
        </h2>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
