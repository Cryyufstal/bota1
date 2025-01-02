'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'

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
          <img src="../inco/IMG_20241225_130553 (2).png" alt="User Pic" style={{ width: '150px', height: '150px', marginTop: '16px' }} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  )
}
