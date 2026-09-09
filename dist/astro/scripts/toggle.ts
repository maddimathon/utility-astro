/**
 * Script to initialize element toggles — to be imported by components, layouts,
 * etc.
 *
 * @since 0.1.0-beta.0.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */

import {
    SCRIPTS_TOGGLE,
    SCRIPTS_TOGGLE_DEBUG,
    SCRIPTS_TOGGLE_OUTPUTRESULTS,
} from 'astro:env/client';

import { makeNumber } from '@maddimathon/utility-typescript';

import { ElementToggle } from '../../ts/classes/ElementToggle.js';

if ( SCRIPTS_TOGGLE ) {

    const computedStyle = window.getComputedStyle( document.body );

    const scrollPaddingTop = computedStyle.getPropertyValue( '--toggle-scroll-padding-top' ) || undefined;

    const scrollPaddingTop_num = scrollPaddingTop ? makeNumber( scrollPaddingTop.replace( /^\s*(\-?[\d\.]+)px\s*$/i, '' ) ) : null;

    await ElementToggle.runOnLoad( {
        debug: SCRIPTS_TOGGLE_DEBUG,
        logResults: SCRIPTS_TOGGLE_OUTPUTRESULTS,

        scrollToOptions: scrollPaddingTop_num !== null
            ? ( button ) => {
                const currentTop = button?.getBoundingClientRect()?.top;

                // returns
                if ( typeof currentTop !== 'number' ) {
                    return null;
                }

                return {
                    top: scrollPaddingTop_num + currentTop,
                } satisfies ScrollToOptions;
            }
            : null,
    } );
}