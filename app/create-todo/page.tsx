
'use client'
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";



export default function CreateTodo() {


    const [title , setTitle] = useState("")
    const [date , setDate] = useState("")
    const [isDesabled , setIsDesabled] = useState(false)
    // permet de rediriger l'utilisateur
    const router = useRouter()

    const notifyError = () => toast.error('Veuillez remplir tous les champs !')
    const notifySucces = () => toast.success('Tâche créée avec succès !' , {
        onClose: () => {
            // Redirection vers la page d'accueil après le toast
           router.push('/todos')
        }
    } )



    const handleCreateTodo = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // remplir toutes les infos sinon toast error
        if(!title  || !date ){
            notifyError()
            return
        }

        // retirer le bouton 
        setIsDesabled(true)

        // envoyer a la bdd via l'api 
        const response = await fetch('/api/create-todo' , {
            method : 'POST' ,
            headers : {
                'content-Type' : 'application/json'
            },
            body : JSON.stringify({
                title ,
                date
            })
        })

        if(response.ok){
            // reinitialiser les champs
            setTitle("")
            setDate("")
            setIsDesabled(false)
            // afficher un toast de succes
            notifySucces()
            
        }
        else {
            // afficher un toast d'erreur
            toast.error('Erreur lors de la création de la tâche !')
            setIsDesabled(false)
        }
        

    }


  return (
    <>

        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />

        <form className="form" onSubmit={handleCreateTodo}>
            <div className="title">
                <h1>Créer une tâche</h1>
            </div>
            <div className="align-horizontal">
                <div className="todo-container">
                    <label  className="placeholder" htmlFor="">Tache</label>
                    <input  
                    className="input" 
                    type="text"  
                    placeholder="indiquez une tache" 
                    autoComplete="off"  
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}/>
                </div>

                <div className="tdate-container">
                <label  className="placeholder" htmlFor="">Date</label>
                    <input  
                    className="input" 
                    type="date"  
                    placeholder="indiquez une date" 
                    value={date}
                    onChange={(e)=> setDate(e.target.value)}/>
                </div>
            </div>

            <div className="button-container">
                {
                    !isDesabled && 
                    <button type="submit" className="btn-success">Créer</button>
                }
            </div>
        </form>
    </>
  )
}
