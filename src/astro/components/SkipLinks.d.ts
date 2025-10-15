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
 * Input props for the SkipLinks component.
 * 
 * @since ___PKG_VERSION___
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