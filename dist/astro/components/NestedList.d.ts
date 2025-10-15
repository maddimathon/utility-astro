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
 * Individual list items.
 * 
 * @since 0.1.0-alpha.draft
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
 * @since 0.1.0-alpha.draft
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