"use client";
import Image from 'next/image';  // إضافة هذه السطر لاستيراد مكون Image
import paws from '../../images/paws.webp';

interface HomeProps {
  userData: {
    id: number;
    username: string;
    points: number;
  };
}

export default function Home({ userData }: HomeProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {userData.username}!</h1>
      <div className="mt-4">
        <p className="text-lg">
          <strong>Points:</strong> {userData.points}
        </p>
        <Image src={paws} alt="Paws" width={500} height={500} />
        <p className="text-lg">
        </p>
      </div>
    </div>
  );
}



