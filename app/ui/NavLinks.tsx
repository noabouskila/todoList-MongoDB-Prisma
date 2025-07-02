'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function NavLinks() {

    const pathname = usePathname()
    const navLink = pathname.startsWith('/create-todo') ? 
    <Link  className="link" href={'/todos'}>Mes Taches </Link> : 
    <Link  className="link" href={'/create-todo'}>Créer une Tache </Link> 

  return  navLink ;
}
