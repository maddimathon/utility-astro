/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import { escapeHTML } from 'astro/runtime/server/escape.js';
import { Schemata, } from '../00-types/index.js';
/**
 * A class that creates a hierarchical tree of collection items for use wirh the
 * components and plugins in this package.
 *
 * @since 0.1.0-alpha.draft
 */
export class CollectionTree {
    collection;
    /**
     * All page objects in this collection, indexed by typeDocId.
     */
    pages;
    /**
     * Top-level pages in this collection with their children nested within.
     */
    map;
    constructor(collection) {
        this.collection = collection;
        this.map = {};
        this.pages = {};
        for (const page of this.collection) {
            this.pages[page.data.typeDocId] = new CollectionTree.Page(page);
        }
        const topLevelOnly = [...this.collection].filter((_page) => !_page.data.parent);
        const topLevelOnly_id = topLevelOnly.map((_page) => _page.data.typeDocId);
        for (const page of topLevelOnly) {
            this.map[page.data.typeDocId] =
                this.pages[page.data.typeDocId] ?? new CollectionTree.Page(page);
        }
        const allChildren = [...this.collection].filter((_page) => !topLevelOnly_id.includes(_page.data.typeDocId));
        for (const child of allChildren) {
            // continues
            if (!child.data.parent?.typeDocId ||
                !this.pages[child.data.parent.typeDocId]) {
                this.map[child.data.typeDocId] =
                    this.pages[child.data.typeDocId] ??
                        new CollectionTree.Page(child);
                continue;
            }
            this.pages[child.data.parent.typeDocId]?.addChild(this.map[child.data.typeDocId] ?? new CollectionTree.Page(child));
        }
    }
    exportMap() {
        const mapper = (_page) => {
            const _obj = {
                title: _page.title,
                name: _page.data.name,
                typeDocId: _page.data.typeDocId,
                parent: _page.data.parent?.typeDocId,
            };
            if (_page.children.length) {
                _obj.children = _page.children.map(mapper);
            }
            return _obj;
        };
        return Object.values(this.map).map(mapper);
    }
    exportList() {
        const mapper = (_page) => {
            const _obj = {
                html: `<a href="${_page.href}">${escapeHTML(_page.title)}</a>`,
            };
            if (_page.children.length) {
                _obj.children = _page.children.map(mapper);
            }
            return _obj;
        };
        return Object.values(this.map).map(mapper);
    }
}
;
(function (CollectionTree) {
    class Page {
        raw;
        href;
        title;
        children = [];
        data;
        constructor(raw) {
            this.raw = raw;
            this.href = this.raw.href;
            this.title = this.raw.data.name;
            this.data = this.raw.data;
        }
        addChild(child) {
            this.children.push(child);
        }
    }
    CollectionTree.Page = Page;
})(CollectionTree || (CollectionTree = {}));
;
//# sourceMappingURL=CollectionTree.js.map