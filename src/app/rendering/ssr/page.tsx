import React from "react";
import Link from "next/link";
import type { Todo } from "@/app/tyeps";

//todoList의 목록을 나타내는 SSR
//react query를 이용해서 CRUD가 모두 가능한 페이지
//[할일정보통계보러가기] 버튼이 존재합니다. => report로 이동

const SsrPage = async () => {
  const response = await fetch(`http://localhost:4000/todos`, {
    cache: "no-cache",
  });

  const todos: Todo[] = await response.json();

  return (
    <div>
      <div>
        {todos.map((item) => (
          <div className="mx-8 my-8 card card-compact w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.contents}</p>
              <div className="card-actions justify-end">
                {item.isDone ? (
                  <button className="btn btn-primary">Done</button>
                ) : (
                  <button className="btn btn-primary">Not done</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button className="mx-8 my-8 btn btn-outline btn-primary">
          <Link href="/report">할일정보통계보러가기</Link>
        </button>
      </div>
    </div>
  );
};

export default SsrPage;
