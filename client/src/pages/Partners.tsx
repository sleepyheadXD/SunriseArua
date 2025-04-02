import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, Users } from "lucide-react";

export default function Partners() {
  // Sample partner data
  const partners = [
    { id: 1, name: "Future Partner 1", role: "Coming Soon" },
    { id: 2, name: "Future Partner 2", role: "Coming Soon" },
    { id: 3, name: "Future Partner 3", role: "Coming Soon" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-emerald-600 p-6 flex flex-col">
      {/* Back button */}
      <motion.div 
        className="self-start"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/">
          <a className="flex items-center text-white hover:text-emerald-200 transition-colors">
            <ChevronLeft className="mr-1" />
            <span>Back to Home</span>
          </a>
        </Link>
      </motion.div>
      
      <div className="flex-1 flex flex-col items-center justify-center py-12">
        <motion.div 
          className="flex items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Users className="w-10 h-10 text-emerald-300 mr-4" />
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">Our Partners</h1>
        </motion.div>
        
        <motion.p 
          className="text-xl text-emerald-100 max-w-lg text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          This section is under development. We're working on establishing partnerships.
        </motion.p>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 flex flex-col items-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-emerald-300" />
              </div>
              <h3 className="text-xl font-medium text-white mb-1">{partner.name}</h3>
              <p className="text-emerald-200 text-sm">{partner.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}