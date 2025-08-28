import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/db";


type Todo = {
  id: string;
  title: string;
  date: string;
};

export async function getTodos(){

    noStore()

    try {

        const todos = await prisma.todo.findMany({ orderBy : {date : 'asc'}})
        return todos
        
    } catch (error) {
        console.error(error);
        throw new Error("Echec de récupération des todos ")
    }


}



export async function getTodoById(id: string){


    noStore();

    try {
      const todos  = await prisma.todo.findMany();
      const todoWithId = todos.find((todo: Todo) => todo.id === id)


      return todoWithId;
    } catch (error) {
      console.error(error);
      throw new Error("Echec de récupération de la  todo ");
    }


}