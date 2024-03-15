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
    <div className="grid grid-cols-4 gap-4">
      {todos.map((item) => (
        <div>
          <p>{item.title}</p>
          <p>{item.contents}</p>
          {item.isDone ? <p>Done</p> : <p>Not done</p>}
          <br />
        </div>
      ))}
      <Link href="/report">할일정보통계보러가기</Link>
      <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">
        dd
      </button>
    </div>
  );
};

export default SsrPage;
