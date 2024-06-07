'use client'
import Link from "next/link"
import { ModeToggle } from "./theme-toggle-button"
import { Button, buttonVariants } from "./button"
import { signIn, signOut, useSession } from 'next-auth/react'

function Navbar() {

    const { data: session } = useSession()
    return <>
        <nav className="flex justify-between items-center py-3 px-1 ">
            <Link href="/" className="text-3xl">Taller 2 - SGPA</Link>


            <div className="flex gap-x-2 items-center">
                {session?.user ? (<>
                    <Link href='/new' className={buttonVariants({ variant: 'secondary' })}>Crear Proyecto</Link>
                    <p>{session.user.name}</p>
                    <Button className={buttonVariants({ variant: 'secondary' })} onClick={async () => {
                        await signOut({ callbackUrl: '/' })
                    }
                    }>Cerrar sesión</Button>
                </>
                ) : (<Button className={buttonVariants({ variant: 'secondary' })} onClick={() => signIn()}>Iniciar sesión</Button>)}
                <ModeToggle />
            </div>
        </nav>
    </>
}

export default Navbar