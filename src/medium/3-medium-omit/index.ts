/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #medium #union #built-in
  
  ### Question
  
  Implement the built-in `Omit<T, K>` generic without using it.
  
  Constructs a type by picking all properties from `T` and then removing `K`
  
  For example
  
  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type TodoPreview = MyOmit<Todo, 'description' | 'title'>
  
  const todo: TodoPreview = {
    completed: false,
  }
  ```
  
  > View on GitHub: https://tsch.js.org/3
*/

/* _____________ Your Code Here _____________ */

/**
 * 1. TのkeyからKのunionとマッチしたものを省いたobjectを返したい
 * type MyOmit<T, K> = any
 *
 * 2. KはTのkeyと同じ文字列でないといけないので、keyof T
 * type MyOmit<T, K extends T> = any
 *
 * 3. TのkeyからKのunionとマッチしたものを省いたobjectを返したいので、objectへ
 * type MyOmit<T, K extends T> = {
 *
 * }
 *
 * 4. keyはTのkeyofのはずなので、extends keyof Tで、valueはTのkeyのvalueと同じ型のはずなのでT[key]
 * type MyOmit<T, K extends T> = {
 *  [key in keyof T]: T[key]
 * }
 *
 * 5. keyから省くものを一つずつ走査するため、inferで抜き出し（ただしここの時点でTSはRをunknownとしてしまっているが一旦放置）、走査できない場合はnever
 * type MyOmit<T, K extends T> = {
 *  [key in keyof T extends infer R ? R : never]: T[key]
 * }
 *
 * 6. Rが、省きたいkey名を列挙したKとマッチしたら消滅させたいので、extends Kでtrueならnever、falseならR
 * type MyOmit<T, K extends T> = {
 *  [key in keyof T extends infer R ? R extends K ? never : R : never]: T[key]
 * }
 *
 * 7. ここから、Rはunknownであるので、Tのkey名の一部であることを教えてあげる必要がある。extends keyof T　違ったらnever
 * type MyOmit<T, K extends T> = {
 *  [key in keyof T extends infer R ? R extends K ? never : R extends keyof T ? R : never : never]: T[key]
 * }
 */

type MyOmit<T, K extends keyof T> = {
  [key in keyof T extends infer R
    ? R extends K
      ? never
      : R extends keyof T
      ? R
      : never
    : never]: T[key];
};

// type MyOmit<T, K extends keyof T> = {
//   [P in Exclude<keyof T, K>]: T[P];
// };
/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3/answer
  > View solutions: https://tsch.js.org/3/solutions
  > More Challenges: https://tsch.js.org
*/
