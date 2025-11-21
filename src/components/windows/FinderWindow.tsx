import {
  Folder,
  FileText,
  Image,
  File,
  ChevronRight,
  Camera,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import resumePdf from "@/assets/Resume.pdf";
import createPrdDoc from "@/assets/create-prd.md";
import generateTasksDoc from "@/assets/generate-tasks.md";
import hachiwareImage from "@/assets/hachiware.jpg";
import memeImage from "@/assets/front-end-meme.jpeg";
import wallpaperImage from "@/assets/macos-wallpaper.jpg";
import tsPortrait from "@/assets/ts.jpg";
import { projectsData } from "./ProjectsWindow";

type FinderFile = {
  name: string;
  type: string;
  size: string;
  modified: string;
  filePath?: string;
  projectName?: string;
};

const filesData = {
  Documents: [
    {
      name: "Resume.pdf",
      type: "PDF Document",
      size: "245 KB",
      modified: "Nov 19, 2025",
      filePath: resumePdf,
    },
    {
      name: "create-prd.md",
      type: "Markdown Document",
      size: "8 KB",
      modified: "Nov 12, 2025",
      filePath: createPrdDoc,
    },
    {
      name: "generate-tasks.md",
      type: "Markdown Document",
      size: "6 KB",
      modified: "Nov 11, 2025",
      filePath: generateTasksDoc,
    },
  ],
  Projects: projectsData.map((project, index) => ({
    name: project.title,
    type: "Project Shortcut",
    size: "—",
    modified: `Project ${index + 1}`,
    projectName: project.title,
  })),
  Images: [
    {
      name: "hachiware.jpg",
      type: "JPEG Image",
      size: "1.4 MB",
      modified: "Nov 8, 2025",
      filePath: hachiwareImage,
    },
    {
      name: "front-end-meme.jpeg",
      type: "JPEG Image",
      size: "820 KB",
      modified: "Nov 4, 2025",
      filePath: memeImage,
    },
    {
      name: "macos-wallpaper.jpg",
      type: "JPEG Image",
      size: "3.2 MB",
      modified: "Oct 31, 2025",
      filePath: wallpaperImage,
    },
    {
      name: "ts.jpg",
      type: "JPEG Image",
      size: "1.1 MB",
      modified: "Oct 22, 2025",
      filePath: tsPortrait,
    },
  ],
} as const satisfies Record<string, FinderFile[]>;

type FolderName = keyof typeof filesData;

const folderIcons: Record<FolderName, LucideIcon> = {
  Documents: FileText,
  Projects: Folder,
  Images: Image,
};

const folders = (Object.keys(filesData) as FolderName[]).map((name) => ({
  name,
  icon: folderIcons[name],
  count: filesData[name].length,
}));

interface FinderWindowProps {
  onFileOpen?: (fileName: string, fileType: string, filePath?: string) => void;
  onOpenProjects?: (projectName?: string) => void;
}

export const FinderWindow = ({
  onFileOpen,
  onOpenProjects,
}: FinderWindowProps) => {
  const [selectedFolder, setSelectedFolder] = useState<FolderName>("Documents");
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const files = filesData[selectedFolder] || [];

  const handleFileClick = (file: FinderFile) => {
    if (file.projectName) {
      onOpenProjects?.(file.projectName);
      return;
    }

    if (
      file.type === "PDF Document" ||
      file.type === "JPEG Image" ||
      file.type === "PNG Image" ||
      file.type === "Markdown Document"
    ) {
      onFileOpen?.(file.name, file.type, file.filePath);
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 bg-[hsl(var(--finder-sidebar))] border-r border-border p-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">
            Favorites
          </div>
          {folders.map((folder) => {
            const Icon = folder.icon;
            return (
              <button
                key={folder.name}
                onClick={() => setSelectedFolder(folder.name)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-primary/10 text-sm group transition-colors ${
                  selectedFolder === folder.name ? "bg-primary/20" : ""
                }`}
              >
                <Icon className="w-4 h-4 text-primary" />
                <span className="flex-1 text-left">{folder.name}</span>
                <span className="text-xs text-muted-foreground">
                  {folder.count}
                </span>
              </button>
            );
          })}

          <div className="text-xs font-semibold text-muted-foreground mb-2 px-2 mt-6">
            Devices
          </div>
          <button
            onClick={() => setShowEasterEgg(!showEasterEgg)}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-primary/10 text-sm transition-all"
          >
            <Folder className="w-4 h-4 text-blue-500" />
            <span className="flex-1 text-left">MacBook Pro</span>
          </button>

          {showEasterEgg && (
            <div className="mt-2 p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 animate-scale-in">
              <div className="text-xs font-semibold mb-1 flex items-center gap-1">
                <span className="animate-pulse">🎉</span>
                <span>Easter Egg Found!</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Welcome to William's Portfolio! This macOS-inspired interface
                was crafted with attention to detail and creativity.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>Portfolio</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{selectedFolder}</span>
        </div>

        <div className="space-y-1">
          {files.map((file) => {
            const isClickable =
              file.type === "PDF Document" ||
              file.type === "JPEG Image" ||
              file.type === "PNG Image" ||
              file.type === "Markdown Document" ||
              Boolean(file.projectName);
            return (
              <div
                key={`${file.name}-${file.modified}`}
                onClick={() => handleFileClick(file)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 group transition-colors ${
                  isClickable ? "cursor-pointer" : "cursor-default"
                }`}
              >
                {file.type === "Folder" ? (
                  <Folder className="w-5 h-5 text-blue-500" />
                ) : file.type.includes("Image") ? (
                  <Camera className="w-5 h-5 text-pink-500" />
                ) : file.type === "PDF Document" ? (
                  <FileText className="w-5 h-5 text-red-500" />
                ) : file.projectName ? (
                  <Folder className="w-5 h-5 text-primary" />
                ) : (
                  <File className="w-5 h-5 text-primary" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {file.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {file.type}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {file.size}
                </div>
                <div className="text-xs text-muted-foreground hidden md:block w-32">
                  {file.modified}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
