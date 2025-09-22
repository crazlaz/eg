import React from "react";

export default function Quote({
  children,
  name,
  city,
}: {
  children: React.ReactNode;
  name: string;
  city: string;
}) {
  return (
    <div className="quote-card">
      <div className="stars">
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
      </div>

      <blockquote className="quote-text">
        &ldquo;{children}&rdquo;
      </blockquote>

      <div className="attribution">
        <span className="name">— {name}</span>
        <span className="city">{city}</span>
      </div>

      <style jsx>{`
        .quote-card {
          padding: 1.25rem;
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          background: var(--bgElev);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
          position: relative;
          overflow: hidden;
        }

        .quote-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(128, 128, 128, 0.1);
          border-radius: 0.75rem;
          pointer-events: none;
        }

        .stars {
          display: flex;
          gap: 0.1rem;
          align-items: center;
          position: relative;
          z-index: 1;
          width: fit-content;
          max-width: 100%;
          overflow: hidden;
        }

        .star {
          color: #fbbf24;
          font-size: 0.85rem;
          line-height: 1;
          display: inline-block;
          flex-shrink: 0;
        }

        .quote-text {
          margin: 0;
          font-style: italic;
          color: var(--text);
          font-size: 0.95rem;
          line-height: 1.5;
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
          hyphens: auto;
          max-width: 100%;
          position: relative;
          z-index: 1;
        }

        .attribution {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-top: auto;
          position: relative;
          z-index: 1;
          max-width: 100%;
        }

        .name {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text);
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        .city {
          font-size: 0.8rem;
          color: var(--muted);
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        @media (max-width: 640px) {
          .quote-card {
            padding: 1rem;
          }
          
          .star {
            font-size: 0.8rem;
          }
          
          .quote-text {
            font-size: 0.9rem;
          }
          
          .name {
            font-size: 0.85rem;
          }
          
          .city {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .stars {
            gap: 0.05rem;
          }
          
          .star {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}