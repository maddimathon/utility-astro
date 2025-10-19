/**
 * @since 0.1.0-alpha.draft
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */

import type { ClassList } from '../../ts/00-types/index.js';
import type { SVG } from '../../ts/svg.js';

/**
 * Input props for the Icon component.
 * 
 * @since 0.1.0-alpha.draft
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