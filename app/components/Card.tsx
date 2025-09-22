import React from "react";
import Image from "next/image"; // Import Image from next/image

// Type for Image Props (each image in the gallery)
type ImageProps = {
  src: string;
  alt: string;
};

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: string;
  images?: ImageProps[];
}

const Card: React.FC<CardProps> = ({ title, children, icon, images = [] }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          {icon && <span className="card-icon">{icon}</span>}
          <span className="title-text">{title}</span>
        </div>
        <div className="card-body">{children}</div>
      </div>

      {/* Image Gallery Section */}
      {images.length > 0 && (
        <div className="image-gallery">
          {images.slice(0, 8).map((img, index) => (
            <div key={index} className="image-container">
              <Image
                src={img.src}
                alt={img.alt || `Card image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="gallery-image"
                onError={(e) => {
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) {
                    (fallback as HTMLElement).style.display = "flex";
                  }
                }}
              />
              <div className="image-fallback">
                Image {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CSS Styles */}
      <style jsx>{`
        .card {
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          overflow: hidden;
          background: var(--bgElev);
        }

        .card-header {
          padding: 1.1rem;
        }

        .card-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .card-icon {
          font-size: 1.25rem;
        }

        .title-text {
          font-weight: 600;
        }

        .card-body {
          margin-top: 0.5rem;
        }

        .image-gallery {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid var(--border);
        }

        .image-container {
          position: relative;
          padding-bottom: 100%; /* Creates a square container */
          overflow: hidden;
          background: var(--bgElev);
        }

        .gallery-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-fallback {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--bgElev);
          border: 1px solid var(--border);
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--muted);
          font-size: 0.8rem;
          text-align: center;
          padding: 0.5rem;
        }

        /* Mobile adjustments */
        @media (max-width: 767px) {
          .image-gallery {
            grid-template-columns: repeat(2, 1fr);
          }

          .image-container:nth-child(n + 5) {
            display: none; /* Hide extra images */
          }
        }

        /* Tablet adjustments */
        @media (min-width: 480px) and (max-width: 767px) {
          .image-gallery {
            grid-template-columns: repeat(3, 1fr);
          }

          .image-container:nth-child(n + 7) {
            display: none; /* Hide extra images */
          }
        }
      `}</style>
    </div>
  );
};

export default Card;
