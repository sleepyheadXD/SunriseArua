
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function SunriseAura() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-400 to-pink-600 flex flex-col items-center justify-center">
      <motion.h1 
        className="text-6xl md:text-8xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        SunriseAura
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Link href="/home">
          <a className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all px-10 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 btn-glow">
            Click to Play!
          </a>
        </Link>
      </motion.div>
    </div>
  );
}
