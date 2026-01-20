/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.10
 * @license MIT
 */

import type { ClassList } from '../../ts/00-types/index.js';
import type { SVG } from '../../ts/svg.js';

/**
 * Input props for the Icon component.
 * 
 * @since 0.1.0-alpha
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