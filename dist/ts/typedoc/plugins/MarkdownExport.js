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
import * as z from 'zod';
import { makeSortingIndex, parseCommentDisplayPart, parseKind, } from '../01-functions/index.js';
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
        const reflect = this.getReflectionMetadata(page.model);
        return {
            ...page.frontmatter,
            customSlug: page.url.toLowerCase().replace(/\.md$/gi, '') || undefined,
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
            reflect,
        };
    }
    /**
     * Basic data for the given reflection.
     *
     * @since 0.1.0-alpha.draft
     */
    getReflectionMetadata(reflect) {
        let parent;
        if (reflect.parent && parseKind(reflect.parent.kind) !== 'Project') {
            parent = reflect.parent.id;
        }
        const flags = {
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
        const blockTags = Array.from(reflect.comment?.blockTags ?? []).map(_tag => ({
            tag: _tag.tag,
            content: parseCommentDisplayPart(_tag.content),
            name: _tag.name,
        }));
        const modifierTags = Array.from(reflect.comment?.modifierTags ?? []);
        for (const _tag of modifierTags) {
            switch (_tag) {
                case '@experimental':
                    flags.experimental = true;
                    break;
            }
        }
        const base = {
            name: reflect.name,
            kind: parseKind(reflect.kind),
            typeDocId: reflect.id,
            parent,
            fullName: reflect.getFriendlyFullName(),
            splitName: reflect.getFullName('❖').split('❖'),
            flags: Object.values(flags).some((_val) => _val) ? flags : undefined,
            blockTags: blockTags.length ? blockTags : undefined,
            modifierTags: modifierTags.length ? modifierTags : undefined,
        };
        return {
            ...base,
            sortingIndex: makeSortingIndex(base),
            data: {},
            // FIXME - typing issue with generics
        };
    }
}
//# sourceMappingURL=MarkdownExport.js.map