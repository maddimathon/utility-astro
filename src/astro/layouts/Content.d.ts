/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { Props as MainProps } from './Main.d.ts';
import type { Props as SidebarProps } from './Sidebar.d.ts';

export type ContentType =
    | "content-only"
    | "full-width"
    | "extra-wide"
    | "sidebar-left"
    | "sidebar-right";

export type DefaultContentType = "content-only" & ContentType;

/**
 * Input props for the Content component.
 * 
 * @since ___PKG_VERSION___
 */
export interface Props<
    T_Type extends ContentType = DefaultContentType,
> {

    attrs?: T_Type extends "sidebar-left" | "sidebar-right" ? {
        main?: MainProps,
        sidebar?: HTMLAttributes<"aside">,
    } : {
        main?: MainProps,
    };

    /**
     * To display (in a h1).
     */
    title: string | string[] | null;

    subtitle?: string | null;
}

/**
 * Completed props for the Content sub-components.
 * 
 * @since ___PKG_VERSION___
 */
export type Props_Full<
    T_Type extends ContentType,
> = {
    [ K in keyof Omit<Props, "attrs"> ]-?: Props[ K ];
} & {

    attrs: T_Type extends "sidebar-left" | "sidebar-right" ? {
        main: MainProps,
        sidebar: SidebarProps,
    } : {
        main: MainProps,
    };

    // [ key: string ]: unknown;
};