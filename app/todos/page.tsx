'use client'
import { useState , useEffect, use} from "react"
import { formatDate } from "../utils/formateDate"
import { TrashIcon , PencilSquareIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"

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
        const response = await fetch('/api/get-todos', {
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
    // if (!todo || !todo.id) {
    //   console.error("Todo ou ID manquant pour l'édition");
    //   return;
    // }
    // redirection vers la page d'édition de la todo
    router.push(`/todos/edit?id=${encodeURIComponent(todo.id)}`)
    console.log("nodda")
  }

    

  return (
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
                    <button onClick={()=>handleEdit(todo)} className="btn btn-update">
                      <PencilSquareIcon style={{width : "20px"}}/> </button>
                    <button onClick={()=>{}} className="btn btn-delete">
                      <TrashIcon style={{width : "20px"}}/> </button>    
                  </div>

                </div>

              </li>
            ))}

          </ul>
        </div>
      

    </section>
  )
}
