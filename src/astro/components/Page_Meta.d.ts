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
 * Input props for the Page_Meta component.
 * 
 * @since ___PKG_VERSION___
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