'use client'
import { useState , useEffect} from "react"
import { formatDate } from "../utils/formateDate"
import { TrashIcon , PencilSquareIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';

type Todo = {
  id: string;
  title: string;      
  date: string;
}

export default function Todos() {

  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const router = useRouter()

  // au montage du composant, on recupère les todos depuis l'API
  useEffect(() => {
    
 
    const getTodos = async () => {
      try {
        const response = await fetch('/api/todos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (!response.ok) {
          console.error("Erreur serveur :", response.status)
          throw new Error("Erreur lors du chargement des tâches.")
        }
    
        const data = await response.json()
        // console.log("ma todolist", data)
        setTodos(data)
      } catch (err) {
        console.error("Erreur dans getTodos :", err)
      } finally {
        setIsLoading(false)
      }
    }
    // appel de la fonction pour récupérer les todos 
    getTodos()
  }, [])


  const handleEdit =  async (todo: Todo) => {
    // redirection vers la page d'édition de la todo
    router.push(`/todos/edit?id=${encodeURIComponent(todo.id)}`)
    console.log("jappuie sur modifier" )
  }

  const handleDelete  = async (todo: Todo) => {
     console.log("jappuie sur supprimer" )

    try {
      const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")
      if (!confirmDelete) {
        return; // Si l'utilisateur annule, on ne fait rien
      }
      else{
       const response = await fetch(`/api/delete-todo/${todo.id}`, {
          method: 'DELETE',   
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json()
  
        if(response.ok) {
          // Si la suppression est réussie, on met à jour l'état des todos
          // on filtre la todo supprimée de la liste des todos
          const newTodoList =(todos.filter((t : Todo) => t.id !== data.id))
          setTodos(newTodoList)

          // afficher un message de succès
          toast.success("Tâche supprimée avec succès", {
            onClose: () => {
              // rafraîchir la page 
              // router.refresh()  // ne se fait pas en client component il faudrait externaliser les fetch dans un composant serveur et limporter 
              window.location.reload()
            }
          })
          
        }
      };
      
    }
    catch (err) {
      console.error("Erreur  :", err)
    }
  }
    

  return (
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

      <section>
        <h1 className="text-center">Taches crées</h1>

        {todos.length === 0 && (
          <p className="loader">

            {isLoading ? (
              "Veuillez Patienter ..."
            ) : "Aucune tache n'a été créée"}
            
          </p>
        ) }

          <div className="listContainer">

        
            <ul className="ul-list mb w-60 shadow-hover" role="list">

              {todos.map((todo  : Todo) => (
                <li key={todo.id} className="li-list">
                  <div className="todo">

                    <p className="date">
                      {
                        formatDate(todo.date)
                      }
                    </p>
                    <h2>{todo.title}</h2>

                    <div>
                      <button onClick={()=>handleEdit(todo)} className="btn btn-update" aria-label="Modifier la tâche" title="Modifier" >
                        <PencilSquareIcon style={{width : "20px"}}/> </button>
                      <button onClick={()=> handleDelete(todo)} className="btn btn-delete" aria-label="Supprimer la tâche" title="Supprimer" >
                        <TrashIcon style={{width : "20px"}}/> </button>    
                    </div>

                  </div>

                </li>
              ))}

            </ul>
          </div>
        

      </section>
    </>
  )
}
