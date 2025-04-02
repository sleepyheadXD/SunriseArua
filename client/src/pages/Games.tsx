import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, Gamepad2, Trophy, Clock, Users, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

// Define the Game interface
interface Game {
  name: string;
  root: string;
  file: string;
  img: string;
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/data/games.json');
        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }
        const data = await response.json();
        setGames(data);
      } catch (err) {
        console.error('Error loading games:', err);
        setError('Failed to load games. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-600 p-6 flex flex-col">
      {/* Back button */}
      <motion.div 
        className="self-start"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/">
          <a className="flex items-center text-white hover:text-purple-200 transition-colors">
            <ChevronLeft className="mr-1" />
            <span>Back to Home</span>
          </a>
        </Link>
      </motion.div>
      
      <div className="flex-1 flex flex-col items-center pt-8">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Game Collection
        </motion.h1>
        
        <motion.p 
          className="text-xl text-purple-100 max-w-lg text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Explore our collection of retro and classic games. More games will be added soon!
        </motion.p>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Retro Bowl Featured Game Card */}
          <motion.div 
            className="col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-amber-600 to-amber-900 rounded-xl overflow-hidden shadow-xl border border-amber-500/30 relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <div className="p-6 relative z-20 h-full flex flex-col">
              <div className="bg-amber-500 text-amber-950 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                FEATURED
              </div>
              
              <div className="flex flex-row items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Retro Bowl</h2>
                  <p className="text-amber-200 max-w-md">
                    A vintage American football game where you manage your team to glory. Experience the thrill of strategic play-calling and team management.
                  </p>
                </div>
                <div className="hidden md:flex bg-amber-700/50 p-3 rounded-full">
                  <Gamepad2 size={40} className="text-amber-200" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-auto">
                <div className="bg-black/30 p-3 rounded-lg flex items-center">
                  <Trophy className="text-amber-300 mr-2 h-5 w-5" />
                  <span className="text-white text-sm">Win Championships</span>
                </div>
                <div className="bg-black/30 p-3 rounded-lg flex items-center">
                  <Users className="text-amber-300 mr-2 h-5 w-5" />
                  <span className="text-white text-sm">Manage Team</span>
                </div>
                <div className="bg-black/30 p-3 rounded-lg flex items-center">
                  <Clock className="text-amber-300 mr-2 h-5 w-5" />
                  <span className="text-white text-sm">Quick Games</span>
                </div>
              </div>
              
              <Link href="/games/retro-bowl">
                <a className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center group transition-all duration-200">
                  Play Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Link>
            </div>
          </motion.div>
          
          {/* Loading State */}
          {loading && (
            <div className="col-span-3 flex flex-col items-center justify-center py-12">
              <Loader2 className="h-10 w-10 text-white/60 animate-spin mb-4" />
              <p className="text-white/80">Loading games...</p>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="col-span-3 flex flex-col items-center justify-center py-12">
              <p className="text-red-300 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
          
          {/* Game Cards from API */}
          {!loading && !error && games.map((game, index) => (
            <motion.div 
              key={game.root}
              className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 flex flex-col"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.1 * (index % 10),
                type: "spring",
                stiffness: 100
              }}
            >
              <div className="w-12 h-12 bg-purple-300/30 rounded-full flex items-center justify-center mb-4">
                <Gamepad2 className="text-purple-200 h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">{game.name}</h3>
              <p className="text-purple-200 text-sm mb-auto">Play this classic game</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="bg-purple-800/40 text-purple-200 text-xs px-3 py-1 rounded-full">
                  Available
                </div>
                <Link href={`/games/${game.root}`}>
                  <a className="text-purple-100 hover:text-white text-sm font-medium flex items-center">
                    Play Now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}