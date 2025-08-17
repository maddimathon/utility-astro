/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { Objects } from '@maddimathon/utility-typescript/types';

import type { Project_Reflection } from './Project_Reflection.js';

import {
    Schemata,
} from '../00-types/index.js';

import type {
    parseKind,
} from '../01-functions/index.js';

export class Project_Page<
    T_Reflection extends Project_Page.ReflectionParam<T_Kind>,
    T_Kind extends parseKind.Return,
> implements Objects.Classify<Schemata.PageGeneric<T_Reflection>> {

    public reflect: T_Reflection;
    public pageSections: Schemata.PageGeneric<T_Reflection>[ 'pageSections' ];

    public customSlug: string | undefined;

    public constructor ( page: Schemata.PageGeneric<T_Reflection> ) {
        this.reflect = page.reflect;
        this.pageSections = page.pageSections;

        this.customSlug = page.customSlug;
    }

    /**
     * Creates a cleaner output for conversion.
     * 
     * @since ___PKG_VERSION___
     */
    public toJSON(): Objects.Classify<Schemata.PageGeneric<T_Reflection>> {

        return {
            customSlug: this.customSlug,
            pageSections: this.pageSections,
            reflect: this.reflect,
        };
    }
}

export namespace Project_Page {

    export type Any = Project_Page<Project_Reflection.Any & { hasOwnPage: true; }, parseKind.Return>;

    export type ReflectionParam<
        T_Kind extends parseKind.Return = parseKind.Return,
    > = Project_Reflection<T_Kind> & { hasOwnPage: true; };
}