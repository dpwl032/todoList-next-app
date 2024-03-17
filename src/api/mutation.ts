import type { NewTodo, EditTodo } from "@/app/tyeps";

//내부 api(3000) => route handler
//body => route handler - request body

export const addTodo = async (newTodo: NewTodo) => {
  try {
    await fetch(`http://localhost:3000/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
  } catch (error) {
    console.error("error:", error);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
      //body가 없을 경우 header 생랼 가능
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
  } catch (error) {
    console.error(error);
  }
};

export const editTodo = async ({ id, isDone }: EditTodo) => {
  try {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone: !isDone }),
    });
  } catch (error) {
    console.error(error);
  }
};
