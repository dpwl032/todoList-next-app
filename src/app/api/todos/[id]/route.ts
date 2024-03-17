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
  try {
    //request-바디에서 값 뽑기
    const { isDone } = await request.json();
    const response = await fetch(`http://localhost:4000/todos/${params.id}`, {
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
  } catch (error) {
    console.error(error);
  }
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
  try {
    const { id } = params;
    await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
  }
}
