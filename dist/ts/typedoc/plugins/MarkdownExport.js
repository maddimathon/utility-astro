/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
// import {
//     arrayUnique,
// } from '@maddimathon/utility-typescript/functions';
import * as YAML from 'yaml';
import { parseCommentDisplayPart, parseKind, } from '../01-functions/index.js';
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
 * @since 0.1.0-alpha.draft
 */
export class MarkdownExport {
    schemata;
    constructor(schemata) {
        this.schemata = schemata;
        this.getMarkdownFrontmatterString = this.getMarkdownFrontmatterString.bind(this);
        this.getPageMetadata = this.getPageMetadata.bind(this);
        this.getReflectionMetadata = this.getReflectionMetadata.bind(this);
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
     * @since 0.1.0-alpha.draft
     */
    getMarkdownFrontmatterString(...p) {
        const [args] = p;
        args.page.frontmatter = this.getPageMetadata(args.page);
        return '---\n' + YAML.stringify(args.page.frontmatter).trim() + '\n---\n';
    }
    /**
     * Basic data for the given page.
     *
     * @since 0.1.0-alpha.draft
     */
    getPageMetadata(page) {
        const flags = {
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
        const modifierTags = Array.from(page.model.comment?.modifierTags ?? []);
        for (const _tag of modifierTags) {
            switch (_tag) {
                case '@experimental':
                    flags.experimental = true;
                    break;
            }
        }
        const blockTags = Array.from(page.model.comment?.blockTags ?? []).map(_tag => ({
            tag: _tag.tag,
            content: parseCommentDisplayPart(_tag.content),
            name: _tag.name,
        }));
        return {
            ...page.frontmatter,
            ...this.getReflectionMetadata(page.model),
            fullName: page.model.getFriendlyFullName(),
            customSlug: page.url.toLowerCase().replace(/\.md$/gi, '') || undefined,
            splitName: page.model.getFullName('❖').split('❖'),
            flags: Object.values(flags).some((_val) => _val) ? flags : undefined,
            // comment: page.model.comment,
            modifierTags: modifierTags.length ? modifierTags : undefined,
            blockTags: blockTags.length ? blockTags : undefined,
            pageSections: page.pageSections.map(_sec => ({
                title: _sec.title,
                headings: _sec.headings.map(_hdg => ({
                    link: _hdg.link,
                    text: _hdg.text,
                    level: _hdg.level,
                    kind: _hdg.kind ? parseKind(_hdg.kind) : _hdg.kind,
                    classes: _hdg.classes,
                })),
            })),
        };
    }
    /**
     * Basic data for the given reflection.
     *
     * @since 0.1.0-alpha.draft
     */
    getReflectionMetadata(reflect, __isRecursiveCall = false) {
        let parent;
        if (reflect.parent && parseKind(reflect.parent.kind) !== 'Project') {
            parent = this.getReflectionMetadata(reflect.parent, true);
        }
        return {
            name: reflect.name,
            kind: parseKind(reflect.kind),
            typeDocId: reflect.id,
            parent,
        };
    }
}
//# sourceMappingURL=MarkdownExport.js.map