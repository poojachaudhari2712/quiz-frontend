import { useEffect, useRef } from 'react';
 
export default function FullscreenProctor({ onExit }) {
  const initialCheckDone = useRef(false);
 
  const isFullscreen = () => {
    return document.fullscreenElement ||
           document.webkitFullscreenElement ||
           document.mozFullScreenElement ||
           document.msFullscreenElement;
  };
 
  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  };
 
  const handleFullscreenChange = () => {
 
    setTimeout(() => {
      const fullscreenNow = isFullscreen();
      if (!fullscreenNow && initialCheckDone.current) {
        alert('You exited fullscreen. The quiz will now end.');
        onExit();
      } else if (fullscreenNow && !initialCheckDone.current) {
        initialCheckDone.current = true;
      }
    }, 200);
  };
 
  useEffect(() => {
    enterFullscreen();
 
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
 
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);
 
  return null;
}
 