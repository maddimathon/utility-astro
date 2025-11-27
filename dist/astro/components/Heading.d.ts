/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.6
 * @license MIT
 */

/**
 * Input props for the Heading component.
 * 
 * @since 0.1.0-alpha
 */
export interface Props {

    /**
     * Logical heading order value for this heading.
     */
    heading: number;

    /**
     * If any, the heading display level override for this heading (otherwise
     * the `heading` value is used).
     */
    displayHeading?: number;

    /**
     * The minimum allowed value for this heading.
     */
    minimum?: number;
}