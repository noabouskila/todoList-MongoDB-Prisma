'use client'
import { useState , useEffect, use} from "react"


type Todo = {
  id: string;
  title: string;      
  date: string;
}

export default function Todos() {

  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // au montage du composant, on recupère les todos depuis l'API
  useEffect(() => {
    const getTodos = async ()=>{
      const response = await fetch('/api/get-todos',  {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      console.log("ma todolist",data)

      setTodos(data)
      setIsLoading(false)
      
    }
    // appel de la fonction pour récupérer les todos 
    getTodos()
  }, [])
    

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
                  <p>
                    {
                      // on formate la date pour l'afficher
                      new Date(todo.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })
                    }
                  </p>
                </div>
                <h2>{todo.title}</h2>

                <div className="todo-btn">
                  <button onClick={()=>{}} className="btn btn-delete">Supprimer</button>
                  <button onClick={()=>{}} className="btn btn-update">Modifier</button>    
                </div>

              </li>
            ))}

          </ul>
        </div>
      

    </section>
  )
}
