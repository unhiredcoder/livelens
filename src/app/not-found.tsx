import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gray-100">
      <div className="p-8 bg-white m-3 rounded-md shadow-md flex items-center justify-center flex-col ">
        <Image
          src="/images/404.gif"
          className="rounded-md"
          height={300}
          width={300}
          alt="404 Illustration"
        />
        <p className="text-gray-800 text-xl font-semibold my-4">Oops! Page not found</p>
        <p className="text-gray-600 mb-8">
          The page you are looking for might be under construction or does not exist.
        </p>
        <Button className="flex items-center justify-center text-white py-2 px-4 rounded-full tansition duration-300 ease-in-out">
          <MoveLeft height={15} className="animate-pulse" width={15} />
          &nbsp; &nbsp;
          <Link href="/">Go Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
