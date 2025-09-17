import React from 'react';
import Image from 'next/image';

// Define a type for the image array, assuming strings are URLs
type ImageProps = {
  src: string;
  alt: string;
};

export default function Card({
  title,
  children,
  icon,
  images = [],
}: {
  title: string;
  children: React.ReactNode;
  icon?: string;
  images?: ImageProps[];
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
                fill={true} // 🌟 FIX: Use 'fill' prop instead of deprecated 'layout="fill"'
                sizes="(max-width: 767px) 50vw, 25vw" // Required for 'fill' and good for responsive loading
                style={{
                    objectFit: "cover", // Crops to fill the container
                // Ensures the image respects the parent container
                }}
                quality={75}
              />
            </div>
          ))}
        </div>
      )}

      {/* CSS for the Card Component */}
      <style jsx>{`
        .card {
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          overflow: hidden;
          background: var(--bgElev);
        }

        .image-gallery {
          display: grid;
          /* Desktop: 4 columns */
          grid-template-columns: repeat(4, 1fr); 
          gap: 0px; 
          border-top: 1px solid var(--border);
        }

        .image-container {
          position: relative; /* 💡 CRITICAL: Still required for 'fill' to work */
          /* Creates a perfect square container */
          padding-bottom: 100%; 
          overflow: hidden;
        }

        /* --- Mobile Adjustments (under 768px) --- */
        @media (max-width: 767px) {
          .image-gallery {
            /* Mobile: 2 columns for better visibility */
            grid-template-columns: repeat(2, 1fr);
          }
          /* Optional: Hide last two images to shorten card on mobile */
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