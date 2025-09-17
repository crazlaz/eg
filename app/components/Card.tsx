import React from 'react';
import Image from 'next/image'; // Import the Next.js Image component

// Define a type for the image array, assuming strings are URLs
type ImageProps = {
  src: string;
  alt: string; // Add alt text for accessibility
};

export default function Card({
  title,
  children,
  icon,
  images = [], // New prop for an array of 8 images, with a default empty array
}: {
  title: string;
  children: React.ReactNode;
  icon?: string;
  images?: ImageProps[]; // Define the new images prop type
}) {
  return (
    <div className="card">
      <div style={{ padding: "1.1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          {icon ? <span style={{ fontSize: "1.25rem" }}>{icon}</span> : null}
          <div style={{ fontWeight: 600 }}>{title}</div>
        </div>
        <div style={{ marginTop: ".5rem" }}>{children}</div>
      </div>

      {/* New Image Gallery Section */}
      {images.length > 0 && (
        <div className="image-gallery">
          {images.slice(0, 8).map((img, index) => (
            <div key={index} className="image-container">
              <Image
                src={img.src}
                alt={img.alt || `Card image ${index + 1}`}
                layout="fill" // Ensures the image fills the parent container
                objectFit="cover" // Crops to fill the container, maintaining aspect ratio
                quality={75} // Optimizes image quality
              />
            </div>
          ))}
        </div>
      )}

      {/* CSS for the Card Component */}
      <style jsx>{`
        .card {
          border: 1px solid var(--border); /* assuming a card style */
          border-radius: 0.5rem;
          overflow: hidden; /* important to contain the images */
          background: var(--bgElev); /* assuming a background style */
        }

        .image-gallery {
          display: grid;
          /* 4 columns on desktop/tablet */
          grid-template-columns: repeat(4, 1fr); 
          gap: 0px; /* remove gaps between images if you want a tight grid */
          border-top: 1px solid var(--border);
        }

        .image-container {
          position: relative;
          /* This creates a perfect square container for each image (1:1 aspect ratio) */
          padding-bottom: 100%; 
          overflow: hidden;
        }

        /* Mobile Adjustments (under 768px) */
        @media (max-width: 767px) {
          .image-gallery {
            /* 2 columns on mobile for a better fit */
            grid-template-columns: repeat(2, 1fr);
          }
          /* Ensure only 6 images show on a smaller mobile screen for better scrolling */
          .image-container:nth-child(n + 7) { 
              display: none;
          }
        }

        /* Tablet Adjustments (optional, for 3 columns) */
        @media (min-width: 480px) and (max-width: 767px) {
             .image-gallery {
                grid-template-columns: repeat(3, 1fr);
             }
        }
      `}</style>
    </div>
  );
}