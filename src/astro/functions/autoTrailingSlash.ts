/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
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
 * @since ___PKG_VERSION___
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