"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Link from "next/link";
import MoveButton from "@/components/MoveButton";
import QUERY_KEYS from "@/api/keys.constant";
import { deleteTodo, addTodo, editTodo } from "@/api/mutation";

import type { Todo } from "@/app/tyeps";

//todoList의 목록을 만드는 페이지를 CSR 렌더링 방식
const CsrPage = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const submitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !contents) {
      alert("빈 칸없이 작성해주세요!");
      return;
    }

    newTodoMutation.mutate({ title, contents });
    alert("추가완료");
  };

  //조회
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/todos`);
      const todos = await response.json();

      return todos;
    },
  });

  //추가
  const newTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      setTitle("");
      setContents("");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
      });
    },
  });

  //삭제
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
      });
    },
  });

  //수정
  const editMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
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
        <form onSubmit={submitTodo}>
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
      <div>
        <div role="alert" className="mx-8 my-8 alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>ongoing TodoList</span>
        </div>
        {todos.todos
          .filter((Item: Todo) => Item.isDone === false)
          .map((todo: Todo) => {
            return (
              <div
                key={todo.id}
                className="mx-8 my-8 card card-compact w-96 bg-base-100 shadow-xl"
              >
                <div className="card-body">
                  <Link href={`/rendering/csr/${todo.id}`}>
                    {" "}
                    <h2 className="card-title">{todo.title}</h2>
                  </Link>

                  <p>{todo.contents}</p>
                  {todo.isDone ? <p>완료</p> : <p>진행중</p>}
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
                        editMutation.mutate({
                          id: todo.id,
                          isDone: todo.isDone,
                        });
                      }}
                    >
                      {todo.isDone ? "취소" : "완료"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}{" "}
      </div>
      <div>
        <div role="alert" className="mx-8 my-8 alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Completed TodoList!</span>
        </div>
        {todos.todos
          .filter((Item: Todo) => Item.isDone === true)
          .map((todo: Todo) => {
            return (
              <div
                key={todo.id}
                className="mx-8 my-8 card card-compact w-96 bg-base-100 shadow-xl"
              >
                <div className="card-body">
                  <Link href={`/rendering/csr/${todo.id}`}>
                    {" "}
                    <h2 className="card-title">{todo.title}</h2>
                  </Link>

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
                        editMutation.mutate({
                          id: todo.id,
                          isDone: todo.isDone,
                        });
                      }}
                    >
                      {todo.isDone ? "취소" : "완료"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}{" "}
      </div>
      <MoveButton />
    </div>
  );
};

export default CsrPage;
