"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import MoveButton from "@/components/MoveButton";
import type { NewTodo, Todo, EditTodo } from "@/app/tyeps";

//todoList의 목록을 만드는 페이지를 CSR 렌더링 방식
const CsrPage = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  //조회
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/todos`);
      const todos = await response.json();

      return todos;
    },
  });

  //추가
  const newTodoMutation = useMutation({
    mutationFn: async (newTodo: NewTodo) => {
      const response = await fetch(`http://localhost:3000/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newTodo, isDone: false }),
      });
      const todo = await response.json();
      return todo;
    },
    onSuccess: () => {
      setTitle("");
      setContents("");

      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  //삭제
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const todo = await response.json();
      return todo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  //수정
  const editMutation = useMutation({
    mutationFn: async ({ id, isDone }: EditTodo) => {
      const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone: !isDone }),
      });
      const updatedTodo = await response.json();
      return updatedTodo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.error("An error occurred:", error);
    },
  });

  if (isLoading) {
    return (
      <>
        <span>Loading</span>
        <span className="loading loading-dots loading-lg"></span>
      </>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <section className="mx-8 my-8 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newTodoMutation.mutate({ title, contents });
            alert("추가완료");
          }}
        >
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="contents">Contents</label>
            <input
              id="contents"
              type="text"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              className="mt-1 block  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </div>

          <button type="submit" className="mx-8 my-8 btn btn-accent">
            추가하기
          </button>
        </form>
      </section>
      {todos.todos.map((todo: Todo) => {
        return (
          <div
            key={todo.id}
            className="mx-8 my-8 card card-compact w-96 bg-base-100 shadow-xl"
          >
            <div className="card-body">
              <h2 className="card-title">{todo.title}</h2>
              <p>{todo.contents}</p>
              {todo.isDone ? <p>Done</p> : <p>Not done</p>}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-neutral"
                  onClick={() => {
                    alert("삭제하겠습니까?");
                    deleteMutation.mutate(todo.id);
                  }}
                >
                  삭제
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    editMutation.mutate({ id: todo.id, isDone: todo.isDone });
                  }}
                >
                  {todo.isDone ? "취소" : "완료"}
                </button>
              </div>
            </div>
          </div>
        );
      })}{" "}
      <MoveButton />
    </div>
  );
};

export default CsrPage;
