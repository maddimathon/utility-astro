/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type {
    HTMLTag as HTMLTag_Astro,
    HTMLAttributes as HTMLAttributes_Astro,
} from 'astro/types';

/**
 * @since 0.1.0-beta.3
 */
export type HTMLAttributes_Map = {
    [ T in HTMLTag_Astro ]: HTMLAttributes_Astro<T>
} & {
    false: {};
    null: {};
};

/**
 * @since 0.1.0-beta.3
 */
export type HTMLTag = keyof HTMLAttributes_Map;

/**
 * @since 0.1.0-beta.3
 */
export type HTMLAttributes<T_Tag extends HTMLTag> = HTMLAttributes_Map[ T_Tag ];

/**
 * @since 0.1.0-alpha
 */
export type ClassListItem = Exclude<ClassList, Iterable<any>>;

/**
 * @since 0.1.0-alpha
 */
export type ClassList = string | Record<string, boolean> | Iterable<string> | Iterable<string | Record<string, boolean>>;

/**
 * @since 0.1.0-beta.3
 */
export type PropsChildrenOnly =
    | {
        children: any;
        'set:html'?: undefined;
        'set:text'?: undefined;
    }
    | {
        children?: undefined;
        'set:html': string;
        'set:text'?: undefined;
    }
    | {
        children?: undefined;
        'set:html'?: undefined;
        'set:text': string;
    };

/**
 * @since 0.1.0-beta.3
 */
export type PropsNoChildren = {
    children?: undefined;
    'set:html'?: undefined;
    'set:text'?: undefined;
};

/**
 * @since 0.1.0-beta.3
 */
export type PropsForbidChildren<T_Props = {}> = Omit<T_Props, 'children'> & PropsNoChildren;

/**
 * @since 0.1.0-beta.3
 */
export type PropsOptionalChildren<T_Props = {}> = Omit<T_Props, 'children'> & Partial<PropsChildrenOnly>;

/**
 * @since 0.1.0-beta.3
 */
export type PropsRequireChildren<T_Props = {}> = Omit<T_Props, 'children'> & PropsChildrenOnly;

/**
 * Creates a props object for components, with attributes inherited from the
 * HTML attributes for the given tag(s).
 *
 * @example
 * ```ts
 * export type Props = ElementProps<PageProps, "div"|"a">;
 * ```
 * 
 * @since 0.1.0-alpha
 */
export type ElementProps<
    T_Props,
    T_HtmlTag extends HTMLTag,
    T_OmitAttributes extends number | string | symbol = keyof T_Props,
> = T_Props & Omit<
    HTMLAttributes<T_HtmlTag>,
    T_OmitAttributes | "class" | "class:list" | "style"
> & {
    'aria-ignore'?: undefined | null | boolean;
    'aria-description'?: undefined | null | string;
    class?: undefined | ClassList;
    id?: undefined | string;
    style?: undefined | null | string;
} & {
        [ K in `data-${ string }` ]?: undefined | null | string;
    };

/**
 * Creates a props object for components.
 * 
 * @example
 * ```ts
 * export type Props = GenericProps<PageProps>;
 * ```
 * 
 * @since 0.1.0-alpha
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
 * 
 * @since 0.1.0-alpha
 * @since 0.1.0-alpha.7 — Added optional T_OmitAttributes type param.
 */
export type GenericElementProps<
    T_Props,
    T_HtmlTag extends HTMLTag,
    T_OmitAttributes extends number | string | symbol = keyof T_Props,
> = GenericProps<ElementProps<T_Props, T_HtmlTag, T_OmitAttributes>>;