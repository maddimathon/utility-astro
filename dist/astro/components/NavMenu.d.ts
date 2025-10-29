/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha
 * @license MIT
 */

import type { MenuItem } from './MenuList';

/**
 * Input props for the NavMenu component.
 * 
 * @since 0.1.0-alpha
 */
export interface Props {

    /**
     * Screen-reader label for the navigation menu.
     */
    'aria-label': string;

    /** 
     * Unique id attr.
     */
    id: string;

    /** 
     * To pass to the `MenuList` component, see that component for details.
     * 
     * Must have at least one item.
     */
    menu: ( Omit<MenuItem, "child" | "href"> & {

        /**
         * If false, the link prints without href and with aria-disabled.  If
         * null or undefined, the list item is not printed at all.
         *
         * If a string, this is assumed to be a path relative to the home page.
         */
        href?: URL | string | false;

        /**
         * Child menu items, if any.
         */
        child?: Props[ 'menu' ];
    } )[];
}