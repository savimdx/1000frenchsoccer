import heroPackImg from '../assets/images/hero_pack.webp';
import sample1Img from '../assets/images/sample_1.webp';
import sample2Img from '../assets/images/sample_2.webp';
import sample3Img from '../assets/images/sample_3.webp';
import sample4Img from '../assets/images/sample_4.webp';
import sample5Img from '../assets/images/sample_5.webp';
import bonoNeymarImg from '../assets/images/bono_neymar.webp';
import bonoMourinhoImg from '../assets/images/bono_mourinho.webp';
import bonoGuardiolaImg from '../assets/images/bono_guardiola.webp';
import bonoZidaneImg from '../assets/images/bono_zidane.webp';
import bono250FichesImg from '../assets/images/bono_250_fiches.webp';
import bono50PhysiqueImg from '../assets/images/bono_50_physique.webp';
import bono100VitesseImg from '../assets/images/bono_100_vitesse.webp';
import bonoGardiensImg from '../assets/images/bono_gardiens.webp';
import bonoPetitMaterielImg from '../assets/images/bono_petit_materiel.webp';
import bonoVideosFootballImg from '../assets/images/bono_videos_football.webp';
import bonoPrepPhysiqueImg from '../assets/images/bono_prep_physique.webp';
import authorImg from '../assets/images/author.webp';
import { loadedImageGlobalCache } from '../components/OptimizedImage';

// Persistent in-memory cache to prevent re-fetching and ensure instant paint
const imageMemoryCache = new Map<string, HTMLImageElement>();

export const PRIORITY_IMAGES = [
  heroPackImg,
  '/images/hero_pack.webp',
  bonoZidaneImg,
  '/images/bono_zidane.webp',
  sample1Img,
  sample2Img,
  bonoNeymarImg,
  '/images/sample_1.webp',
  '/images/bono_neymar.webp'
];

export const SECONDARY_IMAGES = [
  sample3Img,
  sample4Img,
  sample5Img,
  bonoMourinhoImg,
  bonoGuardiolaImg,
  bono250FichesImg,
  bono50PhysiqueImg,
  bono100VitesseImg,
  bonoGardiensImg,
  bonoPetitMaterielImg,
  bonoVideosFootballImg,
  bonoPrepPhysiqueImg,
  authorImg,
  '/images/sample_2.webp',
  '/images/sample_3.webp',
  '/images/sample_4.webp',
  '/images/sample_5.webp',
  '/images/bono_mourinho.webp',
  '/images/bono_guardiola.webp',
  '/images/bono_250_fiches.webp',
  '/images/bono_50_physique.webp',
  '/images/bono_100_vitesse.webp',
  '/images/bono_gardiens.webp',
  '/images/bono_petit_materiel.webp',
  '/images/bono_videos_football.webp',
  '/images/bono_prep_physique.webp',
  '/images/testimonial_1.webp',
  '/images/testimonial_2.webp',
  '/images/testimonial_3.webp',
  '/images/author.webp'
];

export const LOCAL_APP_IMAGES = [...PRIORITY_IMAGES, ...SECONDARY_IMAGES];

/**
 * Returns prioritized lists of application images
 */
export function getAllApplicationImages(): { priorityImages: string[]; secondaryImages: string[] } {
  return {
    priorityImages: PRIORITY_IMAGES,
    secondaryImages: SECONDARY_IMAGES
  };
}

/**
 * Preload and hardware-decode an image into browser memory
 */
export function preloadImage(src: string): Promise<void> {
  if (!src || typeof window === 'undefined') return Promise.resolve();
  
  if (imageMemoryCache.has(src) || loadedImageGlobalCache.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.decoding = 'async';
      
      const onDone = () => {
        loadedImageGlobalCache.add(src);
        if ('decode' in img && typeof img.decode === 'function') {
          img.decode().then(() => resolve()).catch(() => resolve());
        } else {
          resolve();
        }
      };

      img.onload = onDone;
      img.onerror = () => resolve();
      img.src = src;
      imageMemoryCache.set(src, img);

      if (img.complete && img.naturalWidth > 0) {
        onDone();
      }
    } catch (e) {
      resolve();
    }
  });
}

/**
 * Initializes ultra-fast non-blocking background preloading
 */
export function initSpeedOptimizer(): void {
  if (typeof window === 'undefined') return;

  try {
    const { priorityImages, secondaryImages } = getAllApplicationImages();

    // 1. Immediately preload critical visible assets in parallel
    priorityImages.forEach(src => {
      preloadImage(src);
    });

    // 2. Preload remaining assets during idle browser cycles
    const loadSecondary = () => {
      let idx = 0;
      const batchSize = 3;
      const loadNextBatch = () => {
        if (idx >= secondaryImages.length) return;
        const batch = secondaryImages.slice(idx, idx + batchSize);
        idx += batchSize;
        Promise.all(batch.map(src => preloadImage(src))).then(() => {
          if (idx < secondaryImages.length) {
            if ('requestIdleCallback' in window) {
              (window as any).requestIdleCallback(loadNextBatch, { timeout: 400 });
            } else {
              setTimeout(loadNextBatch, 50);
            }
          }
        });
      };
      loadNextBatch();
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadSecondary, { timeout: 500 });
    } else {
      setTimeout(loadSecondary, 100);
    }
  } catch (err) {
    // Fail gracefully
  }
}

