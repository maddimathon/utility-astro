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

import type { Reflection } from 'typedoc';
import type { MarkdownApplication } from 'typedoc-plugin-markdown';

type MarkdownPluginParams = Parameters<Parameters<MarkdownApplication[ 'renderer' ][ 'markdownHooks' ][ 'on' ]>[ 1 ]>;

type MarkdownThemeContext = Omit<
    MarkdownPluginParams[ 0 ],
    "packagesMetaData"
>;

// import {
//     arrayUnique,
// } from '@maddimathon/utility-typescript/functions';

import * as YAML from 'yaml';

// import * as z from 'zod';

import type { Schemata } from '../00-types/index.js';

import {
    parseCommentDisplayPart,
    parseKind,
} from '../01-functions/index.js';

/**
 * Creates custom markdown export to work with the documentation components in
 * this package.
 *
 * @example
 * Create a file to initialize and export your plugin and include the path to 
 * that file in your typeDoc plugins configurtion.
 * {@includeCode ./MarkdownExport.example.ts#content}
 * ```ts
 * import type { MarkdownApplication } from 'typedoc-plugin-markdown';
 * import * as UA from '@maddimathon/utility-astro';
 * 
 * {@include ./MarkdownExport.example.ts#content}
 * ```
 *
 * @since ___PKG_VERSION___
 */
export class MarkdownExport<
    // T_ReflectionMetadata extends MarkdownExport.Default.Schema.Reflection,
    T_ReflectionMetadata extends typeof Schemata.Default.Metadata.REFLECTION,
    // T_PageMetadata extends T_ReflectionMetadata & MarkdownExport.Default.Schema.Page,
    T_PageMetadata extends T_ReflectionMetadata & typeof Schemata.Default.Metadata.REFLECTION,
> {

    constructor (
        protected readonly schemata: {
            page: T_PageMetadata,
            reflection: T_ReflectionMetadata,
        },
    ) {
        this.getMarkdownFrontmatterString = this.getMarkdownFrontmatterString.bind( this );
        this.getPageMetadata = this.getPageMetadata.bind( this );
        this.getReflectionMetadata = this.getReflectionMetadata.bind( this );

        // const propNames = arrayUnique(
        //     Object.getOwnPropertyNames( MarkdownExport.prototype )
        //         .concat( Object.getOwnPropertyNames( this.constructor.prototype ) )
        // ) as ( keyof MarkdownExport<T_ReflectionMetadata,T_PageMetadata> | "constructor" )[];

        // for ( const _name of propNames ) {

        //     // continues on match
        //     switch ( _name ) {

        //         case 'constructor':
        //             continue;
        //     }

        //     // continues
        //     if ( typeof this[ _name ] !== 'function' ) {
        //         continue;
        //     }

        //     // @ts-expect-error
        //     this[ _name ] = this[ _name ].bind( this );
        // }
    }

    /**
     * Creates a valid YAML string to insert at the beginning of the file.
     * 
     * @since ___PKG_VERSION___
     */
    public getMarkdownFrontmatterString(
        ...p: MarkdownPluginParams
    ): string {

        const [ args ] = p;

        args.page.frontmatter = this.getPageMetadata( args.page );

        return '---\n' + YAML.stringify( args.page.frontmatter ).trim() + '\n---\n';
    }

    /**
     * Basic data for the given page.
     * 
     * @since ___PKG_VERSION___
     */
    public getPageMetadata(
        page: MarkdownThemeContext[ 'page' ],
    ): Schemata.Default.Metadata.Page {

        const flags: Schemata.Default.Metadata.Page[ 'flags' ] = {
            abstract: page.model.flags.isAbstract || undefined,
            const: page.model.flags.isConst || undefined,
            external: page.model.flags.isExternal || undefined,
            inherited: page.model.flags.isInherited || undefined,
            optional: page.model.flags.isOptional || undefined,
            private: page.model.flags.isPrivate || undefined,
            protected: page.model.flags.isProtected || undefined,
            public: page.model.flags.isPublic || undefined,
            readonly: page.model.flags.isReadonly || undefined,
            rest: page.model.flags.isRest || undefined,
            static: page.model.flags.isStatic || undefined,

            experimental: undefined,
        };

        const modifierTags = Array.from( page.model.comment?.modifierTags ?? [] );

        for ( const _tag of modifierTags ) {

            switch ( _tag ) {

                case '@experimental':
                    flags.experimental = true;
                    break;
            }
        }

        const blockTags = Array.from( page.model.comment?.blockTags ?? [] ).map( _tag => ( {
            tag: _tag.tag,
            content: parseCommentDisplayPart( _tag.content ),
            name: _tag.name,
        } ) );

        return {
            ...page.frontmatter,
            ...this.getReflectionMetadata( page.model ),

            fullName: page.model.getFriendlyFullName(),

            customSlug: page.url.toLowerCase().replace( /\.md$/gi, '' ) || undefined,

            splitName: page.model.getFullName( '❖' ).split( '❖' ),

            flags: Object.values( flags ).some( ( _val ) => _val ) ? flags : undefined,

            // comment: page.model.comment,

            modifierTags: modifierTags.length ? modifierTags : undefined,

            blockTags: blockTags.length ? blockTags : undefined,

            pageSections: page.pageSections.map( _sec => ( {
                title: _sec.title,
                headings: _sec.headings.map( _hdg => ( {
                    link: _hdg.link,
                    text: _hdg.text,
                    level: _hdg.level,
                    kind: _hdg.kind ? parseKind( _hdg.kind ) : _hdg.kind,
                    classes: _hdg.classes,
                } ) ),
            } ) ),

        } satisfies Schemata.Default.Metadata.Page;
    }

    /**
     * Basic data for the given reflection.
     * 
     * @since ___PKG_VERSION___
     */
    public getReflectionMetadata(
        reflect: Reflection,
        __isRecursiveCall = false,
    ): Schemata.Default.Metadata.Reflection {

        let parent: Schemata.Default.Metadata.Reflection | undefined;

        if ( reflect.parent && parseKind( reflect.parent.kind ) !== 'Project' ) {
            parent = this.getReflectionMetadata( reflect.parent, true );
        }

        return {

            name: reflect.name,
            kind: parseKind( reflect.kind ),
            typeDocId: reflect.id,

            parent,

        } as const satisfies Objects.Classify<Schemata.Default.Metadata.Reflection>;
    }
}

/**
 * Support utilities for the {@link MarkdownExport} class.
 * 
 * @since ___PKG_VERSION___
 */
export namespace MarkdownExport {

    // /**
    //  * Default values used within the class or to extend.
    //  * 
    //  * @since ___PKG_VERSION___
    //  */
    // export namespace Default {

    //     /**
    //      * Zod schemas used by the plugin.
    //      * 
    //      * @since ___PKG_VERSION___
    //      */
    //     export namespace Schema {

    //         export interface ReflectionType {
    //             name: string;
    //             kind: parseKind.Return;
    //             typeDocId: number;

    //             parent?: ReflectionType;
    //         };

    //         export const REFLECTION = z.object( {

    //             name: z.string(),
    //             kind: parseKind.returnSchema,
    //             typeDocId: z.number(),

    //             get parent(): z.ZodOptional<z.ZodType<ReflectionType>> {
    //                 return REFLECTION.optional();
    //             },

    //         } ) satisfies z.ZodType<Objects.Classify<ReflectionType>>;


    //         export interface PageType {
    //             fullName: string;

    //             pageSections: {

    //                 headings: {
    //                     link: string,
    //                     text: string,

    //                     classes?: string,
    //                     kind?: z.infer<typeof parseKind.returnSchema>,
    //                     level?: number,
    //                 }[],

    //                 title: string,
    //             }[];

    //             splitName: string[];

    //             flags?: {
    //                 abstract?: true;
    //                 const?: true;
    //                 experimental?: true;
    //                 external?: true;
    //                 inherited?: true;
    //                 optional?: true;
    //                 private?: true;
    //                 protected?: true;
    //                 public?: true;
    //                 readonly?: true;
    //                 rest?: true;
    //                 static?: true;
    //             };

    //             blockTags?: {

    //                 content: {
    //                     kind: string,
    //                     text: string,

    //                     tag?: string,
    //                     target?: string,
    //                     targetAnchor?: string,
    //                     tsLinkText?: string,
    //                 }[];

    //                 tag: string;
    //                 name?: string;
    //             }[];

    //             customSlug?: string;
    //             modifierTags?: string[];
    //         };

    //         export const PAGE = {

    //             fullName: z.string(),

    //             customSlug: z.string().optional(),

    //             splitName: z.array( z.string() ),

    //             flags: z.object( {
    //                 abstract: z.literal( true ),
    //                 const: z.literal( true ),
    //                 experimental: z.literal( true ),
    //                 external: z.literal( true ),
    //                 inherited: z.literal( true ),
    //                 optional: z.literal( true ),
    //                 private: z.literal( true ),
    //                 protected: z.literal( true ),
    //                 public: z.literal( true ),
    //                 readonly: z.literal( true ),
    //                 rest: z.literal( true ),
    //                 static: z.literal( true ),
    //             } ).partial().optional(),

    //             modifierTags: z.array( z.string() ).optional(),

    //             blockTags: z.array( z.object( {
    //                 tag: z.string(),

    //                 content: z.array( z.object( {
    //                     kind: z.string(),
    //                     text: z.string(),

    //                     tag: z.string().optional(),
    //                     target: z.string().optional(),
    //                     targetAnchor: z.string().optional(),
    //                     tsLinkText: z.string().optional(),
    //                 } ) ),

    //                 name: z.string().optional(),
    //             } ) ).optional(),

    //             pageSections: z.array( z.object( {
    //                 title: z.string(),
    //                 headings: z.array( z.object( {
    //                     link: z.string(),
    //                     text: z.string(),
    //                     level: z.number().optional(),
    //                     kind: parseKind.returnSchema.optional(),
    //                     classes: z.string().optional(),
    //                 } ) ),
    //             } ) ),
    //         } satisfies {
    //             [ K in keyof Objects.Classify<PageType> ]: z.ZodType<Objects.Classify<PageType>[ K ]>;
    //         };
    //     }
    // }
}