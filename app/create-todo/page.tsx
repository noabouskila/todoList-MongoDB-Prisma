'use client'

import { createTodo } from '@/app/lib/actions';
import { useActionState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/navigation'; 
import { useEffect , useRef} from 'react';
import Button from '@/app/ui/Button';

const  initialState= {
    message : '',
}

const  CreateTodo = () => {
  // - gestion du formulaire avec useFormState
  // - useFormState lie une server action à un formulaire et de suivre son état.
  // - formAction sert à lier la fonction createTodo au formulaire
  // - state permet de gérer l'état du formulaire (chargement, succès, erreur)


  const [state, formAction] = useActionState(createTodo, initialState);
  const router = useRouter();
    //   pr vider les input a la validation du formulaire 
  const formRef = useRef<HTMLFormElement>(null)
    //   tester desactivation button
    //   const [isBtnDisabled, setIsBtnDisabled] = useState(false);


  useEffect(() => {
    if (state.message === "success") {
      toast.success("la tache à été crée avec succes", {
        onClose: () => {
          router.push("/todos");
        },
      });
    } else if (state.message === "error") {
      toast.error("echec de la création de la tâche", {
        onClose: () => {
          router.push("/todos");
        },
      });
    }
  }, [state.message, router]);



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

      <form
        className="form"
        action={async (formData: FormData) => {
          formAction(formData); // invoquer actions server
          formRef.current?.reset(); //vider input
          //    setIsBtnDisabled(true) // modifier le boutton : pour le desactiver
        }}
        ref={formRef}
      >
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
          {/* <button type="submit" className="btn-success">
            Créer
          </button> */}

          {/* essai desactivation du bouton a la soumission du form */}
          {/* <Button isDisabled={isBtnDisabled} /> */}
          <Button/>
        </div>
      </form>
    </>
  );
}

export default CreateTodo;
