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
     * Additional button variations to include. 'primary' and 'disabled' are
     * always included.
     *
     * @default 'secondary'
     */
    buttonVariations?: string[];

    /**
     * The starting heading level.
     * 
     * @default 2
     */
    heading?: number;

    /**
     * The starting visual heading level.
     * 
     * @default null
     */
    displayHeading?: null | number;

    /**
     * Determines what kind of elements to include.
     */
    mode?: "minimum" | "fancy" | "library";
}