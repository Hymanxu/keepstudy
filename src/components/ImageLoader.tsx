import React from 'react';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

export default ImageLoader;