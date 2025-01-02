'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'
import Image from 'next/inco'

// Define the interface for user data
interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData)
    }
  }, [])

  return (
    <main style={{ padding: '16px', backgroundColor: 'black', color: 'blue' }}>
      {userData ? (
        <>
          <h1 className="text-2xl font-bold mb-4">free style bot</h1>
          <ul>
            <li>hello: {userData.username}</li>
          </ul>
                       <Image
                        src={IMG_20241225_130553 (2)}
                        alt="IMG_20241225_130553 (2)"
                        width={18}
                        height={18}
                    />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  )
}
