const photos = [
  { id: 1, color: "bg-gradient-to-br from-blue-400 to-blue-600", label: "Conference 2024" },
  { id: 2, color: "bg-gradient-to-br from-purple-400 to-purple-600", label: "Team Building" },
  { id: 3, color: "bg-gradient-to-br from-pink-400 to-pink-600", label: "Hackathon Win" },
  { id: 4, color: "bg-gradient-to-br from-orange-400 to-orange-600", label: "Product Launch" },
  { id: 5, color: "bg-gradient-to-br from-green-400 to-green-600", label: "Office Views" },
  { id: 6, color: "bg-gradient-to-br from-teal-400 to-teal-600", label: "Workshop" },
  { id: 7, color: "bg-gradient-to-br from-red-400 to-red-600", label: "Meetup" },
  { id: 8, color: "bg-gradient-to-br from-yellow-400 to-yellow-600", label: "Award Ceremony" },
];

export const PhotosWindow = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Photos</h2>
        <p className="text-sm text-muted-foreground">All Photos • {photos.length} items</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
          >
            <div className={`w-full h-full ${photo.color} transition-transform group-hover:scale-110`} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end p-3">
              <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {photo.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
