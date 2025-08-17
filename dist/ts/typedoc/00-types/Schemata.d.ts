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
export declare namespace Schemata {
    /**
     * Base schema for the simplest reflection metadata object in the TypeDoc
     * export.
     *
     * @remarks
     * This is an explicit interface rather than a zod inference for
     * better/easier generic typing.
     *
     * @since 0.1.0-alpha.draft
     */
    interface ReflectionGeneric<T_Kind extends Literals.Reflections.Kind.Any, T_Data extends Record<string, unknown> | undefined = Record<string, unknown> | undefined> {
        name: string;
        kind: T_Kind;
        typeDocId: number;
        fullName: string;
        splitName: string[];
        sortingIndex: string;
        blockTags?: {
            content: {
                kind: string;
                text: string;
                tag?: string;
                target?: string;
                targetAnchor?: string;
                tsLinkText?: string;
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
    }
    /**
     * Zod schema for the {@link Schemata.ReflectionGeneric} interface.
     *
     * @since 0.1.0-alpha.draft
     */
    function Reflection(): z.ZodObject<{
        name: z.ZodString;
        kind: z.ZodUnion<[z.ZodLiteral<"Accessor">, z.ZodLiteral<"CallSignature">, z.ZodLiteral<"Class">, z.ZodLiteral<"Constructor">, z.ZodLiteral<"ConstructorSignature">, z.ZodLiteral<"Document">, z.ZodLiteral<"Enum">, z.ZodLiteral<"EnumMember">, z.ZodLiteral<"Function">, z.ZodLiteral<"GetSignature">, z.ZodLiteral<"IndexSignature">, z.ZodLiteral<"Interface">, z.ZodLiteral<"Method">, z.ZodLiteral<"Module">, z.ZodLiteral<"Namespace">, z.ZodLiteral<"Parameter">, z.ZodLiteral<"Project">, z.ZodLiteral<"Property">, z.ZodLiteral<"Reference">, z.ZodLiteral<"SetSignature">, z.ZodLiteral<"TypeAlias">, z.ZodLiteral<"TypeLiteral">, z.ZodLiteral<"TypeParameter">, z.ZodLiteral<"Variable">]>;
        typeDocId: z.ZodNumber;
        data: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodUndefined]>>;
        fullName: z.ZodString;
        splitName: z.ZodArray<z.ZodString, "many">;
        blockTags: z.ZodOptional<z.ZodArray<z.ZodObject<{
            tag: z.ZodString;
            content: z.ZodArray<z.ZodObject<{
                kind: z.ZodString;
                text: z.ZodString;
                tag: z.ZodOptional<z.ZodString>;
                target: z.ZodOptional<z.ZodString>;
                targetAnchor: z.ZodOptional<z.ZodString>;
                tsLinkText: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: string;
                tag?: string | undefined;
                target?: string | undefined;
                targetAnchor?: string | undefined;
                tsLinkText?: string | undefined;
            }, {
                text: string;
                kind: string;
                tag?: string | undefined;
                target?: string | undefined;
                targetAnchor?: string | undefined;
                tsLinkText?: string | undefined;
            }>, "many">;
            name: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            tag: string;
            content: {
                text: string;
                kind: string;
                tag?: string | undefined;
                target?: string | undefined;
                targetAnchor?: string | undefined;
                tsLinkText?: string | undefined;
            }[];
            name?: string | undefined;
        }, {
            tag: string;
            content: {
                text: string;
                kind: string;
                tag?: string | undefined;
                target?: string | undefined;
                targetAnchor?: string | undefined;
                tsLinkText?: string | undefined;
            }[];
            name?: string | undefined;
        }>, "many">>;
        flags: z.ZodOptional<z.ZodObject<{
            abstract: z.ZodOptional<z.ZodLiteral<true>>;
            const: z.ZodOptional<z.ZodLiteral<true>>;
            experimental: z.ZodOptional<z.ZodLiteral<true>>;
            external: z.ZodOptional<z.ZodLiteral<true>>;
            inherited: z.ZodOptional<z.ZodLiteral<true>>;
            optional: z.ZodOptional<z.ZodLiteral<true>>;
            private: z.ZodOptional<z.ZodLiteral<true>>;
            protected: z.ZodOptional<z.ZodLiteral<true>>;
            public: z.ZodOptional<z.ZodLiteral<true>>;
            readonly: z.ZodOptional<z.ZodLiteral<true>>;
            rest: z.ZodOptional<z.ZodLiteral<true>>;
            static: z.ZodOptional<z.ZodLiteral<true>>;
        }, "strip", z.ZodTypeAny, {
            abstract?: true | undefined;
            const?: true | undefined;
            experimental?: true | undefined;
            external?: true | undefined;
            inherited?: true | undefined;
            optional?: true | undefined;
            private?: true | undefined;
            protected?: true | undefined;
            public?: true | undefined;
            readonly?: true | undefined;
            rest?: true | undefined;
            static?: true | undefined;
        }, {
            abstract?: true | undefined;
            const?: true | undefined;
            experimental?: true | undefined;
            external?: true | undefined;
            inherited?: true | undefined;
            optional?: true | undefined;
            private?: true | undefined;
            protected?: true | undefined;
            public?: true | undefined;
            readonly?: true | undefined;
            rest?: true | undefined;
            static?: true | undefined;
        }>>;
        modifierTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        parent: z.ZodOptional<z.ZodNumber>;
        sortingIndex: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        kind: "Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable";
        typeDocId: number;
        fullName: string;
        splitName: string[];
        sortingIndex: string;
        data?: Record<string, unknown> | undefined;
        blockTags?: {
            tag: string;
            content: {
                text: string;
                kind: string;
                tag?: string | undefined;
                target?: string | undefined;
                targetAnchor?: string | undefined;
                tsLinkText?: string | undefined;
            }[];
            name?: string | undefined;
        }[] | undefined;
        flags?: {
            abstract?: true | undefined;
            const?: true | undefined;
            experimental?: true | undefined;
            external?: true | undefined;
            inherited?: true | undefined;
            optional?: true | undefined;
            private?: true | undefined;
            protected?: true | undefined;
            public?: true | undefined;
            readonly?: true | undefined;
            rest?: true | undefined;
            static?: true | undefined;
        } | undefined;
        modifierTags?: string[] | undefined;
        parent?: number | undefined;
    }, {
        name: string;
        kind: "Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable";
        typeDocId: number;
        fullName: string;
        splitName: string[];
        sortingIndex: string;
        data?: Record<string, unknown> | undefined;
        blockTags?: {
            tag: string;
            content: {
                text: string;
                kind: string;
                tag?: string | undefined;
                target?: string | undefined;
                targetAnchor?: string | undefined;
                tsLinkText?: string | undefined;
            }[];
            name?: string | undefined;
        }[] | undefined;
        flags?: {
            abstract?: true | undefined;
            const?: true | undefined;
            experimental?: true | undefined;
            external?: true | undefined;
            inherited?: true | undefined;
            optional?: true | undefined;
            private?: true | undefined;
            protected?: true | undefined;
            public?: true | undefined;
            readonly?: true | undefined;
            rest?: true | undefined;
            static?: true | undefined;
        } | undefined;
        modifierTags?: string[] | undefined;
        parent?: number | undefined;
    }>;
    /**
     * Contains more specific reflection schemas.
     *
     * @since 0.1.0-alpha.draft
     */
    namespace Reflection {
        type Any = Schemata.ReflectionGeneric<Literals.Reflections.Kind.Any>;
        interface Class extends z.infer<typeof Schemata.Reflection.Class> {
        }
        const Class: z.ZodObject<{
            kind: z.ZodLiteral<"Class">;
            name: z.ZodString;
            typeDocId: z.ZodNumber;
            data: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodUndefined]>>;
            fullName: z.ZodString;
            splitName: z.ZodArray<z.ZodString, "many">;
            blockTags: z.ZodOptional<z.ZodArray<z.ZodObject<{
                tag: z.ZodString;
                content: z.ZodArray<z.ZodObject<{
                    kind: z.ZodString;
                    text: z.ZodString;
                    tag: z.ZodOptional<z.ZodString>;
                    target: z.ZodOptional<z.ZodString>;
                    targetAnchor: z.ZodOptional<z.ZodString>;
                    tsLinkText: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }>, "many">;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }>, "many">>;
            flags: z.ZodOptional<z.ZodObject<{
                abstract: z.ZodOptional<z.ZodLiteral<true>>;
                const: z.ZodOptional<z.ZodLiteral<true>>;
                experimental: z.ZodOptional<z.ZodLiteral<true>>;
                external: z.ZodOptional<z.ZodLiteral<true>>;
                inherited: z.ZodOptional<z.ZodLiteral<true>>;
                optional: z.ZodOptional<z.ZodLiteral<true>>;
                private: z.ZodOptional<z.ZodLiteral<true>>;
                protected: z.ZodOptional<z.ZodLiteral<true>>;
                public: z.ZodOptional<z.ZodLiteral<true>>;
                readonly: z.ZodOptional<z.ZodLiteral<true>>;
                rest: z.ZodOptional<z.ZodLiteral<true>>;
                static: z.ZodOptional<z.ZodLiteral<true>>;
            }, "strip", z.ZodTypeAny, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }>>;
            modifierTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parent: z.ZodOptional<z.ZodNumber>;
            sortingIndex: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            kind: "Class";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }, {
            name: string;
            kind: "Class";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }>;
        interface Function extends z.infer<typeof Schemata.Reflection.Function> {
        }
        const Function: z.ZodObject<{
            kind: z.ZodUnion<[z.ZodLiteral<"Accessor">, z.ZodLiteral<"Constructor">, z.ZodLiteral<"Function">, z.ZodLiteral<"GetSignature">, z.ZodLiteral<"Method">, z.ZodLiteral<"SetSignature">]>;
            name: z.ZodString;
            typeDocId: z.ZodNumber;
            data: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodUndefined]>>;
            fullName: z.ZodString;
            splitName: z.ZodArray<z.ZodString, "many">;
            blockTags: z.ZodOptional<z.ZodArray<z.ZodObject<{
                tag: z.ZodString;
                content: z.ZodArray<z.ZodObject<{
                    kind: z.ZodString;
                    text: z.ZodString;
                    tag: z.ZodOptional<z.ZodString>;
                    target: z.ZodOptional<z.ZodString>;
                    targetAnchor: z.ZodOptional<z.ZodString>;
                    tsLinkText: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }>, "many">;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }>, "many">>;
            flags: z.ZodOptional<z.ZodObject<{
                abstract: z.ZodOptional<z.ZodLiteral<true>>;
                const: z.ZodOptional<z.ZodLiteral<true>>;
                experimental: z.ZodOptional<z.ZodLiteral<true>>;
                external: z.ZodOptional<z.ZodLiteral<true>>;
                inherited: z.ZodOptional<z.ZodLiteral<true>>;
                optional: z.ZodOptional<z.ZodLiteral<true>>;
                private: z.ZodOptional<z.ZodLiteral<true>>;
                protected: z.ZodOptional<z.ZodLiteral<true>>;
                public: z.ZodOptional<z.ZodLiteral<true>>;
                readonly: z.ZodOptional<z.ZodLiteral<true>>;
                rest: z.ZodOptional<z.ZodLiteral<true>>;
                static: z.ZodOptional<z.ZodLiteral<true>>;
            }, "strip", z.ZodTypeAny, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }>>;
            modifierTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parent: z.ZodOptional<z.ZodNumber>;
            sortingIndex: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            kind: "Accessor" | "Constructor" | "Function" | "GetSignature" | "Method" | "SetSignature";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }, {
            name: string;
            kind: "Accessor" | "Constructor" | "Function" | "GetSignature" | "Method" | "SetSignature";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }>;
        interface Module extends z.infer<typeof Schemata.Reflection.Module> {
        }
        const Module: z.ZodObject<{
            kind: z.ZodLiteral<"Module">;
            name: z.ZodString;
            typeDocId: z.ZodNumber;
            data: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodUndefined]>>;
            fullName: z.ZodString;
            splitName: z.ZodArray<z.ZodString, "many">;
            blockTags: z.ZodOptional<z.ZodArray<z.ZodObject<{
                tag: z.ZodString;
                content: z.ZodArray<z.ZodObject<{
                    kind: z.ZodString;
                    text: z.ZodString;
                    tag: z.ZodOptional<z.ZodString>;
                    target: z.ZodOptional<z.ZodString>;
                    targetAnchor: z.ZodOptional<z.ZodString>;
                    tsLinkText: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }>, "many">;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }>, "many">>;
            flags: z.ZodOptional<z.ZodObject<{
                abstract: z.ZodOptional<z.ZodLiteral<true>>;
                const: z.ZodOptional<z.ZodLiteral<true>>;
                experimental: z.ZodOptional<z.ZodLiteral<true>>;
                external: z.ZodOptional<z.ZodLiteral<true>>;
                inherited: z.ZodOptional<z.ZodLiteral<true>>;
                optional: z.ZodOptional<z.ZodLiteral<true>>;
                private: z.ZodOptional<z.ZodLiteral<true>>;
                protected: z.ZodOptional<z.ZodLiteral<true>>;
                public: z.ZodOptional<z.ZodLiteral<true>>;
                readonly: z.ZodOptional<z.ZodLiteral<true>>;
                rest: z.ZodOptional<z.ZodLiteral<true>>;
                static: z.ZodOptional<z.ZodLiteral<true>>;
            }, "strip", z.ZodTypeAny, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }>>;
            modifierTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parent: z.ZodOptional<z.ZodNumber>;
            sortingIndex: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            kind: "Module";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }, {
            name: string;
            kind: "Module";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }>;
        interface Namespace extends z.infer<typeof Schemata.Reflection.Namespace> {
        }
        const Namespace: z.ZodObject<{
            kind: z.ZodLiteral<"Namespace">;
            name: z.ZodString;
            typeDocId: z.ZodNumber;
            data: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodUndefined]>>;
            fullName: z.ZodString;
            splitName: z.ZodArray<z.ZodString, "many">;
            blockTags: z.ZodOptional<z.ZodArray<z.ZodObject<{
                tag: z.ZodString;
                content: z.ZodArray<z.ZodObject<{
                    kind: z.ZodString;
                    text: z.ZodString;
                    tag: z.ZodOptional<z.ZodString>;
                    target: z.ZodOptional<z.ZodString>;
                    targetAnchor: z.ZodOptional<z.ZodString>;
                    tsLinkText: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }>, "many">;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }>, "many">>;
            flags: z.ZodOptional<z.ZodObject<{
                abstract: z.ZodOptional<z.ZodLiteral<true>>;
                const: z.ZodOptional<z.ZodLiteral<true>>;
                experimental: z.ZodOptional<z.ZodLiteral<true>>;
                external: z.ZodOptional<z.ZodLiteral<true>>;
                inherited: z.ZodOptional<z.ZodLiteral<true>>;
                optional: z.ZodOptional<z.ZodLiteral<true>>;
                private: z.ZodOptional<z.ZodLiteral<true>>;
                protected: z.ZodOptional<z.ZodLiteral<true>>;
                public: z.ZodOptional<z.ZodLiteral<true>>;
                readonly: z.ZodOptional<z.ZodLiteral<true>>;
                rest: z.ZodOptional<z.ZodLiteral<true>>;
                static: z.ZodOptional<z.ZodLiteral<true>>;
            }, "strip", z.ZodTypeAny, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }>>;
            modifierTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parent: z.ZodOptional<z.ZodNumber>;
            sortingIndex: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            kind: "Namespace";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }, {
            name: string;
            kind: "Namespace";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }>;
        interface Plain extends z.infer<typeof Schemata.Reflection.Plain> {
        }
        const Plain: z.ZodObject<{
            kind: z.ZodLiteral<"Document">;
            name: z.ZodString;
            typeDocId: z.ZodNumber;
            data: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodUndefined]>>;
            fullName: z.ZodString;
            splitName: z.ZodArray<z.ZodString, "many">;
            blockTags: z.ZodOptional<z.ZodArray<z.ZodObject<{
                tag: z.ZodString;
                content: z.ZodArray<z.ZodObject<{
                    kind: z.ZodString;
                    text: z.ZodString;
                    tag: z.ZodOptional<z.ZodString>;
                    target: z.ZodOptional<z.ZodString>;
                    targetAnchor: z.ZodOptional<z.ZodString>;
                    tsLinkText: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }>, "many">;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }>, "many">>;
            flags: z.ZodOptional<z.ZodObject<{
                abstract: z.ZodOptional<z.ZodLiteral<true>>;
                const: z.ZodOptional<z.ZodLiteral<true>>;
                experimental: z.ZodOptional<z.ZodLiteral<true>>;
                external: z.ZodOptional<z.ZodLiteral<true>>;
                inherited: z.ZodOptional<z.ZodLiteral<true>>;
                optional: z.ZodOptional<z.ZodLiteral<true>>;
                private: z.ZodOptional<z.ZodLiteral<true>>;
                protected: z.ZodOptional<z.ZodLiteral<true>>;
                public: z.ZodOptional<z.ZodLiteral<true>>;
                readonly: z.ZodOptional<z.ZodLiteral<true>>;
                rest: z.ZodOptional<z.ZodLiteral<true>>;
                static: z.ZodOptional<z.ZodLiteral<true>>;
            }, "strip", z.ZodTypeAny, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }>>;
            modifierTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parent: z.ZodOptional<z.ZodNumber>;
            sortingIndex: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            kind: "Document";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }, {
            name: string;
            kind: "Document";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }>;
        interface Type extends z.infer<typeof Schemata.Reflection.Type> {
        }
        const Type: z.ZodObject<{
            kind: z.ZodUnion<[z.ZodLiteral<"Interface">, z.ZodLiteral<"TypeAlias">, z.ZodLiteral<"TypeLiteral">, z.ZodLiteral<"TypeParameter">]>;
            name: z.ZodString;
            typeDocId: z.ZodNumber;
            data: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodUndefined]>>;
            fullName: z.ZodString;
            splitName: z.ZodArray<z.ZodString, "many">;
            blockTags: z.ZodOptional<z.ZodArray<z.ZodObject<{
                tag: z.ZodString;
                content: z.ZodArray<z.ZodObject<{
                    kind: z.ZodString;
                    text: z.ZodString;
                    tag: z.ZodOptional<z.ZodString>;
                    target: z.ZodOptional<z.ZodString>;
                    targetAnchor: z.ZodOptional<z.ZodString>;
                    tsLinkText: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }>, "many">;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }>, "many">>;
            flags: z.ZodOptional<z.ZodObject<{
                abstract: z.ZodOptional<z.ZodLiteral<true>>;
                const: z.ZodOptional<z.ZodLiteral<true>>;
                experimental: z.ZodOptional<z.ZodLiteral<true>>;
                external: z.ZodOptional<z.ZodLiteral<true>>;
                inherited: z.ZodOptional<z.ZodLiteral<true>>;
                optional: z.ZodOptional<z.ZodLiteral<true>>;
                private: z.ZodOptional<z.ZodLiteral<true>>;
                protected: z.ZodOptional<z.ZodLiteral<true>>;
                public: z.ZodOptional<z.ZodLiteral<true>>;
                readonly: z.ZodOptional<z.ZodLiteral<true>>;
                rest: z.ZodOptional<z.ZodLiteral<true>>;
                static: z.ZodOptional<z.ZodLiteral<true>>;
            }, "strip", z.ZodTypeAny, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }>>;
            modifierTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parent: z.ZodOptional<z.ZodNumber>;
            sortingIndex: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            kind: "Interface" | "TypeAlias" | "TypeLiteral" | "TypeParameter";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }, {
            name: string;
            kind: "Interface" | "TypeAlias" | "TypeLiteral" | "TypeParameter";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }>;
        interface Unknown extends z.infer<typeof Schemata.Reflection.Unknown> {
        }
        const Unknown: z.ZodObject<{
            kind: z.ZodUnion<[z.ZodLiteral<"CallSignature">, z.ZodLiteral<"ConstructorSignature">, z.ZodLiteral<"IndexSignature">, z.ZodLiteral<"Parameter">, z.ZodLiteral<"Project">, z.ZodLiteral<"Reference">]>;
            name: z.ZodString;
            typeDocId: z.ZodNumber;
            data: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodUndefined]>>;
            fullName: z.ZodString;
            splitName: z.ZodArray<z.ZodString, "many">;
            blockTags: z.ZodOptional<z.ZodArray<z.ZodObject<{
                tag: z.ZodString;
                content: z.ZodArray<z.ZodObject<{
                    kind: z.ZodString;
                    text: z.ZodString;
                    tag: z.ZodOptional<z.ZodString>;
                    target: z.ZodOptional<z.ZodString>;
                    targetAnchor: z.ZodOptional<z.ZodString>;
                    tsLinkText: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }>, "many">;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }>, "many">>;
            flags: z.ZodOptional<z.ZodObject<{
                abstract: z.ZodOptional<z.ZodLiteral<true>>;
                const: z.ZodOptional<z.ZodLiteral<true>>;
                experimental: z.ZodOptional<z.ZodLiteral<true>>;
                external: z.ZodOptional<z.ZodLiteral<true>>;
                inherited: z.ZodOptional<z.ZodLiteral<true>>;
                optional: z.ZodOptional<z.ZodLiteral<true>>;
                private: z.ZodOptional<z.ZodLiteral<true>>;
                protected: z.ZodOptional<z.ZodLiteral<true>>;
                public: z.ZodOptional<z.ZodLiteral<true>>;
                readonly: z.ZodOptional<z.ZodLiteral<true>>;
                rest: z.ZodOptional<z.ZodLiteral<true>>;
                static: z.ZodOptional<z.ZodLiteral<true>>;
            }, "strip", z.ZodTypeAny, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }>>;
            modifierTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parent: z.ZodOptional<z.ZodNumber>;
            sortingIndex: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            kind: "CallSignature" | "ConstructorSignature" | "IndexSignature" | "Parameter" | "Project" | "Reference";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }, {
            name: string;
            kind: "CallSignature" | "ConstructorSignature" | "IndexSignature" | "Parameter" | "Project" | "Reference";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }>;
        interface Value extends z.infer<typeof Schemata.Reflection.Value> {
        }
        const Value: z.ZodObject<{
            kind: z.ZodUnion<[z.ZodLiteral<"Enum">, z.ZodLiteral<"EnumMember">, z.ZodLiteral<"Property">, z.ZodLiteral<"Variable">]>;
            name: z.ZodString;
            typeDocId: z.ZodNumber;
            data: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodUndefined]>>;
            fullName: z.ZodString;
            splitName: z.ZodArray<z.ZodString, "many">;
            blockTags: z.ZodOptional<z.ZodArray<z.ZodObject<{
                tag: z.ZodString;
                content: z.ZodArray<z.ZodObject<{
                    kind: z.ZodString;
                    text: z.ZodString;
                    tag: z.ZodOptional<z.ZodString>;
                    target: z.ZodOptional<z.ZodString>;
                    targetAnchor: z.ZodOptional<z.ZodString>;
                    tsLinkText: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }>, "many">;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }>, "many">>;
            flags: z.ZodOptional<z.ZodObject<{
                abstract: z.ZodOptional<z.ZodLiteral<true>>;
                const: z.ZodOptional<z.ZodLiteral<true>>;
                experimental: z.ZodOptional<z.ZodLiteral<true>>;
                external: z.ZodOptional<z.ZodLiteral<true>>;
                inherited: z.ZodOptional<z.ZodLiteral<true>>;
                optional: z.ZodOptional<z.ZodLiteral<true>>;
                private: z.ZodOptional<z.ZodLiteral<true>>;
                protected: z.ZodOptional<z.ZodLiteral<true>>;
                public: z.ZodOptional<z.ZodLiteral<true>>;
                readonly: z.ZodOptional<z.ZodLiteral<true>>;
                rest: z.ZodOptional<z.ZodLiteral<true>>;
                static: z.ZodOptional<z.ZodLiteral<true>>;
            }, "strip", z.ZodTypeAny, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }>>;
            modifierTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parent: z.ZodOptional<z.ZodNumber>;
            sortingIndex: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            kind: "Enum" | "EnumMember" | "Property" | "Variable";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }, {
            name: string;
            kind: "Enum" | "EnumMember" | "Property" | "Variable";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }>;
    }
    /**
     * Base schema for a doc page's metadata in the TypeDoc export.
     *
     * @since 0.1.0-alpha.draft
     */
    interface PageGeneric<T_Reflection extends Schemata.Reflection.Any> {
        pageSections: {
            headings: {
                link: string;
                text: string;
                classes?: string;
                kind?: Literals.Reflections.Kind.Any;
                level?: number;
            }[];
            title: string;
        }[];
        reflect: T_Reflection;
        customSlug?: string;
    }
    /**
     * {@inheritDoc Schemata.Page}
     *
     * @since 0.1.0-alpha.draft
     */
    function Page(): z.ZodObject<{
        customSlug: z.ZodOptional<z.ZodString>;
        pageSections: z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            headings: z.ZodArray<z.ZodObject<{
                link: z.ZodString;
                text: z.ZodString;
                level: z.ZodOptional<z.ZodNumber>;
                kind: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"Accessor">, z.ZodLiteral<"CallSignature">, z.ZodLiteral<"Class">, z.ZodLiteral<"Constructor">, z.ZodLiteral<"ConstructorSignature">, z.ZodLiteral<"Document">, z.ZodLiteral<"Enum">, z.ZodLiteral<"EnumMember">, z.ZodLiteral<"Function">, z.ZodLiteral<"GetSignature">, z.ZodLiteral<"IndexSignature">, z.ZodLiteral<"Interface">, z.ZodLiteral<"Method">, z.ZodLiteral<"Module">, z.ZodLiteral<"Namespace">, z.ZodLiteral<"Parameter">, z.ZodLiteral<"Project">, z.ZodLiteral<"Property">, z.ZodLiteral<"Reference">, z.ZodLiteral<"SetSignature">, z.ZodLiteral<"TypeAlias">, z.ZodLiteral<"TypeLiteral">, z.ZodLiteral<"TypeParameter">, z.ZodLiteral<"Variable">]>>;
                classes: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                link: string;
                text: string;
                kind?: "Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable" | undefined;
                level?: number | undefined;
                classes?: string | undefined;
            }, {
                link: string;
                text: string;
                kind?: "Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable" | undefined;
                level?: number | undefined;
                classes?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            title: string;
            headings: {
                link: string;
                text: string;
                kind?: "Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable" | undefined;
                level?: number | undefined;
                classes?: string | undefined;
            }[];
        }, {
            title: string;
            headings: {
                link: string;
                text: string;
                kind?: "Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable" | undefined;
                level?: number | undefined;
                classes?: string | undefined;
            }[];
        }>, "many">;
        reflect: z.ZodObject<{
            name: z.ZodString;
            kind: z.ZodUnion<[z.ZodLiteral<"Accessor">, z.ZodLiteral<"CallSignature">, z.ZodLiteral<"Class">, z.ZodLiteral<"Constructor">, z.ZodLiteral<"ConstructorSignature">, z.ZodLiteral<"Document">, z.ZodLiteral<"Enum">, z.ZodLiteral<"EnumMember">, z.ZodLiteral<"Function">, z.ZodLiteral<"GetSignature">, z.ZodLiteral<"IndexSignature">, z.ZodLiteral<"Interface">, z.ZodLiteral<"Method">, z.ZodLiteral<"Module">, z.ZodLiteral<"Namespace">, z.ZodLiteral<"Parameter">, z.ZodLiteral<"Project">, z.ZodLiteral<"Property">, z.ZodLiteral<"Reference">, z.ZodLiteral<"SetSignature">, z.ZodLiteral<"TypeAlias">, z.ZodLiteral<"TypeLiteral">, z.ZodLiteral<"TypeParameter">, z.ZodLiteral<"Variable">]>;
            typeDocId: z.ZodNumber;
            data: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodUndefined]>>;
            fullName: z.ZodString;
            splitName: z.ZodArray<z.ZodString, "many">;
            blockTags: z.ZodOptional<z.ZodArray<z.ZodObject<{
                tag: z.ZodString;
                content: z.ZodArray<z.ZodObject<{
                    kind: z.ZodString;
                    text: z.ZodString;
                    tag: z.ZodOptional<z.ZodString>;
                    target: z.ZodOptional<z.ZodString>;
                    targetAnchor: z.ZodOptional<z.ZodString>;
                    tsLinkText: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }, {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }>, "many">;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }, {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }>, "many">>;
            flags: z.ZodOptional<z.ZodObject<{
                abstract: z.ZodOptional<z.ZodLiteral<true>>;
                const: z.ZodOptional<z.ZodLiteral<true>>;
                experimental: z.ZodOptional<z.ZodLiteral<true>>;
                external: z.ZodOptional<z.ZodLiteral<true>>;
                inherited: z.ZodOptional<z.ZodLiteral<true>>;
                optional: z.ZodOptional<z.ZodLiteral<true>>;
                private: z.ZodOptional<z.ZodLiteral<true>>;
                protected: z.ZodOptional<z.ZodLiteral<true>>;
                public: z.ZodOptional<z.ZodLiteral<true>>;
                readonly: z.ZodOptional<z.ZodLiteral<true>>;
                rest: z.ZodOptional<z.ZodLiteral<true>>;
                static: z.ZodOptional<z.ZodLiteral<true>>;
            }, "strip", z.ZodTypeAny, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }, {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            }>>;
            modifierTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parent: z.ZodOptional<z.ZodNumber>;
            sortingIndex: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            kind: "Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }, {
            name: string;
            kind: "Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        pageSections: {
            title: string;
            headings: {
                link: string;
                text: string;
                kind?: "Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable" | undefined;
                level?: number | undefined;
                classes?: string | undefined;
            }[];
        }[];
        reflect: {
            name: string;
            kind: "Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        };
        customSlug?: string | undefined;
    }, {
        pageSections: {
            title: string;
            headings: {
                link: string;
                text: string;
                kind?: "Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable" | undefined;
                level?: number | undefined;
                classes?: string | undefined;
            }[];
        }[];
        reflect: {
            name: string;
            kind: "Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable";
            typeDocId: number;
            fullName: string;
            splitName: string[];
            sortingIndex: string;
            data?: Record<string, unknown> | undefined;
            blockTags?: {
                tag: string;
                content: {
                    text: string;
                    kind: string;
                    tag?: string | undefined;
                    target?: string | undefined;
                    targetAnchor?: string | undefined;
                    tsLinkText?: string | undefined;
                }[];
                name?: string | undefined;
            }[] | undefined;
            flags?: {
                abstract?: true | undefined;
                const?: true | undefined;
                experimental?: true | undefined;
                external?: true | undefined;
                inherited?: true | undefined;
                optional?: true | undefined;
                private?: true | undefined;
                protected?: true | undefined;
                public?: true | undefined;
                readonly?: true | undefined;
                rest?: true | undefined;
                static?: true | undefined;
            } | undefined;
            modifierTags?: string[] | undefined;
            parent?: number | undefined;
        };
        customSlug?: string | undefined;
    }>;
    /**
     * Contains more specific page schemas.
     *
     * @since 0.1.0-alpha.draft
     */
    namespace Page {
        type Any = Schemata.PageGeneric<Schemata.Reflection.Any>;
    }
}
//# sourceMappingURL=Schemata.d.ts.map