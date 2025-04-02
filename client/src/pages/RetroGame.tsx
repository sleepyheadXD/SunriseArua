import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ChevronLeft, Maximize, Minimize, RefreshCw } from "lucide-react";
import { games } from "../data/games";
import { Game } from "../data/types";

export default function RetroGame() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [, params] = useRoute("/games/:gameId");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    // Find the game from the URL parameter
    if (params && params.gameId) {
      // Special case for retro-bowl
      if (params.gameId === "retro-bowl") {
        setCurrentGame({
          name: "Retro Bowl",
          root: "retro-bowl",
          file: "retro-bowl-main/index.html",
          img: "retro-bowl-main/img/icon.jpg"
        });
      } 
      // Special case for basketball-stars
      else if (params.gameId === "basketball-stars") {
        setCurrentGame({
          name: "Basketball Stars",
          root: "basketball-stars",
          file: "index.html",
          img: "assets/images/basketball-icon.svg"
        });
      } 
      else {
        // Find the game in our games list
        const foundGame = games.find(game => game.root === params.gameId);
        if (foundGame) {
          setCurrentGame(foundGame);
        }
      }
    }
    
    setLoading(false);
  }, [params]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const reloadGame = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-white border-opacity-50 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!currentGame) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Game Not Found</h1>
        <p className="text-gray-300 mb-8">The game you're looking for doesn't exist or has been removed.</p>
        <Link href="/games">
          <div className="text-purple-400 hover:text-purple-300 transition-colors flex items-center cursor-pointer">
            <ChevronLeft className="mr-1" />
            <span>Back to Games</span>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className={`bg-gray-900 flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'}`}>
      {/* Top controls bar */}
      <motion.div 
        className={`flex justify-between items-center p-4 ${isFullscreen ? 'bg-gray-900/80 backdrop-blur absolute top-0 left-0 right-0 z-10 opacity-0 hover:opacity-100 transition-opacity' : 'bg-gray-800'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/games">
          <div className="flex items-center text-white hover:text-purple-300 transition-colors cursor-pointer">
            <ChevronLeft className="mr-1" />
            <span className="font-medium">Back to Games</span>
          </div>
        </Link>
        
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold text-white">{currentGame.name}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={reloadGame}
            className="text-gray-400 hover:text-white transition-colors focus:outline-none"
            aria-label="Reload game"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          
          <button 
            onClick={toggleFullscreen}
            className="text-gray-400 hover:text-white transition-colors focus:outline-none"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>
      
      {/* Game iframe */}
      <motion.div 
        className="flex-1 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <iframe
          ref={iframeRef}
          src={`/games/${currentGame.root}/${currentGame.file}`}
          className="w-full h-full absolute top-0 left-0 border-0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={currentGame.name}
        ></iframe>
      </motion.div>
    </div>
  );
}