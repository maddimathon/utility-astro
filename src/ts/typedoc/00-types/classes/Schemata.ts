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

import { parseKind } from '../../01-functions/parseKind.js';

/**
 * Zod schemas used by the plugins.
 * 
 * @since ___PKG_VERSION___
 */
export class Schemata<
    T_ReflectionMetadata_Schema extends typeof Schemata.Default.Metadata.REFLECTION,
    T_PageMetadata_Schema extends typeof Schemata.Default.Metadata.PAGE,
> {

    constructor (
        protected readonly input?: {
            metadata?: {
                reflection?: T_ReflectionMetadata_Schema,
                page?: T_PageMetadata_Schema,
            },
        },
    ) { }

    public get metadata() {

        const reflection = this.input?.metadata?.reflection
            ?? Schemata.Default.Metadata.REFLECTION as T_ReflectionMetadata_Schema;

        const page = reflection.extend(
            this.input?.metadata?.page?.shape
            ?? ( Schemata.Default.Metadata.PAGE as T_PageMetadata_Schema ).shape
        );

        return { page, reflection };
    }
}

/**
 * Supports the {@link Schemata} class.
 * 
 * @since ___PKG_VERSION___
 */
export namespace Schemata {

    /**
     * Default values used within the class or to extend.
     * 
     * @since ___PKG_VERSION___
     */
    export namespace Default {

        /**
         * Objects representing metadata for objects in the TypeDoc export.
         * 
         * @since ___PKG_VERSION___
         */
        export namespace Metadata {
            /**
             * Base schema for the simplest reflection metadata object in the
             * TypeDoc export.
             *
             * @since ___PKG_VERSION___
             */
            export interface Reflection {
                name: string;
                kind: parseKind.Return;
                typeDocId: number;

                parent?: Reflection;
            };

            /**
             * {@inheritDoc Reflection}
             *
             * @since ___PKG_VERSION___
             */
            export const REFLECTION = z.object( {

                name: z.string(),
                kind: parseKind.returnSchema,
                typeDocId: z.number(),

                get parent(): z.ZodOptional<z.ZodType<Reflection>> {
                    return REFLECTION.optional();
                },

            } as const satisfies {
                [ K in keyof Objects.Classify<Reflection> ]: z.ZodType<Objects.Classify<Reflection>[ K ]>;
            } );

            /**
             * Base schema for a doc page's metadata in the TypeDoc export.
             * 
             * @since ___PKG_VERSION___
             */
            export interface Page {
                fullName: string;

                pageSections: {

                    headings: {
                        link: string,
                        text: string,

                        classes?: string,
                        kind?: z.infer<typeof parseKind.returnSchema>,
                        level?: number,
                    }[],

                    title: string,
                }[];

                splitName: string[];

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

                customSlug?: string;
                modifierTags?: string[];
            };

            /**
             * {@inheritDoc Page}
             * 
             * @since ___PKG_VERSION___
             */
            export const PAGE = z.object( {

                fullName: z.string(),

                customSlug: z.string().optional(),

                splitName: z.array( z.string() ),

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

                pageSections: z.array( z.object( {
                    title: z.string(),
                    headings: z.array( z.object( {
                        link: z.string(),
                        text: z.string(),
                        level: z.number().optional(),
                        kind: parseKind.returnSchema.optional(),
                        classes: z.string().optional(),
                    } ) ),
                } ) ),
            } as const satisfies {
                [ K in keyof Objects.Classify<Page> ]: z.ZodType<Objects.Classify<Page>[ K ]>;
            } );
        }
    }
}