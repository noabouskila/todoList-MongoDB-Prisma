import Link from "next/link";
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

export default function Logo() {
  return (
    <div className="logo-container">

        <Link className="logo" href={'/'}> 
            <ClipboardDocumentListIcon  style={{width : '60px'}}/>
            My Todo 
        </Link>

    </div>

    
  )
}
