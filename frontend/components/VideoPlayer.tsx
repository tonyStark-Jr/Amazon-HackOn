'use client';

import React, { useRef, useEffect, useState } from 'react';
import video from '@/videos/369-136082525_tiny.mp4.json';
import io, { Socket } from 'socket.io-client';
import { ScrollShadow, Card, CardHeader, CardBody, Image, Link } from '@nextui-org/react';
import items from '@/data/items.json';

interface ClientToServerEvents {
  send_data: (data: { data: string }) => void;
}

export default function StreamPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const socket = useRef<Socket<ClientToServerEvents> | null>(null);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const frameSend = () => {
    setIsVisible(true);
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
        // socket.current?.emit('send_data', { data: frame });
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
    <main className='flex w-full h-svh items-center justify-center'>
      {video.sources && (
        <div className='w-11/12' style={{ height: '95%' }}>
          <video
            crossOrigin='anonymous'
            controls
            ref={videoRef}
            onPause={frameSend}
            className='w-full h-full object-cover'
          >
            <source src={video.sources[0].src} type={video.sources[0].type} />
          </video>
        </div>
      )}
      {isVisible && (
        <div
          id='overlay'
          className='fixed inset-0 flex justify-end px-10 py-6 bg-black bg-opacity-60 z-2147483647;'
          onClick={() => setIsVisible(false)}
        >
          <ScrollShadow className='w-1/5 h-[700px]' hideScrollBar>
            {items &&
              items.map((item, index) => (
                <Link key={index} href={item.purchase_link} className='py-2 width-full'>
                  <a className='block' target='_blank' rel='noopener noreferrer'>
                    <Card className='py-2'>
                      <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                        <h4 className='font-bold text-large'>{item.name}</h4>
                      </CardHeader>
                      <CardBody className='overflow-visible py-2'>
                        <Image
                          alt='Card background'
                          className='object-cover rounded-xl'
                          src={item.image_link}
                          width={270}
                        />
                      </CardBody>
                    </Card>
                  </a>
                </Link>
              ))}
          </ScrollShadow>
        </div>
      )}
    </main>
  );
}
