/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Input props for the SkipLinks component.
 * 
 * @since 0.1.0-alpha
 */
export interface Props {

    /**
     * The links used for skipping.
     */
    links: {
        label: string;
        href: string;
    }[];
}