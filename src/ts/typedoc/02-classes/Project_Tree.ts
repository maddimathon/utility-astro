/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { ArrayItem, Objects } from '@maddimathon/utility-typescript/types';

import {
    type Astro,
    Schemata,
} from '../00-types/index.js';

import {
    type parseKind,
    sortReflections,
} from '../01-functions/index.js';

import { Project_Reflection } from './Project_Reflection.js';


/**
 * Constructs a hierarchical reference of all the given reflections.
 */
export class Project_Tree<
    T_CollectionItem extends Astro.CollectionItem<T_CollectionName>,
    T_CollectionName extends string,
> {

    public readonly tree: Project_Tree.Tree;

    protected readonly pages: { [ key: number ]: Project_Tree.Page; };
    protected readonly reflections: { [ key: number ]: Project_Tree.Reflection; };
    protected readonly topLevelPages: Project_Tree.Page[];


    public static toNestedList(
        tree: Project_Tree.Tree,
        linked: boolean,
    ): Project_Tree.NestedListItem[] {

        return tree.map( ( item ) => {

            const kind = item.page.main.reflect.kind;
            const title = item.page.main.reflect.name;

            let href = linked ? item.page.customSlug : undefined;

            // returns
            if ( item.children?.length ) {

                return {
                    kind,
                    title,
                    href,
                    children: Project_Tree.toNestedList( item.children, linked ),
                };
            }

            return { kind, title, href };
        } );
    }

    public static sortTree(
        a: ArrayItem<Project_Tree.Tree>,
        b: ArrayItem<Project_Tree.Tree>,
    ): number {

        return sortReflections(
            a.page.main.reflect,
            b.page.main.reflect,
        );
    }


    constructor (
        protected readonly input: {

            raw: { [ key: number ]: T_CollectionItem; },

            reflections: { [ key: number ]: Project_Reflection.Any; },

            reflectionGroups: {
                hasChild: number[];
                hasParent: number[];
                hasOwnPage: number[];

                childrenByParent: {
                    [ key: number ]: number[];
                };
            },
        },
    ) {
        const pages: { [ key: number ]: Project_Tree.Page; } = {};
        const reflections: { [ key: number ]: Project_Tree.Reflection; } = {};

        /*
         * Create all reflection objects.
         */
        for ( const t_reflectionID of Object.keys( input.reflections ) ) {

            const reflectionID = Number( t_reflectionID );

            // continues
            if ( !input.reflections[ reflectionID ] ) {
                continue;
            }

            reflections[ reflectionID ] = new Project_Tree.Reflection(
                input.reflections[ reflectionID ],
            );
        }
        this.reflections = reflections;

        /*
         * Create all page objects.
         */
        for ( const pageID of input.reflectionGroups.hasOwnPage ) {

            // continues
            if ( !this.reflections[ pageID ] ) {
                continue;
            }

            // throws
            if ( !input.raw[ pageID ] ) {

                throw new TypeError( 'pageID not found in tree raw inputs', {
                    cause: {
                        pageID,
                    },
                } );
            }

            pages[ pageID ] = new Project_Tree.Page( {
                customSlug: input.raw[ pageID ].data.customSlug,
                pageSections: input.raw[ pageID ].data.pageSections ?? [],
                reflect: this.reflections[ pageID ].reflect as Project_Reflection<parseKind.Return, true>,
            } );
        }
        this.pages = pages;

        /*
         * Create the tree.
         */
        const tree: Project_Tree.Tree = [];

        this.topLevelPages = Object.values( this.pages )
            .filter( _page => !_page.parent )
            .sort( ( a, b ) => sortReflections(
                a.main.reflect,
                b.main.reflect,
            ) );

        for ( const page of this.topLevelPages ) {
            tree.push( this.buildTree( page.main.reflect.typeDocId ) );
        }

        this.tree = tree.sort( Project_Tree.sortTree );
    }

    public buildTree( pageID: number ): ArrayItem<Project_Tree.Tree> {

        // throws
        if ( !this.pages[ pageID ] ) {

            throw new TypeError( 'pageID not found in tree pages', {
                cause: {
                    pageID,
                },
            } );
        }

        const children: Project_Tree.Tree = [];

        if ( this.input.reflectionGroups.childrenByParent[ pageID ] ) {

            for ( const _childID of this.input.reflectionGroups.childrenByParent[ pageID ] ) {

                // throws
                if ( !this.reflections[ _childID ] ) {

                    throw new TypeError( '_childID not found in tree reflections', {
                        cause: {
                            _childID,
                            pageID,
                        },
                    } );
                }

                // continues
                if ( !this.reflections[ _childID ].reflect.hasOwnPage ) {
                    continue;
                }

                // throws
                if ( !this.pages[ _childID ] ) {

                    throw new TypeError( '_childID not found in tree pages', {
                        cause: {
                            _childID,
                            pageID,
                        },
                    } );
                }

                children.push( this.buildTree( _childID ) );
            }
        }

        const tree: ArrayItem<Project_Tree.Tree> = {

            page: this.pages[ pageID ],

            children: Object.values( children ).length
                ? children.sort( Project_Tree.sortTree )
                : undefined,
        };

        return tree;
    }

    /**
     * Creates a cleaner output for conversion.
     * 
     * @since ___PKG_VERSION___
     */
    public toJSON() {

        return {
            tree: this.tree,
            topLevelPages: this.topLevelPages,
        };
    }
}

export namespace Project_Tree {

    export type Tree = {
        page: Page;
        children?: Tree;
    }[];

    export type NestedListItem = {

        kind: parseKind.Return;
        title: string;

        /**
         * Slug used to generate the URL to this item.
         */
        href?: string;

        /**
         * Items for a sublist of this item.
         */
        children?: NestedListItem[];
    };

    export class Page<
        T_Kind extends parseKind.Return = parseKind.Return,
        T_Reflection extends Page.ReflectionTypeParam<T_Kind> = Page.ReflectionTypeParam<T_Kind>,
    > implements Objects.Classify<Omit<Schemata.PageGeneric<T_Reflection>, "reflect">> {

        public readonly customSlug: string | undefined;
        public readonly main: Reflection<T_Kind, true>;
        public readonly pageSections: Schemata.PageGeneric<T_Reflection>[ 'pageSections' ];

        public constructor (
            page: Omit<Schemata.PageGeneric<T_Reflection>, "reflect"> & {
                reflect: Project_Reflection<T_Kind, true>;
            },
            public readonly parent?: Page | Reflection,
            public readonly members?: ( Page | Reflection )[],
        ) {
            this.customSlug = page.customSlug;
            this.main = new Project_Tree.Reflection( page.reflect );
            this.pageSections = page.pageSections;
        }
    }

    export namespace Page {

        export type ReflectionTypeParam<
            T_Kind extends parseKind.Return = parseKind.Return,
        > = Schemata.ReflectionGeneric<T_Kind> & { hasOwnPage: true; };
    }

    export class Reflection<
        T_Kind extends parseKind.Return = parseKind.Return,

        // optional
        T_HasOwnPage extends boolean = boolean,
    > {

        constructor (
            public readonly reflect: Project_Reflection<T_Kind, T_HasOwnPage>,
        ) { }
    }
}