/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
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
export type DefaultContentType = 'content-only' & ContentType;

/**
 * Input props for the Content component.
 *
 * @since 0.1.0-alpha
 * @since 0.1.0-alpha.17 — Moved to component file.
 */
export interface ContentProps<T_Type extends ContentType = DefaultContentType> {

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
export type ContentProps_Full<T_Type extends ContentType> = {
    [ K in keyof Omit<ContentProps, 'attrs'> ]-?: ContentProps[ K ];
} & {
    attrs: T_Type extends 'sidebar-left' | 'sidebar-right'
    ? {
        main: MainProps;
        sidebar: SidebarProps;
    }
    : {
        main: MainProps;
    };

    // [ key: string ]: unknown;
};