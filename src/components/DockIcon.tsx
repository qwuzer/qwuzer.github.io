import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface DockIconProps {
  icon: LucideIcon;
  label: string;
  color: string;
  onClick: () => void;
}

export const DockIcon = ({ icon: Icon, label, color, onClick }: DockIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group">
      <button
        className={`w-14 h-14 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-125 hover:-translate-y-2 shadow-lg ${color}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <Icon className="w-8 h-8" />
      </button>
      
      {isHovered && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass-effect px-3 py-1 rounded-lg text-xs whitespace-nowrap animate-fade-in">
          {label}
        </div>
      )}
    </div>
  );
};
