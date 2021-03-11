/*
  108 - Trim
  -------
  by Anthony Fu (@antfu) #medium #template-literal
  
  ### Question
  
  Implement `Trim<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.
  
  For example
  
  ```ts
  type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
  ```
  
  > View on GitHub: https://tsch.js.org/108
*/

/* _____________ Your Code Here _____________ */

/**
 * 1. ` text `みたいなときは `text`だけ抜き出して再度Trimに放り込んで、 : Sの判定を期待する
 * 2. ` text`みたいなときは `text`だけ抜き出して再度Trimに放り込んで、 : Sの判定を期待する
 * 3. `text `みたいなときは `text`だけ抜き出して再度Trimに放り込んで、 : Sの判定を期待する
 */

type Space = " " | "\n" | "\t";
type Trim<S extends string> = S extends `${Space}${infer R}${Space}`
  ? Trim<R>
  : S extends `${Space}${infer U}`
  ? Trim<U>
  : S extends `${infer V}${Space}`
  ? Trim<V>
  : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/108/answer
  > View solutions: https://tsch.js.org/108/solutions
  > More Challenges: https://tsch.js.org
*/
