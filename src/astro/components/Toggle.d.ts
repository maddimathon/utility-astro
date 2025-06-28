/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Input props for the Toggle component.
 * 
 * @since ___PKG_VERSION___
 */
export interface Props {

    children: any; // these are the slots

    /** 
     * Unique id attr.
     */
    id: string;

    /**
     * If any, the heading level used to wrap the toggle button.
     */
    heading?: number;

    /** 
     * Value for component's `class` attribute.
     */
    class?: string | string[];
}