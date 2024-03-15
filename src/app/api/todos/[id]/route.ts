export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { id } = params;
  const response = await fetch(`http://localhost:4000/todos/${id}`);
  const todo = await response.json();

  if (!todo) {
    return new Response("Todo not found", { status: 404 });
  }

  return new Response(JSON.stringify(todo), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { id } = params;
  //바디에서 값 뽑기
  const { isDone } = await request.json();

  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ isDone }),
  });
  const updatedTodo = await response.json();

  return new Response(JSON.stringify(updatedTodo), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { id } = params;
  await fetch(`http://localhost:4000/todos/${id}`, {
    method: "DELETE",
  });

  return new Response(null, { status: 204 });
}
