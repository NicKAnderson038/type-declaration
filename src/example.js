// /** @type {import('./example').randomObject} */
const randomObject = {
    key: 1,
    value: 'test'
}

const array = [1, 2, 1];

// after building d.ts file. Uncomment this assoication below to get typechecking.
// /** @type {import('./example').funky} */
function funky({ one = 1, two = 2, three = 3 }) {
  return (
    one +
    two +
    three +
    array.reduce((acc, num) => {
      acc = num + acc;
      return acc;
    }, 0)
  );
}

export { funky, randomObject };
