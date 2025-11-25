import { useState } from "react";
import { photosData, type Photo } from "../../data/photos";

interface PhotoItemProps {
  photo: Photo;
}

const PhotoItem = ({ photo }: PhotoItemProps) => {
  const [imageError, setImageError] = useState(false);
  const hasImage = photo.imageUrl && !imageError;
  const hasGradient = photo.gradientClass;

  return (
    <div
      className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
      role="button"
      tabIndex={0}
      aria-label={photo.label}
    >
      {hasImage ? (
        <img
          src={photo.imageUrl}
          alt={photo.alt || photo.label}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : hasGradient ? (
        <div
          className={`w-full h-full ${photo.gradientClass} transition-transform group-hover:scale-110`}
          aria-label={photo.label}
        />
      ) : (
        <div className="w-full h-full bg-secondary transition-transform group-hover:scale-110" />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end p-3">
        <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          {photo.label}
        </span>
      </div>
    </div>
  );
};

export const PhotosWindow = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Photos</h2>
        <p className="text-sm text-muted-foreground">
          All Photos • {photosData.length} items
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photosData.map((photo) => (
          <PhotoItem key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};
