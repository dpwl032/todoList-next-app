# Typescript 개인 과제

> 주제 : 통계정보, 주기적인 업데이트 페이지, 일반 리스트 페이지가 들어간 렌더링 종합세트 TodoList 만들기

<br>

## 개발 기간

- 2024.03.14 ~ 15

<br>

## 개발 환경

- Environment : Visual Studio Code
- Development : typescript, React
- Framework : Next.js
- DB : json-server

<br>

## 요구사항

> 목표 : Next.js의 라우팅과 렌더링의 핵심 개념을 이해할 수 있는 TodoList를 만듭니다.

<details>
<summary>(1) 애플리케이션 전역에서 사용할 내비게이션 만들기
</summary>

- 다음 페이지에 접근할 수 있는 내비게이션 바를 만듭니다.
- about, report, todos-csr, todos-ssr
- RootLayout에 삽입하여 모든 페이지에서 접근이 가능케합니다.
</details>

<details>
<summary>(2) react-query 세팅
</summary>

- QueryProvider를 이용하여 react-query를 세팅합니다.
</details>

<details>
<summary>(3) json-server 세팅
</summary>

- 데이터베이스 서버로 가정할 json-server를 생성합니다.
- DB : todos, companyInfo
</details>

<details>
<summary>(4) 백엔드를 구축합니다.
</summary>

- 두 파일을 만듭니다. (app > api > 1.company > route.ts / 2.todos > route.ts )
- (5)에서 제공할 페이지에 대한 백엔드 로직을 완성합니다. (GET, POST, PATCH, DELETE)
</details>

<details>
<summary>(5) 각 페이지를 구축합니다.
</summary>

- about 페이지 : companyInfo 정보를 불러와서 회사에 대한 소개를 구현하는 페이지 (SSG)
- report 페이지 : todos의 통계 정보를 구현하는 페이지, 매 10초마다 결과가 갱신 (ISR,revalidate,useRouter로 페이지 이동)
- todos CSR 페이지 : react query를 이용해 todoList의 목록을 만드는 페이지 (CSR, CRUD)
- todos SSR 페이지 : todoList의 목록을 나타내는 페이지 (SSR, Link 태그로 페이지 이동)
- 할일정보통계보러가기 버튼 생성 : CSR, SSR 페이지에만 존재, 버튼 클릭 시 report 페이지로 이동
</details>

<br>

## 선택 구현 사항

- comments 페이지 : 댓글 추가, 조회가 가능한 페이지 구현

<br>

## Code block : 데이터 모델 정의

```ts
export type Company = {
  name: string;
  description: string;
  image: string;
};
```

```ts
export type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};
```

```ts
export type NewTodo = Pick<Todo, "title" | "contents">;
export type EditTodo = Pick<Todo, "id" | "isDone">;
```

<br>

## 보완할 점

- 커스텀훅을 이용해 useQuery 및 useMutation 재사용성 높이기
- 댓글 기능 CRUD 구현
- 완벽하게 Route Handlers 개념 복습하기
