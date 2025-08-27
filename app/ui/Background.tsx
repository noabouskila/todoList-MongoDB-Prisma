"use client"
import Image from "next/image"

export default function Background() {


  return (
  
      <Image 
      src="/christmas-background.jpg"
      alt='arrieère plan avec Neige' 
      quality={100}
      fill= {true}
      sizes="100vw" // toute la largeur 
      style={{
          objectFit : 'cover' ,
          zIndex  : -5,
      }}
      priority={false}  // A Verifier car ca fait un warning dans la console
      
      />
    
  )
}
