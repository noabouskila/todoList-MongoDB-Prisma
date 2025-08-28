'use client'

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {deleteTodo} from "@/app/lib/actions"
import { ToastContainer, toast } from "react-toastify";




export function UpdateTodo({id} : {id:string}) {



  return (
    <Link 
    className="btn btn-update"
    href={`/todos/${id}/edit`} >
        <PencilSquareIcon style={{width :'20px'}}  />
    </Link>
  )
}


export  function DeleteTodo({ id }: { id: string }) {



  // permet de prefixer l'argument id sans creer une fonction
  //   const deleteTodoWithid = deleteTodo.bind(null, id);

  // ou avantage de la fonction flechée :exécutée lorsque le formulaire est soumis.




  const handleClick = async()=>{
   const confirmDelete =  window.confirm('etes vous sur de vouloir supprimer cette tache ?')

   if(confirmDelete){
        const response = await deleteTodo(id)
        if(response.message === 'succes'){
            toast.success("la tache à été supprimée avec succes")
        }else if (response.message === "error") {
            toast.error('Echec de la création de la tâche')
        }
   }



  }


  return (
    // <form action={() => deleteTodo(id)}>
    //   <button className="btn btn-delete">
    //     <TrashIcon style={{ width: "20px" }} />
    //   </button>
    // </form>

    <>
        <ToastContainer
            position="top-center"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />

        <button onClick={handleClick} className="btn btn-delete">
            <TrashIcon style={{ width: "20px" }} />
        </button>
    </>
  );
}
  
