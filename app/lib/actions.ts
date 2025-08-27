"use server";

import  prisma  from '@/app/db';
import{z} from 'zod'

type State = {
  message: string;
  error?: string; // facultatif
};

export async function createTodo(
  prevState: State,
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
    await prisma.todo.create({
      data: {
        title: data.title,
        date: data.date,
      },
    });

    return { message: "success" };

  } catch (error) {
    return { message: "error", error: String(error) };
  }
}
