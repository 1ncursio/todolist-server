# todolist-server

## How to run the server

### Install dependencies

`npm i`

### Starting the server

`npm run dev`

## REST API

---

### GET /todos

- 모든 todo를 반환
- return type: `Todo[]`

### GET /todos/:id

- 지정된 id의 todo를 반환
- return type: `Todo`

### POST /todos

- 새로운 todo를 생성하고, 생성된 todo를 반환
- body 형식: `{ "content": string }`
- return type: `Todo`

### PUT /todos/:id

- 지정된 id의 todo를 수정하고, 수정된 todo를 반환
- body 형식: `{ "content": string, "done": boolean }`
  - `content` 나 `done` 둘 중 하나라도 없거나 타입이 맞지 않으면 `400 Bad Request`을 반환
- return type: `Todo`

### DELETE /todos/:id

- 지정된 id의 todo를 삭제(`deletedAt`을 수정)하고, 삭제된 todo를 반환
- return type: `Todo`

## Interface

---

### Todo

```typescript
interface Todo {
  id: number;
  content: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
```
