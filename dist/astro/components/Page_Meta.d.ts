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
 * Input props for the Page_Meta component.
 * 
 * @since 0.1.0-alpha.draft
 */
export interface Props {

    /**
     * Page meta title.
     */
    title: string;

    /**
     * Whether to allow archiving of this page.
     */
    archive?: boolean;

    /**
     * Whether to allow bot indexing of this page.
     */
    bots?: boolean;

    /**
     * Canonical URL or relative path.
     */
    canonical?: string | URL;

    description?: string;

    keywords?: string[];

    themeColor?: string;
}