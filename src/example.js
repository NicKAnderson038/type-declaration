// Working!!
/** @type {import('./example').funky} */
function funky({ one = 1, two = 2, three = 3}) {
    return one + two + three
}

// below isn't type checking
/** @type {import('./example').array} */
const array = [1, 2, 1]

export {
    funky,
    array
}