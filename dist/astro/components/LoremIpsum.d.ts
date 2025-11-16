/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.4
 * @license MIT
 */

/**
 * Input props for the LoremIpsum component.
 * 
 * @since 0.1.0-alpha
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