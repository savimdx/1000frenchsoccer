import heroFutsalImg from '../assets/images/hero_futsal.webp';
import packMetodologicoImg from '../assets/images/pack_metodologico.webp';
import sample1Img from '../assets/images/sample_1.webp';
import sample2Img from '../assets/images/sample_2.webp';
import sample3Img from '../assets/images/sample_3.webp';
import sample4Img from '../assets/images/sample_4.webp';
import sample5Img from '../assets/images/sample_5.webp';
import bono1Img from '../assets/images/bono_1.webp';
import bono2Img from '../assets/images/bono_2.webp';
import bono3Img from '../assets/images/bono_3.webp';
import bono4Img from '../assets/images/bono_4.webp';
import bono5Img from '../assets/images/bono_5.webp';
import bono6Img from '../assets/images/bono_6.webp';
import bono7Img from '../assets/images/bono_7.webp';
import bono8Img from '../assets/images/bono_8.webp';
import bono9Img from '../assets/images/bono_9.webp';
import bono10Img from '../assets/images/bono_10.webp';
import bonoNeymarImg from '../assets/images/bono_neymar.webp';
import bonoMourinhoImg from '../assets/images/bono_mourinho.webp';
import bonoGuardiolaImg from '../assets/images/bono_guardiola.webp';
import bonoZidaneImg from '../assets/images/bono_zidane.webp';
import ejerciciosAdicionalesImg from '../assets/images/ejercicios_adicionales_futsal_1783515557260.webp';

// Persistent in-memory cache to prevent re-fetching and ensure instant paint
const imageMemoryCache = new Map<string, HTMLImageElement>();

export const LOCAL_APP_IMAGES = [
  heroFutsalImg,
  packMetodologicoImg,
  sample1Img,
  sample2Img,
  sample3Img,
  sample4Img,
  sample5Img,
  bono1Img,
  bono2Img,
  bono3Img,
  bono4Img,
  bono5Img,
  bono6Img,
  bono7Img,
  bono8Img,
  bono9Img,
  bono10Img,
  bonoNeymarImg,
  bonoMourinhoImg,
  bonoGuardiolaImg,
  bonoZidaneImg,
  ejerciciosAdicionalesImg,
  '/images/hero_futsal.webp',
  '/images/pack_metodologico.webp',
  '/images/sample_1.webp',
  '/images/sample_2.webp',
  '/images/sample_3.webp',
  '/images/sample_4.webp',
  '/images/sample_5.webp',
  '/images/bono_1.webp',
  '/images/bono_2.webp',
  '/images/bono_3.webp',
  '/images/bono_4.webp',
  '/images/bono_5.webp',
  '/images/bono_6.webp',
  '/images/bono_7.webp',
  '/images/bono_8.webp',
  '/images/bono_9.webp',
  '/images/bono_10.webp',
  '/images/bono_videos_football.webp',
  '/images/bono_neymar.webp',
  '/images/bono_mourinho.webp',
  '/images/bono_guardiola.webp',
  '/images/bono_zidane.webp',
  '/images/ejercicios_adicionales_futsal_1783515557260.webp'
];

/**
 * Returns prioritized lists of local WebP application images
 */
export function getAllApplicationImages(): { priorityImages: string[]; secondaryImages: string[] } {
  const priorityImages: string[] = [
    heroFutsalImg,
    packMetodologicoImg,
    sample1Img,
    sample2Img,
    sample3Img,
    sample4Img,
    '/images/hero_futsal.webp',
    '/images/pack_metodologico.webp'
  ];

  const secondaryImages: string[] = [
    bono1Img,
    bono2Img,
    bono3Img,
    bono4Img,
    bono5Img,
    bono6Img,
    bono7Img,
    bono8Img,
    bono9Img,
    bono10Img,
    ejerciciosAdicionalesImg
  ];

  return {
    priorityImages,
    secondaryImages
  };
}

/**
 * Preload and hardware-decode an image into browser memory
 */
export function preloadImage(src: string): Promise<void> {
  if (!src || typeof window === 'undefined') return Promise.resolve();
  
  if (imageMemoryCache.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.decoding = 'async';
      
      const onDone = () => {
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

      if (img.complete) {
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

    // 1. Immediately preload critical visible assets
    priorityImages.forEach(src => {
      preloadImage(src);
    });

    // 2. Preload remaining local webp assets during idle browser cycles
    const loadSecondary = () => {
      secondaryImages.forEach(src => {
        preloadImage(src);
      });
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadSecondary, { timeout: 1000 });
    } else {
      setTimeout(loadSecondary, 200);
    }
  } catch (err) {
    // Fail gracefully
  }
}
