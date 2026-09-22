import React, { useState, useEffect, useRef } from 'react';
import { BookOpen } from 'lucide-react';

// Global cache tracking URLs that are already confirmed loaded and decoded in memory
export const loadedImageGlobalCache = new Set<string>();

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
  fetchPriority?: 'high' | 'low' | 'auto';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  width?: number | string;
  height?: number | string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  fallbackIcon,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  referrerPolicy = 'no-referrer',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(() => loadedImageGlobalCache.has(src));
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setTriedFallback(false);
    setHasError(false);
    if (loadedImageGlobalCache.has(src)) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      loadedImageGlobalCache.add(currentSrc);
      setIsLoaded(true);
    }
  }, [currentSrc]);

  const handleError = () => {
    if (fallbackSrc && !triedFallback && currentSrc !== fallbackSrc) {
      setTriedFallback(true);
      setCurrentSrc(fallbackSrc);
      setIsLoaded(loadedImageGlobalCache.has(fallbackSrc));
    } else {
      setHasError(true);
    }
  };

  const handleLoad = () => {
    loadedImageGlobalCache.add(currentSrc);
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div className={`w-full h-full min-h-[140px] flex flex-col items-center justify-center p-4 bg-slate-100/80 text-slate-400 rounded-xl ${className}`}>
        {fallbackIcon || <BookOpen className="w-8 h-8 opacity-40 mb-1" />}
        <span className="text-[11px] text-slate-400 font-medium text-center line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding={decoding}
      // @ts-ignore
      fetchPriority={fetchPriority}
      referrerPolicy={referrerPolicy}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-95'} transition-opacity duration-150`}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

export default OptimizedImage;
