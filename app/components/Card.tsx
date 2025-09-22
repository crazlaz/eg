import React from 'react';

// Define a type for the image array
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
      
      {/* Image Gallery Section - Using regular img tags */}
      {images.length > 0 && (
        <div className="image-gallery">
          {images.slice(0, 8).map((img, index) => (
            <div key={index} className="image-container">
              <img
                src={img.src}
                alt={img.alt || `Card image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  // Fallback if image fails to load
                  console.log(`Failed to load image: ${img.src}`);
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              <div 
                className="image-fallback"
                style={{ 
                  display: "none",
                  width: "100%", 
                  height: "100%", 
                  backgroundColor: "var(--bgElev)",
                  border: "1px solid var(--border)",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--muted)",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  padding: "0.5rem"
                }}
              >
                Image {index + 1}
              </div>
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
          grid-template-columns: repeat(4, 1fr);
          gap: 0px;
          border-top: 1px solid var(--border);
        }
        
        .image-container {
          position: relative;
          padding-bottom: 100%; /* Creates a perfect square */
          overflow: hidden;
          background: var(--bgElev);
        }
        
        .image-container img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .image-fallback {
          position: absolute;
          top: 0;
          left: 0;
        }

        /* Mobile Adjustments */
        @media (max-width: 767px) {
          .image-gallery {
            grid-template-columns: repeat(2, 1fr);
          }
          
          /* Hide last images on mobile for cleaner look */
          .image-container:nth-child(n + 5) {
            display: none;
          }
        }

        /* Tablet Adjustments */
        @media (min-width: 480px) and (max-width: 767px) {
          .image-gallery {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .image-container:nth-child(n + 7) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}