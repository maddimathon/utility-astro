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

import * as z from 'zod';

import { Literals } from './Literals.js';


/**
 * Zod schemas used in the TypeDoc plugins and utilities.
 * 
 * @since ___PKG_VERSION___
 */
export namespace Schemata {

    type _ZodChecker<T_Obj extends object> = {
        [ K in keyof Objects.Classify<T_Obj> ]: z.ZodType<Objects.Classify<T_Obj>[ K ]>;
    };

    /**
     * Base schema for the simplest reflection metadata object in the TypeDoc
     * export.
     *
     * @remarks
     * This is an explicit interface rather than a zod inference for
     * better/easier generic typing.
     *
     * @since ___PKG_VERSION___
     */
    export interface ReflectionGeneric<
        T_Kind extends Literals.Reflections.Kind.Any,
        T_Data extends Record<string, unknown> | undefined = Record<string, unknown> | undefined,
    > {

        name: string;
        kind: T_Kind;
        typeDocId: number;

        fullName: string;
        splitName: string[];

        sortingIndex: string;

        blockTags?: {

            content: {
                kind: string,
                text: string,

                tag?: string,
                target?: string,
                targetAnchor?: string,
                tsLinkText?: string,
            }[];

            tag: string;

            name?: string;
        }[];

        data?: T_Data;

        flags?: {
            abstract?: true;
            const?: true;
            experimental?: true;
            external?: true;
            inherited?: true;
            optional?: true;
            private?: true;
            protected?: true;
            public?: true;
            readonly?: true;
            rest?: true;
            static?: true;
        };

        modifierTags?: string[];

        /**
         * The typeDocId value of the parent reflection.
         */
        parent?: number;
    };


    /**
     * Zod schema for the {@link Schemata.ReflectionGeneric} interface.
     *
     * @since ___PKG_VERSION___
     */
    export function Reflection() {

        return z.object( {

            name: z.string(),
            kind: Literals.Reflections.Kind.Any,
            typeDocId: z.number(),

            data: z.union( [ z.record( z.string(), z.unknown() ), z.undefined() ] ).optional(),
            fullName: z.string(),
            splitName: z.array( z.string() ),

            blockTags: z.array( z.object( {
                tag: z.string(),

                content: z.array( z.object( {
                    kind: z.string(),
                    text: z.string(),

                    tag: z.string().optional(),
                    target: z.string().optional(),
                    targetAnchor: z.string().optional(),
                    tsLinkText: z.string().optional(),
                } ) ),

                name: z.string().optional(),
            } ) ).optional(),

            flags: z.object( {
                abstract: z.literal( true ),
                const: z.literal( true ),
                experimental: z.literal( true ),
                external: z.literal( true ),
                inherited: z.literal( true ),
                optional: z.literal( true ),
                private: z.literal( true ),
                protected: z.literal( true ),
                public: z.literal( true ),
                readonly: z.literal( true ),
                rest: z.literal( true ),
                static: z.literal( true ),
            } ).partial().optional(),

            modifierTags: z.array( z.string() ).optional(),

            parent: z.number().optional(),

            sortingIndex: z.string(),

        } satisfies _ZodChecker<Schemata.ReflectionGeneric<Literals.Reflections.Kind.Any>> );
    };

    /**
     * Contains more specific reflection schemas.
     * 
     * @since ___PKG_VERSION___
     */
    export namespace Reflection {

        export type Any = Schemata.ReflectionGeneric<Literals.Reflections.Kind.Any>;


        export interface Class extends z.infer<typeof Schemata.Reflection.Class> { }

        export const Class = z.object( {
            ...Schemata.Reflection().shape,

            kind: z.literal( "Class" ),
        } );


        export interface Function extends z.infer<typeof Schemata.Reflection.Function> { }

        export const Function = z.object( {
            ...Schemata.Reflection().shape,

            kind: z.union( [
                z.literal( "Accessor" ),
                z.literal( "Constructor" ),
                z.literal( "Function" ),
                z.literal( "GetSignature" ),
                z.literal( "Method" ),
                z.literal( "SetSignature" ),
            ] ),
        } );


        export interface Module extends z.infer<typeof Schemata.Reflection.Module> { }

        export const Module = z.object( {
            ...Schemata.Reflection().shape,

            kind: z.literal( "Module" ),
        } );


        export interface Namespace extends z.infer<typeof Schemata.Reflection.Namespace> { }

        export const Namespace = z.object( {
            ...Schemata.Reflection().shape,

            kind: z.literal( "Namespace" ),
        } );


        export interface Plain extends z.infer<typeof Schemata.Reflection.Plain> { }

        export const Plain = z.object( {
            ...Schemata.Reflection().shape,

            kind: z.literal( "Document" ),
        } );


        export interface Type extends z.infer<typeof Schemata.Reflection.Type> { }

        export const Type = z.object( {
            ...Schemata.Reflection().shape,

            kind: z.union( [
                z.literal( "Interface" ),
                z.literal( "TypeAlias" ),
                z.literal( "TypeLiteral" ),
                z.literal( "TypeParameter" ),
            ] ),
        } );


        export interface Unknown extends z.infer<typeof Schemata.Reflection.Unknown> { }

        export const Unknown = z.object( {
            ...Schemata.Reflection().shape,

            kind: z.union( [
                z.literal( "CallSignature" ),
                z.literal( "ConstructorSignature" ),
                z.literal( "IndexSignature" ),
                z.literal( "Parameter" ),
                z.literal( "Project" ),
                z.literal( "Reference" ),
            ] ),
        } );


        export interface Value extends z.infer<typeof Schemata.Reflection.Value> { }

        export const Value = z.object( {
            ...Schemata.Reflection().shape,

            kind: z.union( [
                z.literal( "Enum" ),
                z.literal( "EnumMember" ),
                z.literal( "Property" ),
                z.literal( "Variable" ),
            ] ),
        } );
    }

    /**
     * Base schema for a doc page's metadata in the TypeDoc export.
     * 
     * @since ___PKG_VERSION___
     */
    export interface PageGeneric<
        T_Reflection extends Schemata.Reflection.Any,
    > {

        pageSections: {

            headings: {
                link: string,
                text: string,

                classes?: string,
                kind?: Literals.Reflections.Kind.Any,
                level?: number,
            }[],

            title: string,
        }[];

        reflect: T_Reflection;

        customSlug?: string;
    };


    /**
     * {@inheritDoc Schemata.Page}
     * 
     * @since ___PKG_VERSION___
     */
    export function Page() {

        return z.object( {

            customSlug: z.string().optional(),

            pageSections: z.array( z.object( {
                title: z.string(),
                headings: z.array( z.object( {
                    link: z.string(),
                    text: z.string(),
                    level: z.number().optional(),
                    kind: Literals.Reflections.Kind.Any.optional(),
                    classes: z.string().optional(),
                } ) ),
            } ) ),

            reflect: Schemata.Reflection(),

        } satisfies _ZodChecker<Schemata.PageGeneric<Schemata.Reflection.Any>> );
    };

    /**
     * Contains more specific page schemas.
     * 
     * @since ___PKG_VERSION___
     */
    export namespace Page {

        export type Any = Schemata.PageGeneric<Schemata.Reflection.Any>;
    }
}