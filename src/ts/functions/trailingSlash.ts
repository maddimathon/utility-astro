/**
 * @since ___PKG_VERSION___
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
 * @since ___PKG_VERSION___
 */
export namespace trailingSlash {

    /**
     * @since ___PKG_VERSION___
     */
    export function add( str: string ) {

        // returns
        if ( !str.match( /\.[a-z][a-z0-9\-]*$/ ) ) {
            return str.replace( /\/$/gi, '' ) + '/';
        }

        return str;
    };

    /**
     * @since ___PKG_VERSION___
     */
    export function remove( str: string ) {
        return str.replace( /\/$/gi, '' );
    };
}