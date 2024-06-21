'use client'
import { useSession } from "next-auth/react";

function HomePage() {
  const { data: session } = useSession();

  return (
    <div>
      {/* <h2>{session ? JSON.stringify(session) : 'nada'}</h2> */}
    </div>
  )
}

export default HomePage
