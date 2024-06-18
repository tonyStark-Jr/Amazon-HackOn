'use client';

import React, { useRef, useEffect } from 'react';
import video from '@/videos/file_example_MP4_1280_10MG.mp4';
import io, { Socket } from 'socket.io-client';

interface ClientToServerEvents {
  send_data: (data: { data: string }) => void;
}

export default function StreamPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const socket = useRef<Socket<ClientToServerEvents> | null>(null);

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
        socket.current?.emit('send_data', { data: frame });
      }
    }
  };

  useEffect(() => {
    socket.current = io('http://localhost:5000');

    socket.current.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.current.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {video.sources && (
        <video crossOrigin='anonymous' controls ref={videoRef} onPause={frameSend}>
          <source src={video.sources[0].src} type={video.sources[0].type} />
        </video>
      )}
    </main>
  );
}
