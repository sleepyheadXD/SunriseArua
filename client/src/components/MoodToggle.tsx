import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BrainCog, Smile, SunMedium, Moon, CloudFog, CloudRain, Zap } from "lucide-react";

export interface MoodOption {
  id: string;
  name: string;
  icon: React.ElementType;
  particleColor: string;
  musicVolume?: number;
  particleDensity: number;
  particleSpeed: number;
  backgroundFilter: string;
}

interface MoodToggleProps {
  onMoodChange: (mood: MoodOption) => void;
  currentMood: string;
}

export default function MoodToggle({ onMoodChange, currentMood }: MoodToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Define mood options
  const moodOptions: MoodOption[] = [
    {
      id: "calm",
      name: "Calm",
      icon: SunMedium,
      particleColor: "#9DD5FF",
      particleDensity: 30,
      particleSpeed: 0.5,
      backgroundFilter: "brightness(1) contrast(0.9)",
      musicVolume: 0.3
    },
    {
      id: "energetic",
      name: "Energetic",
      icon: Zap,
      particleColor: "#FFEB3B",
      particleDensity: 60,
      particleSpeed: 2,
      backgroundFilter: "brightness(1.05) contrast(1.1) saturate(1.2)",
      musicVolume: 0.7
    },
    {
      id: "dreamy",
      name: "Dreamy",
      icon: CloudFog,
      particleColor: "#E1BFFF",
      particleDensity: 40,
      particleSpeed: 0.3,
      backgroundFilter: "brightness(0.9) contrast(0.9) saturate(0.9) blur(1px)",
      musicVolume: 0.4
    },
    {
      id: "focused",
      name: "Focused",
      icon: BrainCog,
      particleColor: "#64FFDA",
      particleDensity: 15,
      particleSpeed: 0.7,
      backgroundFilter: "brightness(0.95) contrast(1.05) grayscale(0.2)",
      musicVolume: 0.2
    },
    {
      id: "playful",
      name: "Playful",
      icon: Smile,
      particleColor: "#FF9E80",
      particleDensity: 50,
      particleSpeed: 1.5,
      backgroundFilter: "brightness(1.1) contrast(1.1) saturate(1.3)",
      musicVolume: 0.6
    },
    {
      id: "mysterious",
      name: "Mysterious",
      icon: Moon,
      particleColor: "#7986CB",
      particleDensity: 25,
      particleSpeed: 0.4,
      backgroundFilter: "brightness(0.8) contrast(1.2) saturate(0.8) hue-rotate(15deg)",
      musicVolume: 0.5
    },
    {
      id: "rainy",
      name: "Rainy",
      icon: CloudRain,
      particleColor: "#B2EBF2",
      particleDensity: 80,
      particleSpeed: 1.8,
      backgroundFilter: "brightness(0.85) contrast(1) saturate(0.9) blur(0.5px)",
      musicVolume: 0.7
    }
  ];

  // Find the current mood object
  const activeMood = moodOptions.find(mood => mood.id === currentMood) || moodOptions[0];
  const ActiveIcon = activeMood.icon;
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/40 transition-all"
          aria-label="Select mood"
        >
          <ActiveIcon className="h-5 w-5 text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 backdrop-blur-xl bg-black/50 border-slate-800 p-2 rounded-xl">
        <div className="grid grid-cols-2 gap-2">
          {moodOptions.map((mood) => {
            const MoodIcon = mood.icon;
            const isActive = mood.id === currentMood;
            
            return (
              <Button
                key={mood.id}
                variant={isActive ? "default" : "ghost"}
                className={`flex items-center gap-2 h-auto py-2 justify-start ${
                  isActive ? "bg-white/10 text-white" : "hover:bg-white/5"
                }`}
                onClick={() => {
                  onMoodChange(mood);
                  setIsOpen(false);
                }}
              >
                <MoodIcon className="h-4 w-4" />
                <span className="text-sm">{mood.name}</span>
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}