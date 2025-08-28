'use client'
import Link from "next/link";
import {updateTodo} from '@/app/lib/actions'
import { useActionState } from "react";
import { useRef ,  useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";



interface Todo {
    title :string ,
    date : string ,
    id : string
}
const initialState = {
    message : ""
}


export default function EditTodo({ todo } : {todo : Todo}) {

    const {title , date ,id } = todo;
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

  const [state, formAction]  =  useActionState (updateTodo, initialState);


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
          action={async (formData: FormData) => {
            formAction(formData);
            formRef.current?.reset();
          }}
          ref={formRef}
          className="form"
        >
            <input type="hidden" name="id"  value={id}/>
          <div className="title">
            <h1>Modifier la tâche</h1>
          </div>
          <div className="align-horizontal">
            <div className="todo-container">
              <label className="placeholder">Tache</label>
              <input
                className="input"
                type="text"
                placeholder="indiquez une tache"
                autoComplete="off"
                // Uncontrolled component → React ne contrôle pas la valeur après le rendu initial.
                defaultValue={title}
                name="title"
              />
            </div>

            <div className="date-container">
              <label className="placeholder">Date</label>
              <input
                className="input"
                type="date"
                placeholder="indiquez une date"
                defaultValue={date}
                name="date"
              />
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="btn-success">
              Modifier
            </button>
            <Link href="/todos" className="redirect-link">
              Vers mes Tâches
            </Link>
          </div>
        </form>
      </>
    );
}
