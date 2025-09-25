/**
 * @since 0.1.0-alpha.draft
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */

import type { HTMLAttributes } from 'astro/types';

/**
 * Input props for the Table component.
 * 
 * @since 0.1.0-alpha.draft
 */
export interface Props {

    /** 
     * Value for component's `class` attribute.
     */
    class?: string | string[];

    wrapper?: HTMLAttributes<'div'>;
}