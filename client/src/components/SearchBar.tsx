import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Function to select search engine from search_engine.js
declare global {
  interface Window {
    selectSearchEngine: (value: string) => void;
  }
}

type SearchEngine = {
  name: string;
  url: string;
  icon: string;
};

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState<SearchEngine>({
    name: "Google",
    url: "https://www.google.com/search?q=",
    icon: "🔍"
  });

  const searchEngines: SearchEngine[] = [
    {
      name: "Google",
      url: "https://www.google.com/search?q=",
      icon: "🔍"
    },
    {
      name: "Bing",
      url: "https://www.bing.com/search?q=",
      icon: "🔎"
    },
    {
      name: "DuckDuckGo",
      url: "https://duckduckgo.com/?q=",
      icon: "🦆"
    },
    {
      name: "Yahoo",
      url: "https://search.yahoo.com/search?p=",
      icon: "🔎"
    }
  ];

  useEffect(() => {
    // Load saved search engine preference
    const savedEngine = localStorage.getItem('searchEngine');
    if (savedEngine) {
      const engine = searchEngines.find(e => e.name === savedEngine);
      if (engine) {
        setSelectedEngine(engine);
      }
    }
  }, []);

  const handleEngineSelect = (engine: SearchEngine) => {
    setSelectedEngine(engine);
    // Use the function from search_engine.js
    if (window.selectSearchEngine) {
      window.selectSearchEngine(engine.name);
    } else {
      // Fallback if function isn't available
      localStorage.setItem('searchEngine', engine.name);
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    const encodedQuery = encodeURIComponent(searchQuery);
    window.open(`${selectedEngine.url}${encodedQuery}`, "_blank");
    
    setTimeout(() => {
      setIsLoading(false);
      setSearchQuery("");
    }, 500);
  };
  
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mt-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="relative backdrop-blur-md bg-white/10 rounded-full border border-white/20 overflow-hidden shadow-xl">
        {/* Glow effect */}
        <div 
          className="absolute inset-0 -z-10 opacity-30 blur-xl"
          style={{
            background: "radial-gradient(circle at center, var(--theme-accent), transparent 70%)",
          }}
        />
        
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-10 px-2 ml-1 text-white focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center gap-1"
                >
                  <span className="text-lg">{selectedEngine.icon}</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-black/80 backdrop-blur-md border-white/20">
                {searchEngines.map((engine) => (
                  <DropdownMenuItem
                    key={engine.name}
                    onClick={() => handleEngineSelect(engine)}
                    className="flex items-center gap-2 text-white cursor-pointer hover:bg-white/10"
                  >
                    <span className="text-lg">{engine.icon}</span>
                    <span>{engine.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex-grow flex items-center pl-1 py-1">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search now"
              className="bg-transparent border-none text-white placeholder:text-white/50 
                        focus-visible:ring-0 focus-visible:ring-offset-0 text-base py-6"
              style={{ caretColor: "white" }}
            />
          </div>
          
          <Button 
            type="submit"
            disabled={isLoading}
            className="rounded-full h-12 px-5 mr-1 my-1 bg-white/20 hover:bg-white/30 
                     text-white border-none flex items-center justify-center transition-all
                     focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {isLoading ? (
              <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}