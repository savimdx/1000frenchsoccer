import React, { useEffect } from 'react';

interface WistiaPlayerProps {
  mediaId?: string;
  aspect?: string | number;
  className?: string;
}

export const WistiaPlayer: React.FC<WistiaPlayerProps> = ({
  mediaId = 'kacx67wxce',
  aspect = '0.5625',
  className = ''
}) => {
  useEffect(() => {
    // Dynamically ensure Wistia scripts are loaded
    const script1Id = 'wistia-player-core-js';
    if (!document.getElementById(script1Id)) {
      const s1 = document.createElement('script');
      s1.id = script1Id;
      s1.src = 'https://fast.wistia.com/player.js';
      s1.async = true;
      document.head.appendChild(s1);
    }

    const script2Id = `wistia-embed-${mediaId}-js`;
    if (!document.getElementById(script2Id)) {
      const s2 = document.createElement('script');
      s2.id = script2Id;
      s2.src = `https://fast.wistia.com/embed/${mediaId}.js`;
      s2.async = true;
      s2.type = 'module';
      document.head.appendChild(s2);
    }
  }, [mediaId]);

  return (
    <div className={`w-full max-w-[320px] sm:max-w-[360px] md:max-w-[390px] mx-auto ${className}`}>
      <style>{`
        wistia-player[media-id='${mediaId}']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 177.78%;
        }
      `}</style>
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.18)] border-2 border-slate-800/10 bg-slate-950 aspect-[9/16] transition-transform duration-300">
        {React.createElement('wistia-player', {
          'media-id': mediaId,
          aspect: aspect,
          style: { width: '100%', height: '100%', display: 'block' }
        })}
      </div>
    </div>
  );
};

export default WistiaPlayer;

