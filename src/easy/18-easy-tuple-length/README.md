https://github.com/type-challenges/type-challenges/blob/master/questions/18-easy-tuple-length/README.md

このままだと

```ts
const data = "aaaa" as const;
type Data = Length<typeof data>;
// type Data = number
```

になるので、array 以外だったら never になる方法ないのかな
