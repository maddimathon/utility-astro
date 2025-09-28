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
 * Input props for the LoremIpsum component.
 * 
 * @since 0.1.0-alpha.draft
 */
export interface Props {

    /**
     * All heading levels to demo. Always includes 1-6.
     */
    allHeadingLevels?: number[];

    /**
     * Determines what kind of elements to include.
     */
    mode?: "minimum" | "fancy" | "library";
}