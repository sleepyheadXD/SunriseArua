import { useState } from "react";
import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings, Sun, Moon } from "lucide-react";

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
    // Light theme
    {
      name: "Light",
      gradientColors: ["#F8FAFC", "#E2E8F0"],
      auraColor: "#93C5FD", // Light blue aura
    },
    // Dark theme
    {
      name: "Dark",
      gradientColors: ["#1E293B", "#0F172A"],
      auraColor: "#6366F1", // Indigo aura
    },
  ];
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 
                    transition-all duration-300 ease-in-out"
        >
          <Settings className="h-5 w-5 text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-64 mr-4 mt-2 bg-black/70 backdrop-blur-md border-white/20 text-white
                   dark:bg-black/70 light-theme:bg-white/70"
        align="end"
      >
        <div className="space-y-4">
          <h3 className="font-medium text-center">Choose a Theme</h3>
          
          {/* Color themes */}
          <div className="grid gap-2">
            {themeOptions.slice(0, 5).map((theme) => (
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
          
          <Separator className="bg-white/20" />
          
          {/* Light/Dark modes */}
          <div className="grid grid-cols-2 gap-2">
            <LightDarkButton 
              icon={Sun}
              label="Light"
              theme={themeOptions[5]}
              onClick={() => {
                onThemeChange(themeOptions[5]);
                setIsOpen(false);
              }}
            />
            <LightDarkButton 
              icon={Moon}
              label="Dark"
              theme={themeOptions[6]}
              onClick={() => {
                onThemeChange(themeOptions[6]);
                setIsOpen(false);
              }}
            />
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

function LightDarkButton({ 
  icon: Icon, 
  label, 
  theme, 
  onClick 
}: { 
  icon: any; 
  label: string; 
  theme: ThemeOption; 
  onClick: () => void; 
}) {
  const gradientStyle = {
    background: `linear-gradient(135deg, ${theme.gradientColors[0]}, ${theme.gradientColors[1]})`,
  };
  
  return (
    <motion.button
      className="flex flex-col items-center justify-center py-3 px-2 rounded-md hover:bg-white/10 transition-colors"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="rounded-full p-2 mb-1" style={gradientStyle}>
        <Icon className="h-5 w-5 text-black/70" />
      </div>
      <span className="text-xs">{label}</span>
    </motion.button>
  );
}