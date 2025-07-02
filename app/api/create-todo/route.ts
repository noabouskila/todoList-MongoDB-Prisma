import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


const prisma = new PrismaClient()

export async function POST(request : Request){

    try {

        // recuperation données depuis le fetch de page
        const body =  await request.json()

        //  console.log(body)
        const {title , date} =body


        // enregistrement en bdd avec prisma 
        //  enregistrer dans le model todo quon a cree
        const post = await prisma.todo.create({
            data : {
                title ,
                date
            }
        })


        // reponse
        return NextResponse.json(post , {status : 201})

    } catch (error) {
        console.error("Erreur lors de la création du todo :", error)
        return NextResponse.json({error : "Erreur lors de la création du todo"} , {status : 500})
    }
   
   

}