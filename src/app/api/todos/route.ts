//todo에 관한 로직이므로 GET, POST, PATCH, DELETE 다

export async function GET(request: Request) {
  try {
    const response = await fetch("http://localhost:4000/todos");
    const todos = await response.json();

    if (!todos) {
      return new Response("Todo is not found", {
        status: 404,
      });
    }

    return Response.json({ todos });
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  try {
    // body에서 값을 뽑아오기
    const { title, contents } = await request.json();

    const response = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ title, contents, isDone: false }),
    });

    const todo = await response.json();

    return Response.json({
      todo,
    });
  } catch (error) {
    console.error(error);
  }
}
