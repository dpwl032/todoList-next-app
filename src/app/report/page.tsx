import React from "react";
import type { Todo } from "../tyeps";

//todos의 통계 정보를 ISR로 구현하는 페이지
const ReportPage = async () => {
  const response = await fetch(`http://localhost:4000/todos`, {
    next: { revalidate: 10 },
  });

  const todos: Todo[] = await response.json();
  const doneTodos = todos.filter((item) => item.isDone === true).length;
  const nowTodos = todos.filter((item) => item.isDone === false).length;
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {todos.map((item) => (
          <div>
            <p>{item.title}</p>
            <p>{item.contents}</p>
            {item.isDone ? <p>Done</p> : <p>Not done</p>}
            <br />
          </div>
        ))}
      </div>
      <div>
        <p>현재 {todos.length}의 todoList가 등록 됐습니다.</p>
        <p>할일 목록 갯수 : {doneTodos} 개</p>
        <p>끝낸 목록 갯수 : {nowTodos} 개</p>
      </div>
    </div>
  );
};

export default ReportPage;
