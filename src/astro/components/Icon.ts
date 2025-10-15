/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { SVG } from '../../ts/svg.js';

/**
 * Input props for the Icon component.
 * 
 * @since ___PKG_VERSION___
 */
export interface Props {
    type: keyof typeof SVG;
}