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
 * Input props for the CodeBlock component.
 * 
 * @since 0.1.0-alpha.draft
 */
export interface Props {

    children?: any;

    /** 
     * Value for component's `class` attribute.
     */
    class?: string | string[];

    /**
     * Code language, if any.
     */
    lang?: string;
}