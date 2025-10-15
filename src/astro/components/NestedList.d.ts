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
 * Individual list items.
 * 
 * @since ___PKG_VERSION___
 */
export type NestedListItem = {
    /**
     * Escaped HTML content for this item.
     */
    html: string;

    /**
     * Items for a sublist of this item.
     */
    children?: NestedListItem[];

    /**
     * Type of list to print for children, else inherits from parent list.
     */
    childrenTag?: "ol" | "ul";
};


/**
 * Input props for the NestedList component.
 * 
 * @since ___PKG_VERSION___
 */
export interface Props<T_Item extends NestedListItem = NestedListItem> {

    /**
     * Nested list to print.
     */
    list: T_Item[];

    /**
     * Type of list to print.
     * 
     * @default "ul"
     */
    tag?: "ol" | "ul";
}