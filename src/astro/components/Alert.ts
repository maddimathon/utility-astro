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
import type { Props as IconProps } from './Icon.d.ts';

/**
 * Input props for the Alert component.
 * 
 * @since ___PKG_VERSION___
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