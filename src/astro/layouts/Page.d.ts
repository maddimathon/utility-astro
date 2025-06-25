/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
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