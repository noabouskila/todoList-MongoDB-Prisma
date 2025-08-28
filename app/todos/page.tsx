
import { formatDate } from "../utils/formateDate"
import { getTodos } from "@/app/lib/data"
import { UpdateTodo, DeleteTodo } from "@/app/ui/ButtonIcons";

type Todo = {
  id: string;
  title: string;      
  date: string;
}

const Todos = async  () => {
  const todos = await getTodos();

  if (!todos || todos.length === 0){
    return <p>pas de taches disponibles</p>
  }


  return (
    <>
      <section>
        <h1 className="text-center">Taches crées</h1>

        <div className="listContainer">
          <ul className="ul-list mb w-60 shadow-hover" role="list">
            {todos.map((todo: Todo) => (
              <li key={todo.id} className="li-list">
                <div className="todo">
                  <p className="date">{formatDate(todo.date)}</p>
                  <h2>{todo.title}</h2>

                  <div className="btnIconsContainer">
                    <UpdateTodo id={todo.id} />
                    <DeleteTodo id={todo.id} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};


export default Todos