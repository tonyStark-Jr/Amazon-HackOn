import React from 'react';
import { Card, CardFooter, Image } from '@nextui-org/react';
import { list } from '@vercel/blob';
import Link from 'next/link';

export default async function CardComponent() {
  const { blobs } = await list({ mode: 'expanded', prefix: 'videos' });

  return (
    <div className='flex flex-wrap gap-6'>
      {blobs &&
        blobs.map(({ pathname, url, size, uploadedAt}) => (
          <Card key={pathname} isFooterBlurred radius='lg' className='border-none w-52 h-52 flex justify-center'>
            <Image
              alt={pathname}
              className='object-cover'
              height={250}
              src='https://nextui.org/images/hero-card.jpeg'
              width={250}
            />

            <CardFooter className='justify-center bg-cyan-600 ml-1 overflow-hidden absolute rounded-xl bottom-1 h-10  w-[calc(100%_-_8px)] z-10 cursor-pointer'>
              <Link
                href={{
                  pathname: '/stream',
                  query: {
                    url: url,
                    pathname: pathname,
                    size: size,
                    uploadedAt: uploadedAt.toISOString(),
                  },
                }}
              >
                <p className='text-tiny text-white'>Watch Now</p>
              </Link>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
