"use server";

import  prisma  from '@/app/db';
import { revalidatePath } from 'next/cache';
import{z} from 'zod'

type State = {
  message: string;
  error?: string; // facultatif
};

export async function createTodo(

    // l'etat precedent du formulaire pour mettre a jour le state
    prevState: State,
    //sert à recuperer les donées du formulaire grace a formData.get      
    formData: FormData
) :Promise<State> {

  // validation des données du formulaire avec zod
  const schema = z.object({
    title: z.string().min(1, "Le titre est obligatoire"),
    date: z.string().min(1, "La date est obligatoire"),
  });

  // sert à vérifier que les données du formulaire sont conformes au schéma
  const parse = schema.safeParse({
    title: formData.get("title"),
    date: formData.get("date"),
  });

  if (!parse.success) {
    return { message: "error" };
  }
  // data qu'on insert dans la BDD
  const data = parse.data;


  try {
    // insere dans la bdd la data verifiée evec zod
    await prisma.todo.create({
      data: {
        title: data.title,
        date: data.date,
      },
    });

    // revalidatepath : forces une invalidation de la mise en cache  de la route de redirection 
    revalidatePath('/todos')

    return { message: "success" };
  } catch (error) {
    return { message: "error", error: String(error) };
  }
}




export async function updateTodo(
  // l'etat precedent du formulaire pour mettre a jour le state
  prevState: State,
  //sert à recuperer les donées du formulaire grace a formData.get
  formData: FormData
): Promise<State> {


  // validation des données du formulaire avec zod
  const schema = z.object({
    title: z.string().min(1, "Le titre est obligatoire"),
    date: z.string().min(1, "La date est obligatoire"),
    id: z.string()
  });

  // sert à vérifier que les données du formulaire sont conformes au schéma
  const parse = schema.safeParse({
    title: formData.get("title"),
    date: formData.get("date"),
    id : formData.get('id')
  });

  if (!parse.success) {
    return { message: "error" };
  }
  // data qu'on insert dans la BDD
  const data = parse.data;

  try {
    // insere dans la bdd la data verifiée evec zod
    await prisma.todo.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        date: data.date,
      },
    });

    // revalidatepath : forces une invalidation de la mise en cache  de la route de redirection
    revalidatePath("/todos");

    return { message: "success" };
  } catch (error) {
    return { message: "error", error: String(error) };
  }
}

export async function deleteTodo(id : string){
  try{

    await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/todos");
    return { message: "succes" };

  }catch(error){
    return { message: "error", error: String(error)}

  }
 

}
