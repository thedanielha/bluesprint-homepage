"use client";

import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function VideoPlayer({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);

      return () => {
        hls.destroy(); // 메모리 누수 방지
      };
    } else if (video.canPlayType(url)) {
      // 👉 Safari 대응
      video.src = url;
    }
  }, [url]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      controls
      playsInline
      className="w-full rounded-xl shadow"
    />
  );
}
