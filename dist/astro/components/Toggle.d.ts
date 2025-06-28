/**
 * @since 0.1.0-alpha.draft
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */

/**
 * Input props for the Toggle component.
 * 
 * @since 0.1.0-alpha.draft
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