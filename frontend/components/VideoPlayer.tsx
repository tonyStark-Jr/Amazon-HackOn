'use client';

import React, { useRef, useEffect, useState } from 'react';
7;
import video from '@/videos/file_example_MP4_1280_10MG.mp4';
import io, { Socket } from 'socket.io-client';
import { ScrollShadow, Card, CardHeader, CardBody, Image } from '@nextui-org/react';

interface ClientToServerEvents {
  send_data: (data: { data: string }) => void;
}

export default function StreamPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const socket = useRef<Socket<ClientToServerEvents> | null>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const frameSend = () => {
    setShowSidebar(true);
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
    <main className='flex flex-row min-h-screen items-center justify-between p-5 space-x-4'>
      {video.sources && (
        <div className={`${showSidebar ? 'w-4/5' : 'w-full'}`}>
          <video
            crossOrigin='anonymous'
            controls
            ref={videoRef}
            onPause={frameSend}
            onPlay={() => {
              setShowSidebar(false);
            }}
            className='w-full'
          >
            <source src={video.sources[0].src} type={video.sources[0].type} />
          </video>
        </div>
      )}
      {showSidebar && (
        <ScrollShadow className='w-1/5 h-[700px]' hideScrollBar>
          <div className='flex flex-col space-y-4'>
            {/* json list objects will be appended here */}
            {/* temp cards */}
            <Card className='py-4'>
              <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                <p className='text-tiny uppercase font-bold'>Daily Mix</p>
                <small className='text-default-500'>12 Tracks</small>
                <h4 className='font-bold text-large'>Frontend Radio</h4>
              </CardHeader>
              <CardBody className='overflow-visible py-2'>
                <Image
                  alt='Card background'
                  className='object-cover rounded-xl'
                  src='https://nextui.org/images/hero-card-complete.jpeg'
                  width={270}
                />
              </CardBody>
            </Card>
            <Card className='py-4'>
              <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                <p className='text-tiny uppercase font-bold'>Daily Mix</p>
                <small className='text-default-500'>12 Tracks</small>
                <h4 className='font-bold text-large'>Frontend Radio</h4>
              </CardHeader>
              <CardBody className='overflow-visible py-2'>
                <Image
                  alt='Card background'
                  className='object-cover rounded-xl'
                  src='https://nextui.org/images/hero-card-complete.jpeg'
                  width={270}
                />
              </CardBody>
            </Card>
            <Card className='py-4'>
              <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                <p className='text-tiny uppercase font-bold'>Daily Mix</p>
                <small className='text-default-500'>12 Tracks</small>
                <h4 className='font-bold text-large'>Frontend Radio</h4>
              </CardHeader>
              <CardBody className='overflow-visible py-2'>
                <Image
                  alt='Card background'
                  className='object-cover rounded-xl'
                  src='https://nextui.org/images/hero-card-complete.jpeg'
                  width={270}
                />
              </CardBody>
            </Card>
            <Card className='py-4'>
              <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                <p className='text-tiny uppercase font-bold'>Daily Mix</p>
                <small className='text-default-500'>12 Tracks</small>
                <h4 className='font-bold text-large'>Frontend Radio</h4>
              </CardHeader>
              <CardBody className='overflow-visible py-2'>
                <Image
                  alt='Card background'
                  className='object-cover rounded-xl'
                  src='https://nextui.org/images/hero-card-complete.jpeg'
                  width={270}
                />
              </CardBody>
            </Card>
          </div>
        </ScrollShadow>
      )}
    </main>
  );
}
