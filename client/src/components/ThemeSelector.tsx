import { useState } from "react";
import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface ThemeOption {
  name: string;
  gradientColors: string[];
  auraColor: string;
}

interface ThemeSelectorProps {
  onThemeChange: (theme: ThemeOption) => void;
}

export default function ThemeSelector({ onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const themeOptions: ThemeOption[] = [
    // Default orange-yellow theme
    {
      name: "Sunrise",
      gradientColors: ["#FF7A00", "#FFDE59"],
      auraColor: "#FFEB3B",
    },
    // Purple-pink theme
    {
      name: "Sunset",
      gradientColors: ["#8B5CF6", "#EC4899"],
      auraColor: "#D946EF",
    },
    // Blue-green theme
    {
      name: "Ocean",
      gradientColors: ["#0EA5E9", "#10B981"],
      auraColor: "#06B6D4",
    },
    // Red-orange theme
    {
      name: "Flame",
      gradientColors: ["#EF4444", "#F97316"],
      auraColor: "#F43F5E",
    },
    // Green-yellow theme
    {
      name: "Forest",
      gradientColors: ["#22C55E", "#A3E635"],
      auraColor: "#84CC16",
    },
  ];
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
        >
          <Settings className="h-5 w-5 text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-64 mr-4 mt-2 bg-black/70 backdrop-blur-md border-white/20 text-white"
        align="end"
      >
        <div className="space-y-3">
          <h3 className="font-medium text-center">Choose a Theme</h3>
          <div className="grid gap-2">
            {themeOptions.map((theme) => (
              <ThemeButton 
                key={theme.name}
                theme={theme}
                onClick={() => {
                  onThemeChange(theme);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ThemeButton({ theme, onClick }: { theme: ThemeOption; onClick: () => void }) {
  const gradientStyle = {
    background: `linear-gradient(135deg, ${theme.gradientColors[0]}, ${theme.gradientColors[1]})`,
  };
  
  return (
    <motion.button
      className="flex items-center w-full rounded-md p-2 hover:bg-white/10 transition-colors"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-8 h-8 rounded-full mr-3" style={gradientStyle} />
      <span className="text-sm">{theme.name}</span>
    </motion.button>
  );
}