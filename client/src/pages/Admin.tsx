
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";

export default function Admin() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-8"
        >
          <Link href="/home">
            <button className="flex items-center gap-2 bg-black/30 hover:bg-black/50 text-amber-400 hover:text-amber-300 transition-all duration-300 px-4 py-2 rounded-full border border-amber-900/30">
              <ChevronLeft className="h-5 w-5" />
              <span>Return to Home</span>
            </button>
          </Link>
        </motion.div>

        <motion.div
          className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center border-b border-white/10 pb-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-amber-500 h-10 w-10 rounded-lg flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Admin Dashboard
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-amber-500/20">
              <h2 className="text-xl font-semibold mb-4 text-amber-400">Game Management</h2>
              <p className="text-gray-300 mb-4">Add, edit, or remove games from the platform.</p>
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-md hover:from-amber-600 hover:to-orange-600 transition-all">
                Manage Games
              </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-amber-500/20">
              <h2 className="text-xl font-semibold mb-4 text-amber-400">User Stats</h2>
              <p className="text-gray-300 mb-4">View user statistics and gameplay analytics.</p>
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-md hover:from-amber-600 hover:to-orange-600 transition-all">
                View Stats
              </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-amber-500/20">
              <h2 className="text-xl font-semibold mb-4 text-amber-400">Partner Management</h2>
              <p className="text-gray-300 mb-4">Manage platform partnerships and integrations.</p>
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-md hover:from-amber-600 hover:to-orange-600 transition-all">
                Manage Partners
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
