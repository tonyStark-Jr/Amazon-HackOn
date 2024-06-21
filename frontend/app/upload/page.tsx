'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { Upload, message } from 'antd';
import { UploadCloudIcon } from 'lucide-react';
import Link from 'next/link';
import { upload } from '@vercel/blob/client';
import type { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';
import type { PutBlobResult } from '@vercel/blob';

export default function AvatarUploadPage() {
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const handleFileChange = async (info: UploadChangeParam<UploadFile>) => {
    const { file } = info;

    if (file.status === 'done') {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as File);
      }

      try {
        const newBlob = await upload(file.name, file.originFileObj as File, {
          access: 'public',
          handleUploadUrl: '/api/upload',
          multipart: true,
          contentType: file.type,
        });
        setBlob(newBlob);
        message.success('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
        message.error('Failed to upload file');
      }
    }
  };

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  return (
    <div
      className='relative w-screen h-screen bg-cover bg-center bg-black bg-opacity-50'
      style={{
        backgroundImage:
          "url('https://e0.pxfuel.com/wallpapers/724/281/desktop-wallpaper-get-amazon-prime-video-for-windows-amazon.jpg')",
      }}
    >
      <div className='bg-gradient-to-r from-black via-slate-900 bg-opacity-50 w-full h-full'>
        <header className='flex justify-between items-center z-10 h-12 w-full bg-cyan-600 px-64'>
          <Link href='/' className='text-white text-2xl'>
            prime video
          </Link>
          <div className='flex space-x-4'>
            <Button as='a' href='/upload' variant='light' style={{ color: 'white' }}>
              Upload <UploadCloudIcon size={24} />
            </Button>
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
            <Upload
              className='text-white flex flex-col'
              listType='picture-card'
              onChange={handleFileChange}
              showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
            >
              <div className='flex flex-col justify-center'>
                <UploadCloudIcon />
                <div className='text-sm'>
                  Click or drag
                  <br /> file to upload
                </div>
              </div>
            </Upload>
            {blob && (
              <div className='mt-4'>
                <Link
                  href={{
                    pathname: '/stream',
                    query: {
                      url: blob.url,
                      pathname: blob.pathname,
                    },
                  }}
                >
                  <Button className='w-[12%] h-12 bg-cyan-600'>Watch Now</Button>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
