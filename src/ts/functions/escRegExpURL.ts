/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import { escRegExp } from '@maddimathon/utility-typescript/functions';

/**
 * Escapes a url string for better, more properly applicable, url matching.
 * 
 * - makes https into https?
 * - makes last slash optional
 * - makes www. prefix optional.
 * 
 * @since ___PKG_VERSION___
 */
export function escRegExpURL( url: string ): string {

    const matches = url.match( /^((?:https?:\/\/)?)((?:www\.)?)(.*)(\/?)$/i );

    const [
        matched,
        http,
        www,
        meat,
        trailingSlash,
    ] = matches ?? [];

    // returns
    if ( !matched ) {
        return url;
    }


    let regex = '';

    if ( http ) {
        regex += '(?:https?:\\/\\/)?';
    }

    if ( www ) {
        regex += '(?:www\\.)?';
    }

    if ( meat ) {
        regex += escRegExp( meat );
    }

    if ( trailingSlash ) {
        regex += '\\/?';
    }

    return regex;
}