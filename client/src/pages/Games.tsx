import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, Gamepad2, Trophy, Clock, Users, ArrowRight } from "lucide-react";

export default function Games() {
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
          
          {/* Coming Soon Cards */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div 
              key={i}
              className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 flex flex-col"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-purple-300/30 rounded-full flex items-center justify-center mb-4">
                <Gamepad2 className="text-purple-200 h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Coming Soon</h3>
              <p className="text-purple-200 text-sm mb-auto">New exciting game experience</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center">
                <div className="bg-purple-800/40 text-purple-200 text-xs px-3 py-1 rounded-full">
                  In Development
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}