/** Typed generic version of Object.keys, where O is the object type */
export const keys = <O>(obj: object) => Object.keys(obj) as (keyof O)[];
