import { X } from "lucide-react";

interface CheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatSheet = ({ isOpen, onClose }: CheatSheetProps) => {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ["⌘", "K"], description: "Open Spotlight Search" },
    { keys: ["⌘", "H"], description: "Show Hidden Apps" },
    { keys: ["ESC"], description: "Close Spotlight" },
    { keys: ["↑", "↓"], description: "Navigate Spotlight" },
    { keys: ["Enter"], description: "Select in Spotlight" },
  ];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="spotlight-glass rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">{shortcut.description}</span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, i) => (
                  <kbd key={i} className="px-2 py-1 text-xs font-semibold bg-muted rounded border border-border">
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-xs text-muted-foreground text-center">
          Click anywhere outside to close
        </div>
      </div>
    </div>
  );
};
