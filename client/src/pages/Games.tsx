import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";

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
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Games Section
        </motion.h1>
        
        <motion.p 
          className="text-xl text-purple-100 max-w-lg text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          This page is under construction. Check back soon for exciting games!
        </motion.p>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Placeholder game items */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i}
              className="bg-white/10 p-8 rounded-lg backdrop-blur-sm border border-white/20 text-center"
            >
              <div className="w-16 h-16 bg-purple-300/30 rounded-full mx-auto mb-4 animate-pulse"></div>
              <h3 className="text-xl font-medium text-white mb-2">Coming Soon</h3>
              <p className="text-purple-200">Exciting game experience</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}