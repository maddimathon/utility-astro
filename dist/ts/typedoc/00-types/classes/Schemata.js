/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import * as z from 'zod';
import { parseKind } from '../../01-functions/parseKind.js';
/**
 * Zod schemas used by the plugins.
 *
 * @since 0.1.0-alpha.draft
 */
export class Schemata {
    input;
    constructor(input) {
        this.input = input;
    }
    get metadata() {
        const reflection = this.input?.metadata?.reflection
            ?? Schemata.Default.Metadata.REFLECTION;
        const page = reflection.extend(this.input?.metadata?.page?.shape
            ?? Schemata.Default.Metadata.PAGE.shape);
        return { page, reflection };
    }
}
/**
 * Supports the {@link Schemata} class.
 *
 * @since 0.1.0-alpha.draft
 */
(function (Schemata) {
    /**
     * Default values used within the class or to extend.
     *
     * @since 0.1.0-alpha.draft
     */
    let Default;
    (function (Default) {
        /**
         * Objects representing metadata for objects in the TypeDoc export.
         *
         * @since 0.1.0-alpha.draft
         */
        let Metadata;
        (function (Metadata) {
            ;
            /**
             * {@inheritDoc Reflection}
             *
             * @since 0.1.0-alpha.draft
             */
            Metadata.REFLECTION = z.object({
                name: z.string(),
                kind: parseKind.returnSchema,
                typeDocId: z.number(),
                get parent() {
                    return Metadata.REFLECTION.optional();
                },
            });
            ;
            /**
             * {@inheritDoc Page}
             *
             * @since 0.1.0-alpha.draft
             */
            Metadata.PAGE = z.object({
                fullName: z.string(),
                customSlug: z.string().optional(),
                splitName: z.array(z.string()),
                flags: z.object({
                    abstract: z.literal(true),
                    const: z.literal(true),
                    experimental: z.literal(true),
                    external: z.literal(true),
                    inherited: z.literal(true),
                    optional: z.literal(true),
                    private: z.literal(true),
                    protected: z.literal(true),
                    public: z.literal(true),
                    readonly: z.literal(true),
                    rest: z.literal(true),
                    static: z.literal(true),
                }).partial().optional(),
                modifierTags: z.array(z.string()).optional(),
                blockTags: z.array(z.object({
                    tag: z.string(),
                    content: z.array(z.object({
                        kind: z.string(),
                        text: z.string(),
                        tag: z.string().optional(),
                        target: z.string().optional(),
                        targetAnchor: z.string().optional(),
                        tsLinkText: z.string().optional(),
                    })),
                    name: z.string().optional(),
                })).optional(),
                pageSections: z.array(z.object({
                    title: z.string(),
                    headings: z.array(z.object({
                        link: z.string(),
                        text: z.string(),
                        level: z.number().optional(),
                        kind: parseKind.returnSchema.optional(),
                        classes: z.string().optional(),
                    })),
                })),
            });
        })(Metadata = Default.Metadata || (Default.Metadata = {}));
    })(Default = Schemata.Default || (Schemata.Default = {}));
})(Schemata || (Schemata = {}));
//# sourceMappingURL=Schemata.js.map