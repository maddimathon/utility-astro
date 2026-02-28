/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.20
 * @license MIT
 */

import {
    trailingSlash as config_trailingSlash,
} from 'astro:config/client';

import {
    trailingSlash,
} from '../../ts/01-functions/index.js';

/**
 * Auto-applies or removes a trailing slash for the given path depending on the
 * astro configuration.
 * 
 * @since 0.1.0-alpha
 */
export function autoTrailingSlash( url: string ) {

    // returns
    if ( config_trailingSlash === 'always' ) {
        return trailingSlash.add( url );
    }

    // returns
    if ( config_trailingSlash === 'never' ) {
        return trailingSlash.remove( url );
    }

    return url;
}