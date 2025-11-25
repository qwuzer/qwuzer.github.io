export interface Photo {
  id: string | number;
  label: string;
  // Either provide an image URL or a gradient placeholder
  imageUrl?: string; // Path to image (relative to public/ or absolute URL)
  gradientClass?: string; // Tailwind gradient class for placeholder
  alt?: string; // Alt text for accessibility
  // Optional metadata
  date?: string;
  location?: string;
}

/**
 * Photo data configuration
 *
 * To add actual photos:
 * 1. Add images to the public/photos/ folder (create the folder if needed)
 * 2. Update the imageUrl property, e.g., "/photos/conference-2024.jpg"
 * 3. Remove or keep the gradientClass as a fallback
 *
 * Example with actual photo:
 * {
 *   id: 1,
 *   label: "Conference 2024",
 *   imageUrl: "/photos/conference-2024.jpg",
 *   alt: "Team at the 2024 conference",
 *   date: "2024-03-15",
 *   location: "San Francisco, CA"
 * }
 *
 * You can also use external URLs:
 * {
 *   id: 1,
 *   label: "Conference 2024",
 *   imageUrl: "https://example.com/photos/conference.jpg",
 *   alt: "Team at the 2024 conference"
 * }
 */
export const photosData: Photo[] = [
  {
    id: 1,
    label: "Conference 2024",
    gradientClass: "bg-gradient-to-br from-blue-400 to-blue-600",
    // imageUrl: "/photos/conference-2024.jpg", // Uncomment when you have the image
  },
  {
    id: 2,
    label: "Team Building",
    gradientClass: "bg-gradient-to-br from-purple-400 to-purple-600",
    // imageUrl: "/photos/team-building.jpg",
  },
  {
    id: 3,
    label: "Hackathon Win",
    gradientClass: "bg-gradient-to-br from-pink-400 to-pink-600",
    // imageUrl: "/photos/hackathon-win.jpg",
  },
  {
    id: 4,
    label: "Product Launch",
    gradientClass: "bg-gradient-to-br from-orange-400 to-orange-600",
    // imageUrl: "/photos/product-launch.jpg",
  },
  {
    id: 5,
    label: "Office Views",
    gradientClass: "bg-gradient-to-br from-green-400 to-green-600",
    // imageUrl: "/photos/office-views.jpg",
  },
  {
    id: 6,
    label: "Workshop",
    gradientClass: "bg-gradient-to-br from-teal-400 to-teal-600",
    // imageUrl: "/photos/workshop.jpg",
  },
  {
    id: 7,
    label: "Meetup",
    gradientClass: "bg-gradient-to-br from-red-400 to-red-600",
    // imageUrl: "/photos/meetup.jpg",
  },
  {
    id: 8,
    label: "Award Ceremony",
    gradientClass: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    // imageUrl: "/photos/award-ceremony.jpg",
  },
];
