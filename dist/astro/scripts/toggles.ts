/**
 * @since 0.1.0-alpha.draft
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */

import { ElementToggle } from '../../ts/classes/ElementToggle.js';

window.addEventListener( 'load', () => {
    const containers = document.querySelectorAll( '[data-toggle-container]' ) as NodeListOf<HTMLDivElement>;
    containers.forEach( ( con ) => con.id && new ElementToggle( con.id ) );
} );