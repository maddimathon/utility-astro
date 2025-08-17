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

import { arrayUnique } from '@maddimathon/utility-typescript/functions';

import { escapeHTML } from 'astro/runtime/server/escape.js';

import {
    Schemata,
} from '../00-types/index.js';

/**
 * A class that creates a hierarchical tree of collection items for use wirh the
 * components and plugins in this package.
 * 
 * @since ___PKG_VERSION___
 * @deprecated
 */
export class CollectionTree<
    T_CollectionItem extends CollectionTree.Input<T_GetCollectionReturn>,
    T_GetCollectionReturn extends CollectionTree.InputCollectionDefault<T_CollectionData, T_CollectionKeys>[],

    T_CollectionData extends Schemata.Reflection.Any,
    T_CollectionKeys extends string,
> {

    /**
     * An index of all parent pages and their children.
     */
    public readonly map: {
        [ key: number ]: number[];
    };

    /**
     * All page objects in this collection, indexed by typeDocId.
     */
    public readonly pages: {
        [ key: number ]: CollectionTree.Page<T_CollectionData>;
    };

    constructor ( protected readonly collection: T_CollectionItem[] ) {
        this.map = {};
        this.pages = {};

        for ( const _page of this.collection ) {

            this.pages[ _page.data.typeDocId ] = {
                href: _page.href,
                title: _page.data.name,
                data: _page.data,
            };

            if ( _page.data.parent ) {

                const _parentID = _page.data.parent;

                if ( !this.map[ _parentID ] || !Array.isArray( this.map[ _parentID ] ) ) {
                    this.map[ _parentID ] = [];
                }

                this.map[ _parentID ].push( _page.data.typeDocId );
            }
        }

        // const allChildren = arrayUnique( Object.values( this.map ).flat() );

        // for ( const childID of allChildren ) {

        //     const child = this.pages[ childID ];

        //     // continues
        //     if (
        //         !child
        //         || !this.pages[ childID ]
        //         || !child.data.parent?.typeDocId
        //         || !this.pages[ child.data.parent.typeDocId ]
        //     ) {
        //         continue;
        //     }

        //     this.pages[ child.data.parent.typeDocId ]?.addChild( this.pages[ childID ] );
        // }
    }

    protected buildMap() {

        const mapper = ( _pageID: number ): undefined | CollectionTree.Export<T_CollectionData> => {

            const _page = this.pages[ _pageID ];

            // returns
            if ( !_page ) {
                return undefined;
            }

            return {
                ..._page,
                children: this.map[ _pageID ]?.map( mapper ).filter( _s => typeof _s !== 'undefined' ),
            };
        };

        const allChildrenIDs = arrayUnique( Object.values( this.map ).flat() );

        const topLevelPages = Object.values( this.pages ).filter( _page => !allChildrenIDs.includes( _page.data.typeDocId ) );

        return topLevelPages.map( ( _page ) => mapper( _page.data.typeDocId ) ).filter( _s => typeof _s !== 'undefined' );
    }

    public exportMap() {
        // const mapper = ( _page: CollectionTree.Export<T_CollectionData> ) => {

        //     // returns
        //     if ( !_page ) {
        //         return undefined;
        //     }

        //     const _obj = {
        //         title: _page.title,
        //         name: _page.data.name,
        //         typeDocId: _page.data.typeDocId,
        //         parent: _page.data.parent?.typeDocId,

        //         children: this.map[ _page.data.typeDocId ]?.map( mapper ).filter( _s => typeof _s !== 'undefined' ),
        //     };

        //     return _obj;
        // };

        // const allChildrenIDs = arrayUnique( Object.values( this.map ).flat() );

        // const topLevelPages = Object.values( this.pages ).filter( _page => !allChildrenIDs.includes( _page.data.typeDocId ) );
        // return this.buildMap().map( ( _page ) => mapper( _page ) ).filter( _s => typeof _s !== 'undefined' );

        return this.buildMap();
    }

    public exportList(): NestedListTypes.NestedListItem[] {
        const mapper = (
            _page: CollectionTree.Export<T_CollectionData>
        ): NestedListTypes.NestedListItem => {

            const _obj: NestedListTypes.NestedListItem = {
                html: `<a href="${ _page.href }">${ escapeHTML( _page.title ) }</a>`,
            };

            if ( _page.children?.length ) {
                _obj.children = _page.children.map( mapper );
            }

            return _obj;
        };

        return this.buildMap().map( mapper );
    }
};

export namespace CollectionTree {

    export type Export<
        T_CollectionData extends Schemata.Reflection.Any,
    > = Page<T_CollectionData> & {
        children?: Export<T_CollectionData>[];
    };

    export type Input<
        T_GetCollectionReturn extends InputCollectionDefault[]
    > = { href: string; } & ArrayItem<T_GetCollectionReturn>;

    export type InputCollectionDefault<
        T_Data extends object = Schemata.Reflection.Any,
        T_Collection extends string = string,
    > = {
        id: string;
        collection: T_Collection;
        data: T_Data;

        body?: string;
        filePath?: string;
    };

    export interface Page<
        T_CollectionData extends Schemata.Reflection.Any,
    > {
        href: string;
        title: string;
        data: T_CollectionData;
    }
};