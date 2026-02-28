/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.20
 * @license MIT
 */
/**
 * Converts a map or iterable key-value pairs into a matching object.
 *
 * @since 0.1.0-alpha
 */
export declare function mapToObject<T_Key extends string | number | symbol, T_Value extends unknown>(input: Iterable<readonly [T_Key, T_Value]> | Map<T_Key, T_Value>): { [K in T_Key]: T_Value; };
//# sourceMappingURL=mapToObject.d.ts.map