import Link from "next/link"
import { ModeToggle } from "./theme-toggle-button"
import { buttonVariants } from "./button"

function Navbar() {
    return <>
        <nav className="flex justify-between">
            <Link href="/" className="text-3xl">Reto 2</Link>
            <div className="flex gap-x-2 items-center ">
                <Link href='/new' className={buttonVariants({variant:'secondary'})}>Crear Proyecto</Link>
                <ModeToggle/> 
            </div>
        </nav>
    </>
}

export default Navbar