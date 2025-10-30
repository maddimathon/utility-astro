/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.2
 * @license MIT
 */

/**
 * Input props for the MenuList component.
 * 
 * @since 0.1.0-alpha
 */
export interface Props {

    /**
     * An array of menu items to be displayed.
     * 
     * Must have at least one item.
     */
    menu: MenuItem[];

    /** 
     * Escaped HTML to insert between list items.
     */
    separator?: string | null;

    /** 
     * If the current menu is a submenu. Should probably only be used by the
     * component itself.
     * 
     * @internal
     */
    submenu?: boolean;
}

/**
 * A single menu item for the MenuList component.
 * 
 * @since 0.1.0-alpha
 */
export interface MenuItem {

    /** 
     * Display text for link item.
     */
    label: string;

    /**
     * If false, the link prints without href and with aria-disabled.  If null
     * or undefined, the list item is not printed at all.
     */
    href?: string | false;

    /**
     * Child menu items, if any.
     */
    child?: MenuItem[];

    /**
     * Whether this item should be marked as the current page.
     */
    current?: true | null;

    /**
     * Whether this item should be opened in a new window.
     */
    external?: boolean;
}