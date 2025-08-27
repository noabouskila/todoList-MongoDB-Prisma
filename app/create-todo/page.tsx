'use client'

import { createTodo } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/navigation'; 
import { useEffect } from 'react';

const  initialState= {
    message : '',
}

const  CreateTodo = () => {

    // gestion du formulaire avec useFormState 
    // formAction sert à lier la fonction createTodo au formulaire
    // state permet de gérer l'état du formulaire (chargement, succès, erreur)
    const [state , formAction] = useFormState(createTodo , initialState);
    const router = useRouter();
    // pour ne pas que le message derreur ou succes double
    // const [isToastShown, setIsToastShown] = useState(false);

    useEffect(()=>{

        if (state.message === "success") {
          toast.success("la tache à été crée avec succes", {
            onClose: () => {
              router.push("/todos");
            },
          });
          // setIsToastShown(true)
        } else if (state.message === "error") {
          toast.error("echec de la création de la tâche", {
            onClose: () => {
              router.push("/todos");
            },
          });
          //   setIsToastShown(true);
        }

    } , [state.message ,router])
    


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

      <form className="form" action={formAction}>
        <div className="title">
          <h1>Créer une tâche</h1>
        </div>
        <div className="align-horizontal">
          <div className="todo-container">
            <label className="placeholder" htmlFor="">
              Tache
            </label>
            <input
              className="input"
              type="text"
              placeholder="indiquez une tache"
              autoComplete="off"
              name="title"
              required
            />
          </div>

          <div className="date-container">
            <label className="placeholder" htmlFor="">
              Date
            </label>
            <input
              className="input"
              type="date"
              placeholder="indiquez une date"
              name="date"
              required
            />
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="btn-success">
            Créer
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateTodo;
