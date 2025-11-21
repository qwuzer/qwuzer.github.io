import { useState, useEffect, useRef } from "react";
import { Search, Folder, User, Briefcase, Image, Music, Mail } from "lucide-react";

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onAppClick: (appId: string) => void;
}

const apps = [
  { id: "finder", name: "Finder", icon: Folder, description: "File manager" },
  { id: "about", name: "About Me", icon: User, description: "Personal information" },
  { id: "projects", name: "Projects", icon: Briefcase, description: "My work and projects" },
  { id: "photos", name: "Photos", icon: Image, description: "Photo gallery" },
  { id: "music", name: "Music", icon: Music, description: "Music player" },
  { id: "mail", name: "Mail", icon: Mail, description: "Email messages" },
];

export const Spotlight = ({ isOpen, onClose, onAppClick }: SpotlightProps) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredApps.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredApps.length) % filteredApps.length);
      } else if (e.key === "Enter" && filteredApps.length > 0) {
        onAppClick(filteredApps[selectedIndex].id);
        onClose();
        setSearch("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredApps, selectedIndex, onAppClick, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-start justify-center pt-32 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl spotlight-glass rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-border/50">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search for apps..."
            className="flex-1 bg-transparent outline-none text-lg"
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredApps.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No results found
            </div>
          ) : (
            filteredApps.map((app, index) => {
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => {
                    onAppClick(app.id);
                    onClose();
                    setSearch("");
                  }}
                  className={`w-full flex items-center gap-4 p-4 transition-colors ${
                    index === selectedIndex ? 'bg-primary/20' : 'hover:bg-secondary/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{app.name}</div>
                    <div className="text-sm text-muted-foreground">{app.description}</div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
