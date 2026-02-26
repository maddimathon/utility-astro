/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.17
 * @license MIT
 */

import {
    base as config_base,
} from 'astro:config/client';

import { escRegExp } from '@maddimathon/utility-typescript/functions';

import { autoTrailingSlash } from './autoTrailingSlash.js';

/**
 * Outputs an absolute URL, optionally made relative to the URL root.
 * 
 * @since 0.1.0-alpha
 */
export function absoluteInternalURL(
    currentURL: URL,
    targetSubpath: string,
    relativeToUrlRoot: boolean = true,
): string {

    targetSubpath = targetSubpath.replace( /(^\.?\/?|\/*$)/gi, '' );

    const pathPrefix = config_base.replace( /(^\.?\/|\/*$)/gi, '' );

    const prefixRegex = new RegExp( `^\\.?\\/?(${ escRegExp( pathPrefix ) }(\\/|$))+`, 'gi' );

    targetSubpath = targetSubpath.replace( prefixRegex, '' );

    // returns
    if ( !( currentURL instanceof URL ) ) {
        return autoTrailingSlash( pathPrefix + '/' + targetSubpath.replace( /^\.?\//gi, '' ) );
    }

    const baseURL = new URL( pathPrefix + '/', currentURL.origin );

    const fullURL = new URL( targetSubpath, baseURL );


    let retString = fullURL.toString();

    if ( relativeToUrlRoot ) {
        retString = fullURL.pathname;
    }

    if ( retString.length < 1 ) {
        retString += '/';
    }

    return autoTrailingSlash( retString );
}