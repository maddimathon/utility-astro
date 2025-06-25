/**
 * @since 0.1.0-draft
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-draft
 * @license MIT
 */

import type { ComponentProps } from '../../ts/types/index.js';

/**
 * Input props for the NewComponent component.
 */
export interface Props extends ComponentProps<Props> {

    /** 
     * Value for component's `class` attribute.
     */
    class?: string | string[];
}