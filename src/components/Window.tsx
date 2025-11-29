import { X, Minus, Square, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface WindowProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  initialPosition?: { x: number; y: number };
  width?: number;
  height?: number;
  zIndex: number;
  onFocus: () => void;
  isMinimized?: boolean;
  isHidden?: boolean;
}

export const Window = ({
  title,
  icon,
  children,
  onClose,
  onMinimize,
  initialPosition = { x: 100, y: 100 },
  width = 800,
  height = 600,
  zIndex,
  onFocus,
  isMinimized = false,
  isHidden = false,
}: WindowProps) => {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width, height });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) {
      // On mobile, always make window fullscreen
      setPosition({ x: 0, y: 0 });
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsMaximized(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
      if (isResizing && windowRef.current) {
        const newSize = { ...size };
        const newPos = { ...position };

        if (resizeDirection.includes("e")) {
          newSize.width = Math.max(400, e.clientX - position.x);
        }
        if (resizeDirection.includes("s")) {
          newSize.height = Math.max(300, e.clientY - position.y);
        }
        if (resizeDirection.includes("w")) {
          const newWidth = Math.max(400, size.width - (e.clientX - position.x));
          newPos.x = size.width === newWidth ? position.x : e.clientX;
          newSize.width = newWidth;
        }
        if (resizeDirection.includes("n")) {
          const newHeight = Math.max(
            300,
            size.height - (e.clientY - position.y)
          );
          newPos.y = size.height === newHeight ? position.y : e.clientY;
          newSize.height = newHeight;
        }

        setSize(newSize);
        setPosition(newPos);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection("");
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMobile, isDragging, isResizing, dragOffset, resizeDirection, size, position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return; // Disable dragging on mobile
    onFocus();
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleMaximize = () => {
    if (isMobile) return; // Disable maximize on mobile (always fullscreen)
    if (isMaximized) {
      setSize({ width, height });
      setPosition(initialPosition);
      setIsMaximized(false);
    } else {
      setPosition({ x: 0, y: 40 });
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - 40 - 100,
      });
      setIsMaximized(true);
    }
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    if (isMobile) return; // Disable resizing on mobile
    e.preventDefault();
    e.stopPropagation();
    onFocus();
    setResizeDirection(direction);
    setIsResizing(true);
  };

  if (isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className={`fixed window-style overflow-hidden animate-scale-in ${
        isMobile ? "rounded-none" : "rounded-xl"
      }`}
      style={{
        left: isMobile ? 0 : position.x,
        top: isMobile ? 48 : position.y,
        width: isMobile ? "100vw" : `${size.width}px`,
        height: isMobile ? `calc(100vh - 48px - 64px)` : `${size.height}px`,
        maxWidth: isMobile ? "100vw" : "calc(100vw - 40px)",
        maxHeight: isMobile ? "100vh" : "calc(100vh - 100px)",
        zIndex,
        transform: isHidden && !isMobile
          ? "translateY(40px) scale(0.97)"
          : "translateY(0) scale(1)",
        opacity: isHidden && !isMobile ? 0 : 1,
        pointerEvents: isHidden && !isMobile ? "none" : "auto",
        transition: "transform 0.25s ease, opacity 0.25s ease",
      }}
      onClick={onFocus}
    >
      <div
        className={`h-12 bg-[hsl(var(--window-header))] border-b border-border flex items-center justify-between px-4 ${
          isMobile ? "" : "cursor-move"
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 flex-1">
          {isMobile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="mr-2 p-1 rounded-lg hover:bg-muted transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className={`flex items-center gap-2 ${isMobile ? "hidden" : ""}`}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-3 h-3 rounded-full bg-macos-red hover:brightness-110 transition-all group"
              title="Close"
            >
              <X
                className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize?.();
              }}
              className="w-3 h-3 rounded-full bg-macos-yellow hover:brightness-110 transition-all group"
              title="Minimize"
            >
              <Minus
                className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              className="w-3 h-3 rounded-full bg-macos-green hover:brightness-110 transition-all group flex items-center justify-center"
              title="Maximize"
            >
              <Square
                className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </button>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {icon}
            <span className="text-sm font-medium">{title}</span>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1 rounded-lg hover:bg-muted transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className={`overflow-auto ${isMobile ? "h-[calc(100%-3rem)]" : "h-[calc(100%-3rem)]"}`}>{children}</div>

      {/* Resize handles - only show on desktop */}
      {!isMobile && (
        <>
          <div
            className="absolute top-0 left-0 w-1 h-full cursor-ew-resize"
            onMouseDown={(e) => handleResizeStart(e, "w")}
          />
          <div
            className="absolute top-0 right-0 w-1 h-full cursor-ew-resize"
            onMouseDown={(e) => handleResizeStart(e, "e")}
          />
          <div
            className="absolute top-0 left-0 w-full h-1 cursor-ns-resize"
            onMouseDown={(e) => handleResizeStart(e, "n")}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-1 cursor-ns-resize"
            onMouseDown={(e) => handleResizeStart(e, "s")}
          />
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize"
            onMouseDown={(e) => handleResizeStart(e, "nw")}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize"
            onMouseDown={(e) => handleResizeStart(e, "ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize"
            onMouseDown={(e) => handleResizeStart(e, "sw")}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize"
            onMouseDown={(e) => handleResizeStart(e, "se")}
          />
        </>
      )}
    </div>
  );
};
