
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();


export  async function GET(request: Request) {


  const todos = await prisma.todo.findMany()
  return NextResponse.json(todos, { status: 200 });

}
