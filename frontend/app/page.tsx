import Link from 'next/link';
import Card from '../components/CardComponent';

export default function Home() {
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
            <p className='text-4xl font-bold'>Welcome to Prime Video</p>
            <p className='text-lg my-6'>
              Join Prime to watch the latest movies, TV shows and award-winning <br /> Amazon Originals
            </p>
            <div className='mt-12 mb-4 h-12 rounded-xl align-middle px-6 py-2 bg-gradient-to-r w-1/2 from-slate-700 via-slate-900 bg-opacity-50'>
              <p className='text-lg'>Your Uploads</p>
            </div>
            <Card />
          </div>
        </main>
      </div>
    </div>
  );
}
