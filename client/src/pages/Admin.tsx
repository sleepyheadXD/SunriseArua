
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";

export default function Admin() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-8"
        >
          <Link href="/home">
            <a className="flex items-center text-amber-400 hover:text-amber-300 transition-colors">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Home
            </a>
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold mb-8 text-amber-400"
        >
          Admin Dashboard
        </motion.h1>

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
      </div>
    </div>
  );
}
