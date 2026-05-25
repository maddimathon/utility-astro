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
    SCRIPTS_FEATURECHECK,
    SCRIPTS_FEATURECHECK_OUTPUTRESULTS,
} from 'astro:env/client';

import { FeatureCheck } from '@maddimathon/utility-sass/classes/FeatureCheck';

if ( SCRIPTS_FEATURECHECK ) {
    // run the checks and update class names
    new FeatureCheck( {
        outputResults: SCRIPTS_FEATURECHECK_OUTPUTRESULTS,
    } ).check();
}