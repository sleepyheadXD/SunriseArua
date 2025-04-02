import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, Maximize, Minimize, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RetroGame() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const gameFrame = document.getElementById('gameFrame');
      if (gameFrame) {
        gameFrame.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
        setIsFullscreen(true);
      }
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Reload the iframe
  const reloadGame = () => {
    const gameFrame = document.getElementById('gameFrame') as HTMLIFrameElement;
    if (gameFrame) {
      gameFrame.src = gameFrame.src;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 to-orange-600 p-6 flex flex-col">
      {/* Header with controls */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/games">
            <a className="flex items-center text-white hover:text-orange-200 transition-colors mb-4 md:mb-0">
              <ChevronLeft className="mr-1" />
              <span>Back to Games</span>
            </a>
          </Link>
        </motion.div>
        
        <motion.div 
          className="flex space-x-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button 
            variant="outline" 
            size="sm" 
            onClick={reloadGame}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reload
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleFullscreen}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4 mr-2" />
            ) : (
              <Maximize className="h-4 w-4 mr-2" />
            )}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </motion.div>
      </div>
      
      {/* Game Instructions */}
      <motion.div
        className="bg-black/20 rounded-lg p-4 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h2 className="font-bold text-white mb-2">How to Play Retro Bowl:</h2>
        <ul className="text-white/90 list-disc pl-5 text-sm">
          <li>Use arrow keys to move your player</li>
          <li>Swipe or click and drag to throw the ball</li>
          <li>Tap to dodge when running with the ball</li>
          <li>Manage your team between games to improve performance</li>
        </ul>
      </motion.div>
      
      {/* Game Container */}
      <motion.div 
        className="relative flex-1 bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <iframe 
          id="gameFrame"
          src="/games/retro-bowl/retro-bowl-main/index.html" 
          className="w-full h-full"
          allow="fullscreen"
          allowFullScreen
        ></iframe>
      </motion.div>
    </div>
  );
}