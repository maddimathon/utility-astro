/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { HTMLAttributes } from 'astro/types';

/**
 * Input props for the Table component.
 * 
 * @since ___PKG_VERSION___
 */
export interface Props {

    /** 
     * Value for component's `class` attribute.
     */
    class?: string | string[];

    wrapper?: HTMLAttributes<'div'>;
}