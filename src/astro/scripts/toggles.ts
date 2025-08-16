/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import { ElementToggle } from '../../ts/02-classes/ElementToggle.js';

window.addEventListener( 'load', () => {
    const containers = document.querySelectorAll( '[data-toggle-container]' ) as NodeListOf<HTMLDivElement>;
    containers.forEach( ( con ) => con.id && new ElementToggle( con.id ) );
} );