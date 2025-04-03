import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function RegionClock() {
  const [time, setTime] = useState(new Date());
  const [region, setRegion] = useState("Local Time");
  
  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    // Try to determine user's region
    try {
      // Get the time zone using Intl
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone) {
        // Convert something like "America/New_York" to "America/New York"
        const readableRegion = timeZone.replace(/_/g, " ");
        // Get just the region name, e.g. "New York" from "America/New York"
        const regionName = readableRegion.split("/").pop();
        
        if (regionName) {
          setRegion(regionName);
        }
      }
    } catch (error) {
      console.error("Could not determine region:", error);
    }
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Format time as HH:MM:SS
  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  
  return (
    <div className="fixed bottom-4 left-4 z-30 
                    flex items-center gap-2 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-lg 
                    px-4 py-3 rounded-full text-white text-lg border border-white/20
                    shadow-lg shadow-amber-500/30 clock-center transition-all hover:scale-105 hover:shadow-amber-500/50">
      <Clock className="h-5 w-5 text-amber-400 animate-pulse-slow" />
      <span className="font-medium tracking-wide">{formattedTime}</span>
      <span className="hidden sm:inline-block text-white/70 ml-1 text-sm">({region})</span>
    </div>
  );
}