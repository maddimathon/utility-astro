/**
 * @since 0.1.0-alpha.draft
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */

import {
    trailingSlash as config_trailingSlash,
} from 'astro:config/client';

import {
    trailingSlash,
} from '../../ts/functions/index.js';

/**
 * Auto-applies or removes a trailing slash for the given path depending on the
 * astro configuration.
 * 
 * @since 0.1.0-alpha.draft
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