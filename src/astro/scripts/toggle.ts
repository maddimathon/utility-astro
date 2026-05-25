/**
 * Script to initialize element toggles — to be imported by components, layouts,
 * etc.
 *
 * @since ___PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import {
    SCRIPTS_TOGGLE,
    SCRIPTS_TOGGLE_DEBUG,
    SCRIPTS_TOGGLE_OUTPUTRESULTS,
} from 'astro:env/client';

import { ElementToggle } from '../../ts/classes/ElementToggle.js';

if ( SCRIPTS_TOGGLE ) {
    await ElementToggle.runOnLoad( {
        debug: SCRIPTS_TOGGLE_DEBUG,
        outputResults: SCRIPTS_TOGGLE_OUTPUTRESULTS,
    } );
}