"use client";

import React, { useRef } from 'react';
import Video from 'next-video';
import movie from '@/videos/file_example_MP4_1280_10MG.mp4';


export default function StreamPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const frameSend = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      console.log(canvas.width, canvas.height);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = canvas.toDataURL('image/jpeg');
        console.log(frame);
      }
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Video
        ref={videoRef}
        controls
        src={movie}
        onPause={frameSend}
      />
    </main>
  );
}
