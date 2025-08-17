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

import type * as typedoc from 'typedoc';
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

import * as z from 'zod';

import type { Schemata } from '../00-types/index.js';

import {
    makeSortingIndex,
    parseCommentDisplayPart,
    parseKind,
} from '../01-functions/index.js';

import type {
    Project_Reflection,
} from '../02-classes/index.js';

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
    T_Reflection extends Schemata.Reflection.Any,
    T_Page extends Schemata.Page.Any,
> {

    constructor (
        protected readonly schemata: {
            page: z.ZodType<T_Page>,
            reflection: z.ZodType<T_Reflection>,
        },
    ) {
        this.getMarkdownFrontmatterString = this.getMarkdownFrontmatterString.bind( this );
        this.getPageMetadata = this.getPageMetadata.bind( this );
        this.getReflectionMetadata = this.getReflectionMetadata.bind( this );
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
    ): Schemata.PageGeneric<T_Reflection> {

        const reflect = this.getReflectionMetadata( page.model );

        return {
            ...page.frontmatter,

            customSlug: page.url.toLowerCase().replace( /\.md$/gi, '' ) || undefined,

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

            reflect,

        } satisfies Schemata.PageGeneric<T_Reflection>;
    }

    /**
     * Basic data for the given reflection.
     * 
     * @since ___PKG_VERSION___
     */
    public getReflectionMetadata(
        reflect: typedoc.Reflection,
    ): T_Reflection {

        let parent: number | undefined;

        if ( reflect.parent && parseKind( reflect.parent.kind ) !== 'Project' ) {
            parent = reflect.parent.id;
        }

        const flags: Project_Reflection.Any[ 'flags' ] = {
            abstract: reflect.flags.isAbstract || undefined,
            const: reflect.flags.isConst || undefined,
            external: reflect.flags.isExternal || undefined,
            inherited: reflect.flags.isInherited || undefined,
            optional: reflect.flags.isOptional || undefined,
            private: reflect.flags.isPrivate || undefined,
            protected: reflect.flags.isProtected || undefined,
            public: reflect.flags.isPublic || undefined,
            readonly: reflect.flags.isReadonly || undefined,
            rest: reflect.flags.isRest || undefined,
            static: reflect.flags.isStatic || undefined,

            experimental: undefined,
        };

        const blockTags = Array.from( reflect.comment?.blockTags ?? [] ).map(
            _tag => ( {
                tag: _tag.tag,
                content: parseCommentDisplayPart( _tag.content ),
                name: _tag.name,
            } )
        );

        const modifierTags = Array.from( reflect.comment?.modifierTags ?? [] );

        for ( const _tag of modifierTags ) {

            switch ( _tag ) {

                case '@experimental':
                    flags.experimental = true;
                    break;
            }
        }

        const base = {

            name: reflect.name,
            kind: parseKind( reflect.kind ),
            typeDocId: reflect.id,

            parent,

            fullName: reflect.getFriendlyFullName(),
            splitName: reflect.getFullName( '❖' ).split( '❖' ),

            flags: Object.values( flags ).some( ( _val ) => _val ) ? flags : undefined,

            blockTags: blockTags.length ? blockTags : undefined,
            modifierTags: modifierTags.length ? modifierTags : undefined,

        } satisfies Omit<Schemata.Reflection.Any, "sortingIndex">;

        return {
            ...base,

            sortingIndex: makeSortingIndex( base ),

            data: {},

            // FIXME - typing issue with generics
        } satisfies Objects.Classify<Schemata.Reflection.Any> as unknown as T_Reflection;
    }
}
