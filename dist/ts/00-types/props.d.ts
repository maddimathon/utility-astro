/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.15
 * @license MIT
 */
import type { HTMLAttributes, HTMLTag } from 'astro/types';
export type ClassList = undefined | string | {
    [key: string]: boolean | undefined;
} | ClassList[];
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
export type ElementProps<T_Props, T_HtmlTag extends HTMLTag, T_OmitKeys extends number | string = keyof T_Props & number | string> = T_Props & Partial<Omit<HTMLAttributes<T_HtmlTag>, T_OmitKeys | "class" | "class:list">> & {
    'aria-description'?: string;
    class?: ClassList;
};
/**
 * Creates a props object for components, with attributes inherited from the
 * HTML attributes for the given tag(s).
 *
 * @example
 * ```ts
 * export type Props = GenericElementProps<PageProps, "div"|"a">;
 * ```
 *
 * @since 0.1.0-alpha.7 — Added optional T_OmitKeys type param.
 */
export type GenericElementProps<T_Props, T_HtmlTag extends HTMLTag, T_OmitKeys extends number | string = never> = GenericProps<T_Props & {
    class?: ClassList;
}> & Partial<Omit<HTMLAttributes<T_HtmlTag>, T_OmitKeys | "class" | "class:list">> & {
    'aria-description'?: string;
};
//# sourceMappingURL=props.d.ts.map