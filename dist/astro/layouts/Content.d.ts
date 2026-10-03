/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.3
 * @license MIT
 */

import type { HTMLAttributes } from 'astro/types';

import type { MainProps } from './Main.astro';
import type { SidebarProps } from './Sidebar.astro';

/**
 * @since 0.1.0-alpha.17 — Moved to component file.
 */
export type ContentType =
    | 'content-only'
    | 'full-width'
    | 'extra-wide'
    | 'sidebar-left'
    | 'sidebar-right';

/**
 * @since 0.1.0-alpha.17 — Moved to component file.
 */
export type DefaultContentType = Extract<ContentType, 'content-only'>;

/**
 * @since 0.1.0-beta.2
 */
export type ContentTypeInput =
    | ContentType
    | [ string, ( ( props: ContentProps_Full<string> ) => any ) ];

/**
 * Input props for the Content component.
 *
 * @since 0.1.0-alpha
 * @since 0.1.0-alpha.17 — Moved to component file.
 */
export interface ContentProps<T_Type extends ContentTypeInput = DefaultContentType> {

    attrs?: T_Type extends 'sidebar-left' | 'sidebar-right'
    ? {
        main?: MainProps | undefined;
        sidebar?: HTMLAttributes<'aside'> | undefined;
    }
    : {
        main?: MainProps | undefined;
    };

    /**
     * To display (in a h1).
     */
    title: string | string[] | undefined;

    type?: T_Type | undefined;

    subtitle?: string | undefined;
}

/**
 * Completed props for the Content sub-components.
 *
 * @since 0.1.0-alpha
 * @since 0.1.0-alpha.17 — Moved to component file.
 */
export type ContentProps_Full<T_Type extends ContentType | string> = {
    [ K in keyof Omit<ContentProps, 'attrs' | 'type'> ]-?: ContentProps[ K ];
} & {
    type: string;
} & {
    attrs: T_Type extends 'sidebar-left' | 'sidebar-right'
    ? {
        main: MainProps;
        sidebar: SidebarProps;
    }
    : {
        main: MainProps;
        sidebar?: SidebarProps | undefined;
    };

    // [ key: string ]: unknown;
};