'use client';

import {  useEffect , useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';




type Todo = {
    id: string;
    title: string;
    date: string;
}


const EditPage = () => {

    // recupérer l'id de la todo à partir des paramètres de l'URL
    const searchParams = useSearchParams();
    const todoId = searchParams.get('id');
    const router = useRouter();
    // état pour gérer l'activation / desactivation du  bouton de soumission
    const [isDisabled , setIsDisabled] = useState(false);

    const [ todo, setTodo ] = useState <Todo | undefined>();
    const  [title , setTitle] = useState('');
    const [date, setDate] = useState('');


    useEffect(() => {

        // Logique pour charger la todo à éditer
        if (todoId) {

            const getTodo = async () => {
                try {
                    const response = await fetch(`/api/todos/${todoId}`);
                    
                    if (response.ok) {
                        // si la réponse est ok, on récupère les données
                        const data = await response.json();
                        // console.log( 'ma data' ,data)

                        setTodo(data)
                        setTitle(data.title);
                        setDate(data.date);
                    }
                    else {
                        console.error("Erreur lors de la récupération de la todo :", response.status,
                            router.push('/todos')
                        );
                    }

                } catch (error) {
                    console.error('Error fetching todo:', error);
                }

            }

            // appel de la fonction pour récupérer la todo
            getTodo();
        }
        
           
    }, [todoId , router]);


    const handleEditTodo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // desactiver le boutton de soumission 
        setIsDisabled(true);

        if( !title || !date ) {
            alert('Veuillez remplir tous les champs');
            setIsDisabled(false);
            return;
        }

        // methode patch pour mettre à jour la todo
        const response = await fetch(`/api/todos/${todoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                date,
            }),
        })
        const data = await response.json();
        // console.log('ma data modifiée', data)

        if(response.ok){
            toast.success("Tâche modifiée avec succes" , {
                onClose : ()=> {
                    router.push('/todos')
                }
            })
        }
        




    }


  return  todo ? (
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

        <form className="form" onSubmit={handleEditTodo}>
            <div className="title">
                <h1>Modifier la tâche</h1>
            </div>
            <div className="align-horizontal">
                <div className="todo-container">
                    <label  className="placeholder" >Tache</label>
                    <input  
                    className="input" 
                    type="text"  
                    placeholder="indiquez une tache" 
                    autoComplete="off"  
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}/>
                </div>

                <div className="date-container">
                <label  className="placeholder" >Date</label>
                    <input  
                    className="input" 
                    type="date"  
                    placeholder="indiquez une date" 
                    value={date}
                    onChange={(e)=> setDate(e.target.value)}/>
                </div>
            </div>

            <div className="button-container">
                  
                <button disabled={isDisabled} type="submit" className="btn-success">Modifier</button>
                <Link href="/todos" className="redirect-link">Vers mes Tâches</Link>
                
            </div>
        </form>
    </>
  ) :
  <p> Veuillez Patientez ...</p>
}

export default EditPage;