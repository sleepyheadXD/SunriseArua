import { motion } from "framer-motion";
import { Sunrise } from "lucide-react";

export default function SunriseLogo() {
  return (
    <motion.div 
      className="w-full flex flex-col items-center justify-center mt-6 mb-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      }}
    >
      <motion.div
        className="rounded-full p-6 bg-gradient-to-br from-amber-300/20 to-orange-500/20 backdrop-blur-sm
                  border border-amber-200/30 relative"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        <Sunrise className="w-12 h-12 text-amber-200" />
        
        {/* Outer glow effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-70 blur-xl -z-10"
          style={{
            background: "radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(251, 191, 36, 0) 70%)"
          }}
        ></div>
        
        {/* Inner glow effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-70 blur-md -z-10"
          style={{
            background: "radial-gradient(circle, rgba(252, 211, 77, 0.6) 0%, rgba(251, 191, 36, 0) 70%)"
          }}
        ></div>
      </motion.div>
    </motion.div>
  );
}