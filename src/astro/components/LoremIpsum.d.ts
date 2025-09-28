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
 * Input props for the LoremIpsum component.
 * 
 * @since ___PKG_VERSION___
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