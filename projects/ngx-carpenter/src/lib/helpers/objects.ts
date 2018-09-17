/**
 * Curried function that takes an object, and returns a
 * function that takes a property name, which returns true
 * if the property exists on the object, otherwise false.
 */
export const has = (o: object) => (p: string): boolean =>
    Object.prototype.hasOwnProperty.call(o, p);

/**
 * Curried function that takes a property name, and returns
 * a function that takes an object, which returns true if the
 * property exists on the object, otherwise false.
 */
export const keyExists = (p: string) => (o: object): boolean =>
    Object.prototype.hasOwnProperty.call(o, p);

/**
 * Create a copy of the provided entity and remove any references.
 */
export function copy(original: any) {
    return JSON.parse(JSON.stringify(original));
}