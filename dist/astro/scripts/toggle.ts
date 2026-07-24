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

import { ElementToggle } from '../../ts/classes/ElementToggle.js';

if ( SCRIPTS_TOGGLE ) {
    await ElementToggle.runOnLoad( {
        debug: SCRIPTS_TOGGLE_DEBUG,
        logResults: SCRIPTS_TOGGLE_OUTPUTRESULTS,
    } );
}