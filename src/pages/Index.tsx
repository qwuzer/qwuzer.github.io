import { useState, useEffect } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { MenuBar } from "@/components/MenuBar";
import { Dock } from "@/components/Dock";
import { Window } from "@/components/Window";
import { Spotlight } from "@/components/Spotlight";
import { CheatSheet } from "@/components/CheatSheet";
import { FinderWindow } from "@/components/windows/FinderWindow";
import { AboutWindow } from "@/components/windows/AboutWindow";
import { ProjectsWindow } from "@/components/windows/ProjectsWindow";
import { PhotosWindow } from "@/components/windows/PhotosWindow";
import { MusicWindow } from "@/components/windows/MusicWindow";
import { MailWindow } from "@/components/windows/MailWindow";
import { PreviewWindow } from "@/components/windows/PreviewWindow";
import {
  Folder,
  User,
  Briefcase,
  Image,
  Music,
  Mail,
  FileText,
  HelpCircle,
} from "lucide-react";
import wallpaper from "@/assets/macos-wallpaper.jpg";

type AppId =
  | "finder"
  | "about"
  | "projects"
  | "photos"
  | "music"
  | "mail"
  | "preview";

interface AppState {
  id: AppId;
  zIndex: number;
  isMinimized: boolean;
}

const Index = () => {
  const [openApps, setOpenApps] = useState<AppState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<{
    name: string;
    type: string;
    filePath?: string;
  } | null>(null);
  const [desktopCleared, setDesktopCleared] = useState(false);
  const [highlightedProject, setHighlightedProject] = useState<string | null>(
    null
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSpotlightOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "h") {
        e.preventDefault();
        // Show all minimized apps
        setOpenApps(openApps.map((app) => ({ ...app, isMinimized: false })));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openApps]);

  useEffect(() => {
    if (!openApps.length && desktopCleared) {
      setDesktopCleared(false);
    }
  }, [desktopCleared, openApps.length]);

  const handleAppClick = (appId: AppId) => {
    setDesktopCleared(false);
    const existingApp = openApps.find((app) => app.id === appId);
    if (existingApp) {
      if (existingApp.isMinimized) {
        // Restore minimized window
        setOpenApps(
          openApps.map((app) =>
            app.id === appId
              ? { ...app, isMinimized: false, zIndex: maxZIndex + 1 }
              : app
          )
        );
        setMaxZIndex(maxZIndex + 1);
      } else {
        // Bring to front if already open
        handleFocusApp(appId);
      }
    } else {
      // Open new window
      setOpenApps([
        ...openApps,
        { id: appId, zIndex: maxZIndex + 1, isMinimized: false },
      ]);
      setMaxZIndex(maxZIndex + 1);
    }
  };

  const handleCloseApp = (appId: AppId) => {
    setOpenApps(openApps.filter((app) => app.id !== appId));
    if (appId === "projects") {
      setHighlightedProject(null);
    }
  };

  const handleMinimizeApp = (appId: AppId) => {
    setOpenApps(
      openApps.map((app) =>
        app.id === appId ? { ...app, isMinimized: true } : app
      )
    );
  };

  const handleFocusApp = (appId: AppId) => {
    setDesktopCleared(false);
    const app = openApps.find((a) => a.id === appId);
    if (app && app.zIndex !== maxZIndex) {
      setOpenApps(
        openApps.map((a) =>
          a.id === appId ? { ...a, zIndex: maxZIndex + 1 } : a
        )
      );
      setMaxZIndex(maxZIndex + 1);
    }
  };

  const handleFileOpen = (
    fileName: string,
    fileType: string,
    filePath?: string
  ) => {
    setDesktopCleared(false);
    setPreviewFile({ name: fileName, type: fileType, filePath });
    handleAppClick("preview");
  };

  const handleOpenProjectsFromFinder = (projectName?: string) => {
    setHighlightedProject(projectName || null);
    handleAppClick("projects");
  };

  const handleDesktopClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && openApps.length) {
      setDesktopCleared((prev) => !prev);
    }
  };

  const appConfigs: Record<
    string,
    {
      title: string;
      icon: JSX.Element;
      component: any;
      width: number;
      height: number;
      props?: any;
    }
  > = {
    finder: {
      title: "Finder",
      icon: <Folder className="w-4 h-4" />,
      component: FinderWindow,
      width: 900,
      height: 600,
      props: {
        onFileOpen: handleFileOpen,
        onOpenProjects: handleOpenProjectsFromFinder,
      },
    },
    about: {
      title: "About Me",
      icon: <User className="w-4 h-4" />,
      component: AboutWindow,
      width: 700,
      height: 600,
    },
    projects: {
      title: "Projects",
      icon: <Briefcase className="w-4 h-4" />,
      component: ProjectsWindow,
      width: 900,
      height: 650,
      props: { highlightedProject },
    },
    photos: {
      title: "Photos",
      icon: <Image className="w-4 h-4" />,
      component: PhotosWindow,
      width: 800,
      height: 600,
    },
    music: {
      title: "Music",
      icon: <Music className="w-4 h-4" />,
      component: MusicWindow,
      width: 600,
      height: 700,
    },
    mail: {
      title: "Mail",
      icon: <Mail className="w-4 h-4" />,
      component: MailWindow,
      width: 700,
      height: 650,
    },
    preview: {
      title: previewFile?.name || "Preview",
      icon: <FileText className="w-4 h-4" />,
      component: PreviewWindow,
      width: 800,
      height: 700,
      props: {
        fileName: previewFile?.name || "",
        fileType: previewFile?.type || "",
        filePath: previewFile?.filePath,
      },
    },
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden relative"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseDown={handleDesktopClick}
    >
      <MenuBar />

      <Spotlight
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onAppClick={handleAppClick}
      />

      <CheatSheet
        isOpen={cheatSheetOpen}
        onClose={() => setCheatSheetOpen(false)}
      />

      <button
        onClick={() => setCheatSheetOpen(true)}
        className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all hover:scale-110"
        title="Keyboard Shortcuts"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {openApps.map((appState, index) => {
        const config = appConfigs[appState.id];
        const Component = config.component;
        const offset = index * 30;

        return (
          <Window
            key={appState.id}
            title={config.title}
            icon={config.icon}
            onClose={() => handleCloseApp(appState.id)}
            onMinimize={() => handleMinimizeApp(appState.id)}
            onFocus={() => handleFocusApp(appState.id)}
            initialPosition={{ x: 100 + offset, y: 80 + offset }}
            width={config.width}
            height={config.height}
            zIndex={appState.zIndex}
            isMinimized={appState.isMinimized}
            isHidden={desktopCleared}
          >
            <Component {...(config.props || {})} />
          </Window>
        );
      })}

      <Dock
        onAppClick={handleAppClick}
        openApps={openApps.map((app) => app.id)}
      />
    </div>
  );
};

export default Index;
