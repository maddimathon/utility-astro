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
 * Input props for the SkipLinks component.
 * 
 * @since 0.1.0-alpha.draft
 */
export interface Props {

    /**
     * The links used for skipping.
     */
    links: {
        label: string;
        href: string;
    }[];

    /** 
     * Value for component's `class` attribute.
     */
    class?: string | string[];
}