const object = {
    name: "GeeksforGeeks",
    founded: 2009
};
console.log("The organisation is ".concat(object.name, 
    " and it was founded in ").concat(object.founded));

function funky({ one = '1', two = 2}) {
    return one + 2
}

const array = ['one', 'two', 'three']

/**
 * Discovery notes
 * export {} is required for one variable to prevent TS linting error.
 * More than one variable must be exported to prevent TS linting error.
 * 
 * Question
 * 1. Do we want all functions to be exportable at a top level?
 * 2. Not importing the d.TS file into the top. Are these Types being set globally? Will naming conflicts be an issue?
 * 
 * Thoughts
 * Proving useful for a single JS file.
 */

// export {}; // necessary for 1 variable in a file.
export {
    funky,
    object,
    array
}