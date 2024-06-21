'use client';

import React, { useRef, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { ScrollShadow, Card, CardHeader, CardBody, Image, Link } from '@nextui-org/react';
import items from '@/data/items.json';
import { useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { Maximize, Minimize, PauseCircleIcon, PlayCircleIcon, UploadCloudIcon, VolumeXIcon } from 'lucide-react';

interface ClientToServerEvents {
  send_data: (data: { data: string }) => void;
}

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const socket = useRef<Socket<ClientToServerEvents> | null>(null);
  // const [items, setItems] = useState(null);

  const searchParams = useSearchParams();
  let url = searchParams.get('url');

  const frameSend = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = canvas.toDataURL('image/jpeg');
        socket.current?.emit('send_data', { data: frame });
      }
    }
  };

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      transports: ['websocket'],
    });

    socket.current?.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.current?.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // socket.current?.on('data_processed', (data) => {
    //   setItems(data);
    // });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [played, setPlayed] = useState<boolean>(false);
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setPlayed(true);
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const toggleMuteUnmute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (video) {
      video.requestFullscreen();
    }
  };

  const [progress, setProgress] = useState<number>(0);
  const handleProgress = () => {
    const video = videoRef.current;
    if (video) {
      const value = (video.currentTime / video.duration) * 100;
      setProgress(value);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      const newTime = video.duration * (Number(event.target.value) / 100);
      video.currentTime = newTime;
      setProgress(newTime / video.duration);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleProgress);
    }
    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleProgress);
      }
    };
  }, [isPlaying]);

  return (
    <>
      <header className='flex flex-row justify-between items-center z-10 h-12 w-full bg-cyan-600 px-64'>
        <Link href='/' className='text-slate-50 text-2xl'>
          prime video
        </Link>
        <div className='flex flex-row space-x-4 text-lg'>
          <Button as={'a'} href='/upload' variant='light' className='text-slate-200'>
            Upload <UploadCloudIcon size={24} />
          </Button>
        </div>
      </header>
      <main className='flex w-full h-svh items-center justify-center bg-black'>
        {url && (
          <div className='w-11/12 h-[95%]'>
            <div className='absolute z-10 w-[91.75%] h-[85.5%] rounded-xl border-white-500 shadow-lg shadow-yellow-50 border-3'>
              <div
                className={`hover:opacity-100 transition-opacity duration-750 ${isPlaying ? 'opacity-0' : 'opacity-100'} h-full w-full`}
              >
                <h2 className='font-bold text-lg pl-4 pt-4'>{url.split('/').pop()?.split('-')?.[0]}</h2>
                {isPlaying ?
                  <PauseCircleIcon
                    absoluteStrokeWidth
                    onClick={togglePlayPause}
                    className='hover:bg-black hover:bg-opacity-50 rounded-full p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-white cursor-pointer'
                  />
                : <PlayCircleIcon
                    absoluteStrokeWidth
                    onClick={togglePlayPause}
                    className='hover:bg-black hover:bg-opacity-50 rounded-full p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-white cursor-pointer'
                  />
                }
                {isMuted ?
                  <VolumeXIcon
                    absoluteStrokeWidth
                    onClick={toggleMuteUnmute}
                    className='absolute bottom-8 right-24 hover:bg-black hover:bg-opacity-50 rounded-full p-2 h-9 w-9 cursor-pointer'
                  />
                : <VolumeXIcon
                    absoluteStrokeWidth
                    onClick={toggleMuteUnmute}
                    className='absolute bottom-8 right-24 hover:bg-black hover:bg-opacity-50 rounded-full p-2 h-9 w-9 cursor-pointer'
                  />
                }
                <Maximize
                  absoluteStrokeWidth
                  onClick={toggleFullScreen}
                  className='absolute bottom-8 right-10 hover:bg-black hover:bg-opacity-50 rounded-full p-2 h-9 w-9 cursor-pointer'
                />
                {played && !isPlaying && (
                  <div className='bg-gradient-to-r float-end w-1/5 from-black to-transparent absolute rounded-xl h-full'>
                    <ScrollShadow className='h-full float-end pl-2 pt-2' hideScrollBar>
                      <h2 className='text-xl font-bold'>Product Results</h2>
                      {items ?
                        items.map((item, index) => (
                          <Link key={index} href={item.purchase_link} className='py-2 w-full'>
                            <Card className='py-2 bg-white'>
                              <CardHeader className='pb-0 pt-0 px-4 flex-col items-start'>
                                <h4 className='font-bold text-large text-black'>{item.name}</h4>
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
                          </Link>
                        ))
                      : <p>No items found</p>}
                    </ScrollShadow>
                  </div>
                )}
                <div className='absolute bottom-0 left-0 w-full h-8 rounded-xl bg-gradient-to-t from-black to-transparent' />
                <input
                  type='range'
                  min={0}
                  max={100}
                  onChange={handleSeek}
                  value={progress}
                  className='absolute bottom-2 left-0 w-full p-4 h-1.5'
                />
              </div>
            </div>
            <video
              crossOrigin='anonymous'
              ref={videoRef}
              autoFocus
              // onPause={frameSend}
              className='w-full h-[90%] object-cover rounded-xl'
            >
              <source src={url} type={`video/${url.split('.').pop()}`} />
            </video>
          </div>
        )}
      </main>
    </>
  );
}
