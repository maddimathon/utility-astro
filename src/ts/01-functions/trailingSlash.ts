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
 * Functions for adding and removing trailing slashes.
 * 
 * @since 0.1.0-alpha
 */
export namespace trailingSlash {

    /**
     * @since 0.1.0-alpha
     */
    export function add( str: string ) {

        // returns
        if ( !str.match( /\.[a-z][a-z0-9\-]*$/ ) ) {
            return str.replace( /\/$/gi, '' ) + '/';
        }

        return str;
    };

    /**
     * @since 0.1.0-alpha
     */
    export function remove( str: string ) {
        return str.replace( /\/$/gi, '' );
    };
}