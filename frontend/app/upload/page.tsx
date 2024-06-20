'use client';

import { Button, Image } from '@nextui-org/react';
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = () => {
    if (inputFileRef.current?.files && inputFileRef.current.files.length > 0) {
      setFileName(inputFileRef.current.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error('No file selected');
    }

    const file = inputFileRef.current.files[0];

    const newBlob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: '/api/upload',
      multipart: true,
      contentType: file.type,
    });
    setBlob(newBlob);
  };

  return (
    <div
      className='relative w-screen h-screen bg-cover bg-center bg-black bg-opacity-50'
      style={{
        backgroundImage:
          "url('https://e0.pxfuel.com/wallpapers/724/281/desktop-wallpaper-get-amazon-prime-video-for-windows-amazon.jpg')",
      }}
    >
      <div className='bg-gradient-to-r from-black via-slate-900 bg-opacity-50 w-full h-full'>
        <header className='flex flex-row justify-between items-center z-10 h-12 w-full bg-cyan-600 px-64'>
          <Link href='/' className='text-slate-50 text-2xl'>
            prime video
          </Link>
          <div className='flex flex-row space-x-4 text-lg'>
            <Link href='/stream' className='text-slate-200'>
              Stream
            </Link>
            <Link href='/upload' className='text-slate-200'>
              Upload
            </Link>
          </div>
        </header>
        <main className='relative p-12 flex flex-col justify-between h-4/5 z-10'>
          <div>
            <h1 className='text-4xl font-bold'>Upload Videos your own videos</h1>
            <p className='w-3/5 my-6'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum
            </p>
            <p className='w-3/5 my-4'>
              using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
              Content here, content here, making it look like readable English. Many desktop publishing packages and web
              page editors now use Lorem Ip
            </p>
          </div>
          <div>
            <form onSubmit={handleUpload} className='flex flex-col w-1/5'>
              <label
                htmlFor='file-upload'
                className='relative cursor-pointer bg-gray-900 py-2 px-4 rounded-lg border border-gray-300'
              >
                <span className='text-lg'>Choose a file</span>
                <input
                  id='file-upload'
                  name='file'
                  ref={inputFileRef}
                  type='file'
                  className='hidden'
                  required
                  onChange={handleFileChange}
                />
              </label>
              {fileName && <p className='mt-2 text-lg text-gray-400'>{fileName}</p>}
              <Button
                className='mt-4 bg-cyan-600 text-white rounded-lg py-2 px-4 hover:bg-cyan-700'
                size='lg'
                type='submit'
              >
                Upload
              </Button>
            </form>
            {blob && (
              <div className='mt-4'>
                Blob URL:{' '}
                <a href={blob.url} className='text-blue-600'>
                  {blob.url}
                </a>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
