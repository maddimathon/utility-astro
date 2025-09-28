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
 * Input props for the Heading component.
 * 
 * @since ___PKG_VERSION___
 */
export interface Props {

    /**
     * Logical heading order value for this heading.
     */
    heading: number;

    /**
     * Value for component's `class` attribute.
     */
    class?: string | string[] | { [ key: string ]: boolean | string; };

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