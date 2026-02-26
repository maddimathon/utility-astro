/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.18
 * @license MIT
 */

import { escRegExp } from '@maddimathon/utility-typescript/functions';

/**
 * @since 0.1.0-alpha
 */
export function currentPagePath(
    currentURL: URL,
): string {

    const baseUrlTrailing: string = import.meta.env.BASE_URL.replace( /\/*$/g, '' );

    const baseUrlRegex: RegExp = RegExp( '^' + escRegExp( baseUrlTrailing ) + '(/?|$)', 'gi' );

    const currentPath: string = currentURL.pathname
        .replace( /\/*$/g, '' )
        .replace( baseUrlRegex, '' );

    if ( !currentPath.length ) { return './'; }

    return currentPath;
}