/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { ClassList } from '../../ts/00-types/index.js';
import type { SVG } from '../../ts/svg.js';

/**
 * Input props for the Icon component.
 * 
 * @since ___PKG_VERSION___
 */
export type Props = {
    class?: ClassList;
    type: keyof typeof SVG;
    slug?: never;
    svg?: never;
    svgLabel?: never;
} | {
    class?: ClassList;
    type?: never;
    slug: string;
    svg: string;
    svgLabel: string;
};