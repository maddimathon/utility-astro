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
import { Literals } from './Literals.js';
/**
 * Zod schemas used in the TypeDoc plugins and utilities.
 *
 * @since 0.1.0-alpha.draft
 */
export var Schemata;
(function (Schemata) {
    ;
    /**
     * Zod schema for the {@link Schemata.ReflectionGeneric} interface.
     *
     * @since 0.1.0-alpha.draft
     */
    function Reflection() {
        return z.object({
            name: z.string(),
            kind: Literals.Reflections.Kind.Any,
            typeDocId: z.number(),
            data: z.union([z.record(z.string(), z.unknown()), z.undefined()]).optional(),
            fullName: z.string(),
            splitName: z.array(z.string()),
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
            parent: z.number().optional(),
            sortingIndex: z.string(),
        });
    }
    Schemata.Reflection = Reflection;
    ;
    /**
     * Contains more specific reflection schemas.
     *
     * @since 0.1.0-alpha.draft
     */
    (function (Reflection) {
        Reflection.Class = z.object({
            ...Schemata.Reflection().shape,
            kind: z.literal("Class"),
        });
        Reflection.Function = z.object({
            ...Schemata.Reflection().shape,
            kind: z.union([
                z.literal("Accessor"),
                z.literal("Constructor"),
                z.literal("Function"),
                z.literal("GetSignature"),
                z.literal("Method"),
                z.literal("SetSignature"),
            ]),
        });
        Reflection.Module = z.object({
            ...Schemata.Reflection().shape,
            kind: z.literal("Module"),
        });
        Reflection.Namespace = z.object({
            ...Schemata.Reflection().shape,
            kind: z.literal("Namespace"),
        });
        Reflection.Plain = z.object({
            ...Schemata.Reflection().shape,
            kind: z.literal("Document"),
        });
        Reflection.Type = z.object({
            ...Schemata.Reflection().shape,
            kind: z.union([
                z.literal("Interface"),
                z.literal("TypeAlias"),
                z.literal("TypeLiteral"),
                z.literal("TypeParameter"),
            ]),
        });
        Reflection.Unknown = z.object({
            ...Schemata.Reflection().shape,
            kind: z.union([
                z.literal("CallSignature"),
                z.literal("ConstructorSignature"),
                z.literal("IndexSignature"),
                z.literal("Parameter"),
                z.literal("Project"),
                z.literal("Reference"),
            ]),
        });
        Reflection.Value = z.object({
            ...Schemata.Reflection().shape,
            kind: z.union([
                z.literal("Enum"),
                z.literal("EnumMember"),
                z.literal("Property"),
                z.literal("Variable"),
            ]),
        });
    })(Reflection = Schemata.Reflection || (Schemata.Reflection = {}));
    ;
    /**
     * {@inheritDoc Schemata.Page}
     *
     * @since 0.1.0-alpha.draft
     */
    function Page() {
        return z.object({
            customSlug: z.string().optional(),
            pageSections: z.array(z.object({
                title: z.string(),
                headings: z.array(z.object({
                    link: z.string(),
                    text: z.string(),
                    level: z.number().optional(),
                    kind: Literals.Reflections.Kind.Any.optional(),
                    classes: z.string().optional(),
                })),
            })),
            reflect: Schemata.Reflection(),
        });
    }
    Schemata.Page = Page;
    ;
})(Schemata || (Schemata = {}));
//# sourceMappingURL=Schemata.js.map