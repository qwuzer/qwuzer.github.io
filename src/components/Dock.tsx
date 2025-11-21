import { Folder, User, Briefcase, Image, Music, Mail, Globe, Github, Linkedin } from "lucide-react";
import { DockIcon } from "./DockIcon";

interface DockProps {
  onAppClick: (appId: string) => void;
  openApps: string[];
}

export const Dock = ({ onAppClick, openApps }: DockProps) => {
  const apps = [
    { id: "finder", icon: Folder, label: "Finder", color: "text-blue-500" },
    { id: "about", icon: User, label: "About Me", color: "text-purple-500" },
    { id: "projects", icon: Briefcase, label: "Projects", color: "text-orange-500" },
    { id: "photos", icon: Image, label: "Photos", color: "text-pink-500" },
    { id: "music", icon: Music, label: "Music", color: "text-red-500" },
    { id: "mail", icon: Mail, label: "Mail", color: "text-blue-400" },
  ];

  const externalLinks = [
    { id: "github", icon: Github, label: "GitHub", url: "https://github.com/qwuzer", color: "text-gray-800" },
    { id: "linkedin", icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/%E7%A5%90%E5%98%89-%E5%BC%B5-60690a399/", color: "text-blue-600" },
    // { id: "portfolio", icon: Globe, label: "Website", url: "https://example.com", color: "text-green-500" },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 dock-container pb-4">
      <div className="dock-glass rounded-2xl px-3 py-2 flex items-end gap-2 shadow-2xl">
        {apps.map((app) => (
          <div key={app.id} className="relative">
            <DockIcon
              icon={app.icon}
              label={app.label}
              color={app.color}
              onClick={() => onAppClick(app.id)}
            />
            {openApps.includes(app.id) && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground/70" />
            )}
          </div>
        ))}
        
        <div className="w-px h-12 bg-border/50 mx-1" />
        
        {externalLinks.map((link) => (
          <DockIcon
            key={link.id}
            icon={link.icon}
            label={link.label}
            color={link.color}
            onClick={() => window.open(link.url, '_blank')}
          />
        ))}
      </div>
    </div>
  );
};
