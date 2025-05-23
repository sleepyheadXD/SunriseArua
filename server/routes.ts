import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Game API routes
  app.get('/api/games', (req, res) => {
    // Example API endpoint for games listing
    const games = [
      {
        id: 'retro-bowl',
        name: 'Retro Bowl',
        description: 'A vintage American football game',
        featured: true,
        path: '/games/retro-bowl'
      },
      {
        id: 'basketball-stars',
        name: 'Basketball Stars',
        description: 'The ultimate basketball game experience',
        featured: true,
        path: '/games/basketball-stars'
      },
      // More games can be added here in the future
    ];
    
    res.json({ games });
  });

  // Serve game assets
  const gamesDir = path.join(process.cwd(), 'public', 'games');
  
  // Check if the games directory exists
  if (fs.existsSync(gamesDir)) {
    console.log('Games directory found at:', gamesDir);
    
    // Create specific route for retro-bowl assets
    const retroBowlDir = path.join(gamesDir, 'retro-bowl', 'retro-bowl-main');
    if (fs.existsSync(retroBowlDir)) {
      console.log('Retro Bowl directory found at:', retroBowlDir);
      
      // Serve retro-bowl assets specifically (for more control)
      app.get('/games/retro-bowl/retro-bowl-main/*', (req, res) => {
        const filePath = path.join(
          retroBowlDir, 
          req.path.replace('/games/retro-bowl/retro-bowl-main/', '')
        );
        
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.sendFile(filePath);
        } else {
          res.status(404).send('Game file not found');
        }
      });
    } else {
      console.warn('Retro Bowl directory not found at:', retroBowlDir);
    }
    
    // Create specific route for basketball-stars assets
    const basketballStarsDir = path.join(gamesDir, 'basketball-stars');
    if (fs.existsSync(basketballStarsDir)) {
      console.log('Basketball Stars directory found at:', basketballStarsDir);
      
      // Serve basketball-stars assets
      app.get('/games/basketball-stars/*', (req, res) => {
        const filePath = path.join(
          basketballStarsDir, 
          req.path.replace('/games/basketball-stars/', '')
        );
        
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.sendFile(filePath);
        } else {
          res.status(404).send('Game file not found');
        }
      });
    } else {
      console.warn('Basketball Stars directory not found at:', basketballStarsDir);
    }
  } else {
    console.warn('Games directory not found at:', gamesDir);
  }

  const httpServer = createServer(app);
  return httpServer;
}
