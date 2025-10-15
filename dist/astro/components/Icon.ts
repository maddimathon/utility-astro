/**
 * @since 0.1.0-alpha.draft
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */

import type { SVG } from '../../ts/svg.js';

/**
 * Input props for the Icon component.
 * 
 * @since 0.1.0-alpha.draft
 */
export interface Props {
    type: keyof typeof SVG;
}