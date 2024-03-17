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
      <div>
        <p>현재 {todos.length}의 todoList가 등록 됐습니다.</p>
        <p>끝낸 목록 갯수 : {doneTodos} 개</p>
        <p>할일 목록 갯수 : {nowTodos} 개</p>
      </div>

      {/* daisy */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Contents</th>
              <th>isDone</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {todos.map((item, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{item.title}</td>
                <td>{item.contents}</td>
                {item.isDone ? <td>Done</td> : <td>Not done</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* daisy */}
    </div>
  );
};

export default ReportPage;
