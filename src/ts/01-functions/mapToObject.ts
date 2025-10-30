/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */


/**
 * Converts a map or iterable key-value pairs into a matching object.
 * 
 * @since 0.1.0-alpha
 */
export function mapToObject<
    T_Key extends string | number | symbol,
    T_Value extends unknown,
>( input: Iterable<readonly [ T_Key, T_Value ]> | Map<T_Key, T_Value> ) {

    const map = input instanceof Map ? input : new Map( input );

    const partialObjs = Array.from( map.entries() ).map(
        ( [ _key, _val ] ) => ( { [ _key ]: _val } )
    );

    return partialObjs.reduce(
        ( _prev, _curr ) => ( { ..._prev, ..._curr } )
    ) as {
            [ K in T_Key ]: T_Value;
        };
}