/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.14
 * @license MIT
 */

import type { ClassList } from '../../ts/00-types/index.js';
import type { Props as IconProps } from './Icon.d.ts';

/**
 * Input props for the Alert component.
 * 
 * @since 0.1.0-alpha
 */
export type Props = {
    class?: ClassList;
    heading?: number;

    type: IconProps[ 'type' ];

    slug?: never;
    svg?: never;
    svgLabel?: never;
} | {
    class?: ClassList;
    heading?: number;

    type?: never;

    slug: string;
    svg: string;
    svgLabel: string;
};