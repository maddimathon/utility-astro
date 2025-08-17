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
 * @deprecated
 */
export declare class CollectionTree<T_CollectionItem extends CollectionTree.Input<T_GetCollectionReturn>, T_GetCollectionReturn extends CollectionTree.InputCollectionDefault<T_CollectionData, T_CollectionKeys>[], T_CollectionData extends Schemata.Reflection.Any, T_CollectionKeys extends string> {
    protected readonly collection: T_CollectionItem[];
    /**
     * An index of all parent pages and their children.
     */
    readonly map: {
        [key: number]: number[];
    };
    /**
     * All page objects in this collection, indexed by typeDocId.
     */
    readonly pages: {
        [key: number]: CollectionTree.Page<T_CollectionData>;
    };
    constructor(collection: T_CollectionItem[]);
    protected buildMap(): CollectionTree.Export<T_CollectionData>[];
    exportMap(): CollectionTree.Export<T_CollectionData>[];
    exportList(): NestedListTypes.NestedListItem[];
}
export declare namespace CollectionTree {
    type Export<T_CollectionData extends Schemata.Reflection.Any> = Page<T_CollectionData> & {
        children?: Export<T_CollectionData>[];
    };
    type Input<T_GetCollectionReturn extends InputCollectionDefault[]> = {
        href: string;
    } & ArrayItem<T_GetCollectionReturn>;
    type InputCollectionDefault<T_Data extends object = Schemata.Reflection.Any, T_Collection extends string = string> = {
        id: string;
        collection: T_Collection;
        data: T_Data;
        body?: string;
        filePath?: string;
    };
    interface Page<T_CollectionData extends Schemata.Reflection.Any> {
        href: string;
        title: string;
        data: T_CollectionData;
    }
}
//# sourceMappingURL=CollectionTree.d.ts.map