import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";


type Params = {
    id : string;
}


const prisma = new PrismaClient();

export async function GET(_request: Request, context: { params: Params }) {

    const { id } = context.params;


    try {
        // recuperation de la todo à partir de l'id
        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })
        // console.log( 'ai je bien recupere mon todo ? ' ,todo)

        return NextResponse.json(todo, {
            status: 200
        });
    }
    catch (error) {
        console.error("Erreur lors de la récupération de la todo :", error);
        return NextResponse.json({ error: "Erreur lors de la récupération de la todo" }, { status: 500 });
    }
        
   
    
}
