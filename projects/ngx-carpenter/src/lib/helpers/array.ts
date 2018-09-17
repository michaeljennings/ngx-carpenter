export const filters = {
    /**
     * Filters to only unique elements.
     *
     * @return {boolean}
     */
    unique: (value, index, array) => array.indexOf(value) === index,

    /**
     * Filters to only truthy elements.
     *
     * @param {any} value - The current array value
     *
     * @return {boolean}
     */
    truthy: v => !!v,
};