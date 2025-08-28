import EditTodo from "@/app/ui/editForm"
import {getTodoById} from "@/app/lib/data"



export default async function EditPage({params} : {params : { id: string}}){

    // recuperer l'id de la page
    const {id} =  await params


    const todo = await getTodoById(id);

    if(!todo ){
        return <p>pas de taches a afficher</p>
    }


    return <EditTodo todo={todo} />;

}