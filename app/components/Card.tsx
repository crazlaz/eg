"use client";

import React from "react";
import Image from "next/image";

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
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bgElev)] shadow-sm overflow-hidden transition hover:shadow-md">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="font-semibold text-[var(--fg)]">{title}</h3>
        </div>
        <div className="mt-2 text-sm text-[var(--muted)]">{children}</div>
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border-t border-[var(--border)]">
          {images.slice(0, 8).map((img, index) => (
            <div
              key={index}
              className="relative aspect-square bg-[var(--bg)]"
            >
              <Image
                src={img.src}
                alt={img.alt || `Card image ${index + 1}`}
                fill
                className="object-cover"
                onError={(e) => {
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) {
                    (fallback as HTMLElement).style.display = "flex";
                  }
                }}
              />
              <div className="hidden absolute inset-0 items-center justify-center text-xs text-[var(--muted)] bg-[var(--bgElev)] border border-[var(--border)]">
                Image {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
