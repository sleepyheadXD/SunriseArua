import { useEffect, useState } from "react";
import GradientBackground from "@/components/GradientBackground";
import WelcomeTitle from "@/components/WelcomeTitle";
import Particles from "@/components/Particles";
import ThemeSelector from "@/components/ThemeSelector";
import FeatureBoxes from "@/components/FeatureBoxes";

interface ThemeOption {
  name: string;
  gradientColors: string[];
  auraColor: string;
}

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>({
    name: "Sunrise",
    gradientColors: ["#FF7A00", "#FFDE59"],
    auraColor: "#FFEB3B",
  });
  
  useEffect(() => {
    // Update scroll progress state when scrolling
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / (scrollHeight || 1); // Avoid division by zero
      setScrollProgress(Math.min(progress, 1));
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Create an artificially tall page to enable scrolling
    document.body.style.height = "300vh";
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.height = "";
    };
  }, []);
  
  const handleThemeChange = (theme: ThemeOption) => {
    setCurrentTheme(theme);
    // Update cursor particle colors as well
    document.documentElement.style.setProperty('--theme-primary', theme.gradientColors[0]);
    document.documentElement.style.setProperty('--theme-secondary', theme.gradientColors[1]);
    document.documentElement.style.setProperty('--theme-accent', theme.auraColor);
    
    // Set text color class for Light theme
    if (theme.name === "Light") {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <GradientBackground colors={currentTheme.gradientColors} />
      <Particles count={50} />
      <ThemeSelector onThemeChange={handleThemeChange} />
      
      <div className="container mx-auto px-6 flex flex-col items-center relative z-10">
        {/* Hero section */}
        <div className="min-h-screen flex flex-col items-center justify-center">
          <WelcomeTitle 
            scrollProgress={scrollProgress} 
            auraColor={currentTheme.auraColor}
            title={currentTheme.name === "Sunrise" ? "Sunrise" : currentTheme.name}
          />
          
          <h2 className="text-xl md:text-2xl font-light text-white opacity-90 mt-4 text-center">
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
        
        {/* Feature boxes */}
        <FeatureBoxes />
        
        {/* Footer space */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
