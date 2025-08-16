/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import type { ArrayItem } from '@maddimathon/utility-typescript/types';
import type * as NestedListTypes from '../../../astro/components/NestedList.d.ts';
import { Schemata } from '../00-types/index.js';
/**
 * A class that creates a hierarchical tree of collection items for use wirh the
 * components and plugins in this package.
 *
 * @since 0.1.0-alpha.draft
 */
export declare class CollectionTree<T_CollectionItem extends CollectionTree.Input<T_GetCollectionReturn>, T_GetCollectionReturn extends CollectionTree.InputCollectionDefault<T_CollectionData, T_CollectionKeys>[], T_CollectionData extends Schemata.Default.Metadata.Reflection, T_CollectionKeys extends string> {
    protected readonly collection: T_CollectionItem[];
    /**
     * All page objects in this collection, indexed by typeDocId.
     */
    readonly pages: {
        [key: number]: CollectionTree.Page;
    };
    /**
     * Top-level pages in this collection with their children nested within.
     */
    readonly map: {
        [key: number]: CollectionTree.Page;
    };
    constructor(collection: T_CollectionItem[]);
    exportMap(): CollectionTree.Export[];
    exportList(): NestedListTypes.NestedListItem[];
}
export declare namespace CollectionTree {
    type InputCollectionDefault<T_Data extends object = Schemata.Default.Metadata.Reflection, T_Collection extends string = string> = {
        id: string;
        collection: T_Collection;
        data: T_Data;
        body?: string;
        filePath?: string;
    };
    type Input<T_GetCollectionReturn extends InputCollectionDefault[]> = {
        href: string;
    } & ArrayItem<T_GetCollectionReturn>;
    type Export = {
        title: string;
        name: string;
        typeDocId: number;
        parent?: number;
        children?: CollectionTree.Export[];
    };
    class Page<T_CollectionItem extends Input<InputCollectionDefault[]> = Input<InputCollectionDefault[]>> {
        protected readonly raw: T_CollectionItem;
        readonly href: string;
        readonly title: string;
        children: Page[];
        readonly data: Schemata.Default.Metadata.Reflection;
        constructor(raw: T_CollectionItem);
        addChild(child: Page): void;
    }
}
//# sourceMappingURL=CollectionTree.d.ts.map