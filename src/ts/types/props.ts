/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { HTMLAttributes, HTMLTag } from 'astro/types';

/**
 * Creates a props object for components.
 */
export type ComponentProps<
    T_Props,
    T_HtmlTag extends HTMLTag | never = never,
> =
    (
        never extends T_HtmlTag
        ? {}
        : Omit<HTMLAttributes<T_HtmlTag>, "class">
    )
    & {
        frontmatter?: Omit<T_Props, "frontmatter">;
    };