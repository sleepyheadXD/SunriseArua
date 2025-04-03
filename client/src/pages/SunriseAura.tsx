
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Sun, Sparkles } from "lucide-react";

export default function SunriseAura() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-pink-600 flex flex-col items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0.1, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [0, 1, 0],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5 + Math.random() * 7,
              delay: Math.random() * 5 
            }}
          />
        ))}
      </div>
      
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="flex items-center justify-center mb-8"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <Sun className="h-16 w-16 text-white mr-4" />
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white tracking-wider"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Sunrise<span className="text-amber-300">Aura</span>
          </motion.h1>
          <Sparkles className="h-16 w-16 text-white ml-4" />
        </motion.div>
        
        <motion.p
          className="text-xl md:text-2xl text-white/80 font-light mb-16 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Experience a new dimension of web entertainment
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href="/home">
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white 
                               px-10 py-5 rounded-full text-xl font-bold shadow-lg 
                               hover:from-amber-600 hover:to-orange-600 
                               transform transition-all duration-300 btn-hover-effect group">
              <span className="flex items-center justify-center">
                <span>Start Your Journey</span>
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >→</motion.span>
              </span>
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
