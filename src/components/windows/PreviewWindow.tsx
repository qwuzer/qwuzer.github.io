import { useEffect, useState } from "react";
import { FileText, Image as ImageIcon } from "lucide-react";

interface PreviewWindowProps {
  fileName: string;
  fileType: string;
  filePath?: string;
}

export const PreviewWindow = ({
  fileName,
  fileType,
  filePath,
}: PreviewWindowProps) => {
  const isPDF = fileType === "PDF Document";
  const isImage = fileType === "JPEG Image" || fileType === "PNG Image";
  const isMarkdown = fileType === "Markdown Document";
  const [markdownContent, setMarkdownContent] = useState("");
  const [isLoadingMarkdown, setIsLoadingMarkdown] = useState(false);
  const [markdownError, setMarkdownError] = useState<string | null>(null);

  useEffect(() => {
    if (isMarkdown && filePath) {
      setIsLoadingMarkdown(true);
      setMarkdownError(null);
      fetch(filePath)
        .then((res) => res.text())
        .then((text) => setMarkdownContent(text))
        .catch(() => setMarkdownError("Unable to load Markdown file"))
        .finally(() => setIsLoadingMarkdown(false));
    } else {
      setMarkdownContent("");
      setMarkdownError(null);
      setIsLoadingMarkdown(false);
    }
  }, [filePath, isMarkdown]);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Preview Content */}
      <div className="flex-1 p-4 flex items-center justify-center overflow-hidden">
        {isPDF && filePath && (
          <div className="w-full h-full bg-gray-100 rounded-lg shadow-lg overflow-hidden">
            <iframe
              src={filePath}
              className="w-full h-full border-0"
              title={fileName}
            />
          </div>
        )}

        {isPDF && !filePath && (
          <div className="text-center space-y-4">
            <FileText className="w-20 h-20 mx-auto text-primary" />
            <h3 className="text-xl font-semibold">{fileName}</h3>
            <p className="text-muted-foreground">File not found</p>
          </div>
        )}

        {isImage && filePath && (
          <div className="max-w-full max-h-full p-4 flex items-center justify-center">
            <img
              src={filePath}
              alt={fileName}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        )}

        {isImage && !filePath && (
          <div className="text-center space-y-4">
            <ImageIcon className="w-20 h-20 mx-auto text-primary" />
            <h3 className="text-xl font-semibold">{fileName}</h3>
            <p className="text-muted-foreground">Image not found</p>
          </div>
        )}

        {isMarkdown && (
          <div className="w-full h-full bg-secondary/20 rounded-lg border border-border p-4 overflow-auto">
            {isLoadingMarkdown && (
              <p className="text-sm text-muted-foreground">Loading markdown…</p>
            )}
            {!isLoadingMarkdown && markdownError && (
              <p className="text-sm text-destructive">{markdownError}</p>
            )}
            {!isLoadingMarkdown && !markdownError && markdownContent && (
              <pre className="whitespace-pre-wrap text-sm font-mono text-foreground">
                {markdownContent}
              </pre>
            )}
            {!isLoadingMarkdown && !markdownError && !markdownContent && (
              <p className="text-sm text-muted-foreground">
                No content available
              </p>
            )}
          </div>
        )}

        {!isPDF && !isImage && !isMarkdown && (
          <div className="text-center space-y-4">
            <FileText className="w-20 h-20 mx-auto text-primary" />
            <h3 className="text-xl font-semibold">{fileName}</h3>
            <p className="text-muted-foreground">
              Preview not available for this file type
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
