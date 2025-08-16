/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { ArrayItem } from '@maddimathon/utility-typescript/types';
import type * as NestedListTypes from '../../../astro/components/NestedList.d.ts';

import { escapeHTML } from 'astro/runtime/server/escape.js';

import {
    Schemata,
} from '../00-types/index.js';

/**
 * A class that creates a hierarchical tree of collection items for use wirh the
 * components and plugins in this package.
 * 
 * @since ___PKG_VERSION___
 */
export class CollectionTree<
    T_CollectionItem extends CollectionTree.Input<T_GetCollectionReturn>,
    T_GetCollectionReturn extends CollectionTree.InputCollectionDefault<T_CollectionData, T_CollectionKeys>[],

    T_CollectionData extends Schemata.Default.Metadata.Reflection,
    T_CollectionKeys extends string,
> {
    /**
     * All page objects in this collection, indexed by typeDocId.
     */
    public readonly pages: {
        [ key: number ]: CollectionTree.Page;
    };

    /**
     * Top-level pages in this collection with their children nested within.
     */
    public readonly map: {
        [ key: number ]: CollectionTree.Page;
    };

    constructor ( protected readonly collection: T_CollectionItem[] ) {
        this.map = {};
        this.pages = {};

        for ( const page of this.collection ) {
            this.pages[ page.data.typeDocId ] = new CollectionTree.Page( page );
        }

        const topLevelOnly = [ ...this.collection ].filter(
            ( _page ) => !_page.data.parent
        );

        const topLevelOnly_id = topLevelOnly.map(
            ( _page ) => _page.data.typeDocId
        );

        for ( const page of topLevelOnly ) {
            this.map[ page.data.typeDocId ] =
                this.pages[ page.data.typeDocId ] ?? new CollectionTree.Page( page );
        }

        const allChildren = [ ...this.collection ].filter(
            ( _page ) => !topLevelOnly_id.includes( _page.data.typeDocId )
        );

        for ( const child of allChildren ) {
            // continues
            if (
                !child.data.parent?.typeDocId ||
                !this.pages[ child.data.parent.typeDocId ]
            ) {
                this.map[ child.data.typeDocId ] =
                    this.pages[ child.data.typeDocId ] ??
                    new CollectionTree.Page( child );
                continue;
            }

            this.pages[ child.data.parent.typeDocId ]?.addChild(
                this.map[ child.data.typeDocId ] ?? new CollectionTree.Page( child )
            );
        }
    }

    public exportMap(): CollectionTree.Export[] {
        const mapper = ( _page: CollectionTree.Page ): CollectionTree.Export => {
            const _obj: CollectionTree.Export = {
                title: _page.title,
                name: _page.data.name,
                typeDocId: _page.data.typeDocId,
                parent: _page.data.parent?.typeDocId,
            };

            if ( _page.children.length ) {
                _obj.children = _page.children.map( mapper );
            }

            return _obj;
        };

        return Object.values( this.map ).map( mapper );
    }

    public exportList(): NestedListTypes.NestedListItem[] {
        const mapper = (
            _page: CollectionTree.Page
        ): NestedListTypes.NestedListItem => {
            const _obj: NestedListTypes.NestedListItem = {
                html: `<a href="${ _page.href }">${ escapeHTML( _page.title ) }</a>`,
            };

            if ( _page.children.length ) {
                _obj.children = _page.children.map( mapper );
            }

            return _obj;
        };

        return Object.values( this.map ).map( mapper );
    }
};

export namespace CollectionTree {

    export type InputCollectionDefault<
        T_Data extends object = Schemata.Default.Metadata.Reflection,
        T_Collection extends string = string,
    > = {
        id: string;
        collection: T_Collection;
        data: T_Data;

        body?: string;
        filePath?: string;
    };

    export type Input<
        T_GetCollectionReturn extends InputCollectionDefault[]
    > = { href: string; } & ArrayItem<T_GetCollectionReturn>;

    export type Export = {
        title: string;
        name: string;
        typeDocId: number;
        parent?: number;
        children?: CollectionTree.Export[];
    };

    export class Page<
        T_CollectionItem extends Input<InputCollectionDefault[]> = Input<InputCollectionDefault[]>,
    > {
        public readonly href: string;
        public readonly title: string;
        public children: Page[] = [];

        public readonly data: Schemata.Default.Metadata.Reflection;

        constructor ( protected readonly raw: T_CollectionItem ) {
            this.href = this.raw.href;
            this.title = this.raw.data.name;

            this.data = this.raw.data;
        }

        public addChild( child: Page ) {
            this.children.push( child );
        }
    }
};