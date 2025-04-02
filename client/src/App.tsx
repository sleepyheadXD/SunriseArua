import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import CursorParticles from "@/components/CursorParticles";
import RegionClock from "@/components/RegionClock";
import Home from "@/pages/Home";
import Games from "@/pages/Games";
import Partners from "@/pages/Partners";
import RetroGame from "@/pages/RetroGame";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/games" component={Games} />
      <Route path="/games/:gameId" component={RetroGame} />
      <Route path="/partners" component={Partners} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <CursorParticles />
      <RegionClock />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
