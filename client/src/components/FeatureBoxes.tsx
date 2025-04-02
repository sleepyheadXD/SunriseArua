import { motion } from "framer-motion";
import { Gamepad2, Globe, Users } from "lucide-react";
import { useState } from "react";

export default function FeatureBoxes() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const features = [
    {
      name: "Games",
      icon: Gamepad2,
      description: "Play the latest unblocked games",
      color: "from-purple-500 to-indigo-500",
      iconColor: "text-indigo-200",
    },
    {
      name: "Proxy",
      icon: Globe,
      description: "Browse websites anonymously",
      color: "from-blue-500 to-cyan-500",
      iconColor: "text-cyan-200",
    },
    {
      name: "Partners",
      icon: Users,
      description: "Connect with our collaborators",
      color: "from-green-500 to-emerald-500",
      iconColor: "text-emerald-200",
    },
  ];

  // Handle feature click
  const handleFeatureClick = (featureName: string) => {
    if (featureName === "Proxy") {
      setActiveTab(activeTab === "Proxy" ? null : "Proxy");
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 md:flex-row md:gap-6 max-w-4xl mx-auto justify-center items-center mt-14 mb-10 px-4">
      {features.map((feature, index) => (
        <motion.div
          key={feature.name}
          className={`relative w-full md:w-1/3 ${feature.name === "Proxy" && activeTab === "Proxy" ? "min-h-[280px]" : "min-h-[220px]"} 
                     rounded-xl overflow-hidden cursor-pointer backdrop-blur-sm border border-white/20 
                     bg-black/30 group ${feature.name === "Proxy" && activeTab === "Proxy" ? "md:w-[45%]" : "md:w-1/3"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: index * 0.2, duration: 0.5 },
          }}
          whileHover={{ 
            scale: feature.name === "Proxy" && activeTab === "Proxy" ? 1 : 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: feature.name === "Proxy" && activeTab === "Proxy" ? 1 : 0.98 }}
          onClick={() => handleFeatureClick(feature.name)}
        >
          {/* Gradient background */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${feature.color} 
                       ${feature.name === "Proxy" && activeTab === "Proxy" ? "opacity-20" : "opacity-0 group-hover:opacity-30"} 
                       transition-opacity duration-500 ease-in-out z-0`}
          ></div>
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
            {/* Icon with circle background */}
            <div className="rounded-full p-4 bg-white/10 mb-4 relative">
              <feature.icon 
                className={`w-10 h-10 ${feature.name === "Proxy" && activeTab === "Proxy" ? "text-white" : feature.iconColor} 
                           group-hover:text-white transition-colors duration-300`} 
              />
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-full ${feature.name === "Proxy" && activeTab === "Proxy" ? "opacity-100" : "opacity-0 group-hover:opacity-100"} 
                             transition-opacity duration-500 blur-md -z-10`}
                   style={{background: `radial-gradient(circle, ${feature.iconColor}, transparent 70%)`}}></div>
            </div>
            
            {/* Text content */}
            <h3 className={`text-xl font-bold text-white mb-2 ${feature.name === "Proxy" && activeTab === "Proxy" ? "scale-110" : "group-hover:scale-110"} transition-transform duration-300`}>
              {feature.name}
            </h3>
            <p className={`text-white/70 text-sm ${feature.name === "Proxy" && activeTab === "Proxy" ? "text-white/90" : "group-hover:text-white/90"} transition-colors duration-300`}>
              {feature.description}
            </p>
            
            {/* Proxy interactive content */}
            {feature.name === "Proxy" && activeTab === "Proxy" && (
              <p className="mt-4 text-white/90 text-sm font-semibold">Click to explore the web anonymously</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}