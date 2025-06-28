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
 * 
 * @example
 * ```ts
 * export type Props = GenericProps<PageProps>;
 * ```
 */
export type GenericProps<T_Props> = T_Props & {
    frontmatter?: Omit<T_Props, "frontmatter">;
};

/**
 * Creates a props object for components, with attributes inherited from the
 * HTML attributes for the given tag(s).
 *
 * @example
 * ```ts
 * export type Props = GenericElementProps<PageProps, "div"|"a">;
 * ```
 */
export type GenericElementProps<
    T_Props,
    T_HtmlTag extends HTMLTag,
> = GenericProps<T_Props>
    & Partial<Omit<
        HTMLAttributes<T_HtmlTag>,
        keyof T_Props | "class"
    >>
    & {
        'aria-description'?: string;
    };