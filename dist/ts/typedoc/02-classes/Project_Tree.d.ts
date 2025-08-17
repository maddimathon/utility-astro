/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import type { ArrayItem, Objects } from '@maddimathon/utility-typescript/types';
import { type Astro, Schemata } from '../00-types/index.js';
import { type parseKind } from '../01-functions/index.js';
import { Project_Reflection } from './Project_Reflection.js';
/**
 * Constructs a hierarchical reference of all the given reflections.
 */
export declare class Project_Tree<T_CollectionItem extends Astro.CollectionItem<T_CollectionName>, T_CollectionName extends string> {
    protected readonly input: {
        raw: {
            [key: number]: T_CollectionItem;
        };
        reflections: {
            [key: number]: Project_Reflection.Any;
        };
        reflectionGroups: {
            hasChild: number[];
            hasParent: number[];
            hasOwnPage: number[];
            childrenByParent: {
                [key: number]: number[];
            };
        };
    };
    readonly tree: Project_Tree.Tree;
    protected readonly pages: {
        [key: number]: Project_Tree.Page;
    };
    protected readonly reflections: {
        [key: number]: Project_Tree.Reflection;
    };
    protected readonly topLevelPages: Project_Tree.Page[];
    static toNestedList(tree: Project_Tree.Tree, linked: boolean): Project_Tree.NestedListItem[];
    static sortTree(a: ArrayItem<Project_Tree.Tree>, b: ArrayItem<Project_Tree.Tree>): number;
    constructor(input: {
        raw: {
            [key: number]: T_CollectionItem;
        };
        reflections: {
            [key: number]: Project_Reflection.Any;
        };
        reflectionGroups: {
            hasChild: number[];
            hasParent: number[];
            hasOwnPage: number[];
            childrenByParent: {
                [key: number]: number[];
            };
        };
    });
    buildTree(pageID: number): ArrayItem<Project_Tree.Tree>;
    /**
     * Creates a cleaner output for conversion.
     *
     * @since 0.1.0-alpha.draft
     */
    toJSON(): {
        tree: Project_Tree.Tree;
        topLevelPages: Project_Tree.Page<"Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable", Project_Tree.Page.ReflectionTypeParam<"Accessor" | "CallSignature" | "Class" | "Constructor" | "ConstructorSignature" | "Document" | "Enum" | "EnumMember" | "Function" | "GetSignature" | "IndexSignature" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "SetSignature" | "TypeAlias" | "TypeLiteral" | "TypeParameter" | "Variable">>[];
    };
}
export declare namespace Project_Tree {
    type Tree = {
        page: Page;
        children?: Tree;
    }[];
    type NestedListItem = {
        /**
         * Escaped HTML content for this item.
         */
        html: string;
        /**
         * Slug used to generate the URL to this item.
         */
        href?: string;
        /**
         * Items for a sublist of this item.
         */
        children?: NestedListItem[];
    };
    class Page<T_Kind extends parseKind.Return = parseKind.Return, T_Reflection extends Page.ReflectionTypeParam<T_Kind> = Page.ReflectionTypeParam<T_Kind>> implements Objects.Classify<Omit<Schemata.PageGeneric<T_Reflection>, "reflect">> {
        readonly parent?: (Page | Reflection) | undefined;
        readonly members?: (Page | Reflection)[] | undefined;
        readonly customSlug: string | undefined;
        readonly main: Reflection<T_Kind, true>;
        readonly pageSections: Schemata.PageGeneric<T_Reflection>['pageSections'];
        constructor(page: Omit<Schemata.PageGeneric<T_Reflection>, "reflect"> & {
            reflect: Project_Reflection<T_Kind, true>;
        }, parent?: (Page | Reflection) | undefined, members?: (Page | Reflection)[] | undefined);
    }
    namespace Page {
        type ReflectionTypeParam<T_Kind extends parseKind.Return = parseKind.Return> = Schemata.ReflectionGeneric<T_Kind> & {
            hasOwnPage: true;
        };
    }
    class Reflection<T_Kind extends parseKind.Return = parseKind.Return, T_HasOwnPage extends boolean = boolean> {
        readonly reflect: Project_Reflection<T_Kind, T_HasOwnPage>;
        constructor(reflect: Project_Reflection<T_Kind, T_HasOwnPage>);
    }
}
//# sourceMappingURL=Project_Tree.d.ts.map