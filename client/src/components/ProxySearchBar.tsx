import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function ProxySearchBar() {
  const [url, setUrl] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let processedUrl = url.trim();
    
    // Check if URL includes protocol
    if (!processedUrl.startsWith("http://") && !processedUrl.startsWith("https://")) {
      processedUrl = "https://" + processedUrl;
    }
    
    // Open the URL in a new tab
    window.open(processedUrl, "_blank", "noopener,noreferrer");
    
    // Clear input
    setUrl("");
  };

  return (
    <form 
      className="w-full flex items-center mt-4" 
      onSubmit={handleSubmit}
    >
      <div className="relative w-full group">
        <Input
          type="text"
          placeholder="Enter URL to proxy"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-black/20 border-white/20 rounded-l-md pr-10 text-white w-full 
                     focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 
                     placeholder:text-white/50 text-sm"
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none 
                        text-white/40 group-focus-within:text-cyan-400 transition-colors duration-200">
          <Search className="h-4 w-4" />
        </div>
      </div>
      <Button 
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700
                   transition-colors duration-200 rounded-r-md text-white text-sm px-4 h-10 min-w-[80px]"
      >
        Proxy
      </Button>
    </form>
  );
}