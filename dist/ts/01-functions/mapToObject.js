/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.12
 * @license MIT
 */
/**
 * Converts a map or iterable key-value pairs into a matching object.
 *
 * @since 0.1.0-alpha
 */
export function mapToObject(input) {
    const map = input instanceof Map ? input : new Map(input);
    const partialObjs = Array.from(map.entries()).map(([_key, _val]) => ({ [_key]: _val }));
    return partialObjs.reduce((_prev, _curr) => ({ ..._prev, ..._curr }));
}
//# sourceMappingURL=mapToObject.js.map