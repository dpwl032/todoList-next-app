export type Company = {
  name: string;
  desctiption: string;
  image: string;
};

export type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};

export type NewTodo = Pick<Todo, "title" | "contents">;
export type EditTodo = Pick<Todo, "id" | "isDone">;
