/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import { arrayUnique } from '@maddimathon/utility-typescript/functions';
import { escapeHTML } from 'astro/runtime/server/escape.js';
import { Schemata, } from '../00-types/index.js';
/**
 * A class that creates a hierarchical tree of collection items for use wirh the
 * components and plugins in this package.
 *
 * @since 0.1.0-alpha.draft
 * @deprecated
 */
export class CollectionTree {
    collection;
    /**
     * An index of all parent pages and their children.
     */
    map;
    /**
     * All page objects in this collection, indexed by typeDocId.
     */
    pages;
    constructor(collection) {
        this.collection = collection;
        this.map = {};
        this.pages = {};
        for (const _page of this.collection) {
            this.pages[_page.data.typeDocId] = {
                href: _page.href,
                title: _page.data.name,
                data: _page.data,
            };
            if (_page.data.parent) {
                const _parentID = _page.data.parent;
                if (!this.map[_parentID] || !Array.isArray(this.map[_parentID])) {
                    this.map[_parentID] = [];
                }
                this.map[_parentID].push(_page.data.typeDocId);
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
    buildMap() {
        const mapper = (_pageID) => {
            const _page = this.pages[_pageID];
            // returns
            if (!_page) {
                return undefined;
            }
            return {
                ..._page,
                children: this.map[_pageID]?.map(mapper).filter(_s => typeof _s !== 'undefined'),
            };
        };
        const allChildrenIDs = arrayUnique(Object.values(this.map).flat());
        const topLevelPages = Object.values(this.pages).filter(_page => !allChildrenIDs.includes(_page.data.typeDocId));
        return topLevelPages.map((_page) => mapper(_page.data.typeDocId)).filter(_s => typeof _s !== 'undefined');
    }
    exportMap() {
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
    exportList() {
        const mapper = (_page) => {
            const _obj = {
                html: `<a href="${_page.href}">${escapeHTML(_page.title)}</a>`,
            };
            if (_page.children?.length) {
                _obj.children = _page.children.map(mapper);
            }
            return _obj;
        };
        return this.buildMap().map(mapper);
    }
}
;
;
//# sourceMappingURL=CollectionTree.js.map