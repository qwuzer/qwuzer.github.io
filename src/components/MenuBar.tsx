import { Wifi, Battery, Search, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";

export const MenuBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  const dateString = currentTime.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-7 glass-effect border-b border-border/50 flex items-center justify-between px-4 text-sm z-50">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-lg"></span>
        <span className="text-foreground font-medium">William's Portfolio</span>
      </div>
      
      <div className="flex items-center gap-3">
        <Volume2 className="w-4 h-4" />
        <Battery className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <div className="flex items-center gap-2">
          <span>{dateString}</span>
          <span>{timeString}</span>
        </div>
      </div>
    </div>
  );
};
