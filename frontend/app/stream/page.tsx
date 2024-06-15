"use client";

import React, { useRef } from "react";

export default function StreamPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.play();
      }
      const response = await fetch("http://localhost:5000/toggle_capture");
      if (!response.ok) {
        throw new Error('Failed to start streaming');
      }
    } catch (err) {
      console.log('Error during play:', err);
    }
  };

  const pause = async () => {
    try {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      const response = await fetch("http://localhost:5000/toggle_capture");
      if (!response.ok) {
        throw new Error('Failed to pause streaming');
      }
    } catch (err) {
      console.log('Error during pause:', err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <video controls width="1000" ref={videoRef}>
        <source
          src="http://localhost:5000/video/Panchayat.S03E01.720p.Hindi.WEB-DL.5.1.ESub.x264.Vegamovies.to.mkv"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </main>
  );
}

