import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Cloud, Sunset, Moon, Coffee, Book, Watch, Star } from "lucide-react";

interface DynamicWelcomeProps {
  className?: string;
}

type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export default function DynamicWelcome({ className = "" }: DynamicWelcomeProps) {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [timeMessage, setTimeMessage] = useState("");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("morning");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Function to determine the time of day
    const getTimeOfDay = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 5 && hour < 12) {
        setTimeOfDay("morning");
        setWelcomeMessage("Good morning");
        setTimeMessage("Start your day with positive energy!");
      } else if (hour >= 12 && hour < 17) {
        setTimeOfDay("afternoon");
        setWelcomeMessage("Good afternoon");
        setTimeMessage("Hope your day is going well!");
      } else if (hour >= 17 && hour < 22) {
        setTimeOfDay("evening");
        setWelcomeMessage("Good evening");
        setTimeMessage("Time to relax and unwind...");
      } else {
        setTimeOfDay("night");
        setWelcomeMessage("Good night");
        setTimeMessage("Looking for some late-night entertainment?");
      }

      // Try to get user's name from localStorage if they've set it before
      const savedName = localStorage.getItem('userName');
      if (savedName) {
        setUserName(savedName);
      }
    };

    // Set initial message
    getTimeOfDay();

    // Update message every minute
    const intervalId = setInterval(getTimeOfDay, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Icons for each time of day
  const TimeIcon = () => {
    switch(timeOfDay) {
      case "morning":
        return <Sun className="w-5 h-5 text-amber-300" />;
      case "afternoon":
        return <Cloud className="w-5 h-5 text-yellow-300" />;
      case "evening":
        return <Sunset className="w-5 h-5 text-orange-300" />;
      case "night":
        return <Moon className="w-5 h-5 text-blue-300" />;
    }
  };

  // Icons for activity suggestion based on time of day
  const ActivityIcon = () => {
    switch(timeOfDay) {
      case "morning":
        return <Coffee className="w-4 h-4 text-amber-200" />;
      case "afternoon":
        return <Book className="w-4 h-4 text-yellow-200" />;
      case "evening":
        return <Watch className="w-4 h-4 text-orange-200" />;
      case "night":
        return <Star className="w-4 h-4 text-blue-200" />;
    }
  };

  // Define text colors for each time of day
  const textColors = {
    morning: "text-amber-300",
    afternoon: "text-yellow-300",
    evening: "text-orange-300",
    night: "text-blue-300"
  };

  // Define gradients for background pill
  const bgGradients = {
    morning: "from-amber-500/10 to-amber-600/10",
    afternoon: "from-yellow-500/10 to-yellow-600/10",
    evening: "from-orange-500/10 to-orange-600/10",
    night: "from-blue-500/10 to-blue-600/10"
  };

  return (
    <motion.div
      className={`rounded-xl py-3 px-6 backdrop-blur-md bg-gradient-to-r ${bgGradients[timeOfDay]} 
                 border border-white/20 shadow-lg ${className} hover:shadow-xl transition-all duration-300`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
      }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <TimeIcon />
        </motion.div>
        <span className={`font-medium text-lg ${textColors[timeOfDay]}`}>
          {welcomeMessage}{userName ? `, ${userName}` : ''}!
        </span>
      </div>

      <div className="flex items-center gap-3 text-sm text-white/90 mt-2 border-t border-white/10 pt-2">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ActivityIcon />
        </motion.div>
        <span>{timeMessage}</span>
      </div>
    </motion.div>
  );
}