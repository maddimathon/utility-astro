/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import type { Astro } from '../00-types/index.js';
import { Project_Page } from './Project_Page.js';
import { Project_Reflection } from './Project_Reflection.js';
import { Project_Tree } from './Project_Tree.js';
/**
 * A class used to represent all the outputs documented by TypeDoc in a given
 * project.
 *
 * @since 0.1.0-alpha.draft
 */
export declare class Project<T_CollectionItem extends Astro.CollectionItem<T_CollectionName>, T_CollectionName extends string> {
    protected readonly collection: T_CollectionItem[];
    /**
     * All pages in the project, indexed by their typeDocId property value.
     */
    readonly pages: {
        [key: number]: Project_Page.Any;
    };
    /**
     * Raw inputs, indexed by their typeDocId property value.
     */
    readonly raw: {
        [key: number]: T_CollectionItem;
    };
    /**
     * All reflections in the project, indexed by their typeDocId property
     * value.
     */
    readonly reflections: {
        [key: number]: Project_Reflection.Any;
    };
    /**
     * Hierarchical representation of reflections in the project.
     */
    readonly tree: Project_Tree<T_CollectionItem, T_CollectionName>;
    /**
     * Project reflections sorted into groups and indexed by their typeDocId
     * property value.
     */
    protected readonly reflectionGroups: {
        all: number[];
        hasChild: number[];
        hasParent: number[];
        hasOwnPage: number[];
        /**
         * All child reflections' typeDocId, indexed by their parent typeDocId
         * property value.
         */
        childrenByParent: {
            [key: number]: number[];
        };
    };
    constructor(collection: T_CollectionItem[]);
    /**
     * Creates a cleaner output for conversion.
     *
     * @since 0.1.0-alpha.draft
     */
    toJSON(): {
        reflections: {
            [key: number]: Project_Reflection.Any;
        };
        reflectionGroups: {
            all: number[];
            hasChild: number[];
            hasParent: number[];
            hasOwnPage: number[];
            /**
             * All child reflections' typeDocId, indexed by their parent typeDocId
             * property value.
             */
            childrenByParent: {
                [key: number]: number[];
            };
        };
        pages: {
            [key: number]: Project_Page.Any;
        };
    };
}
export declare namespace Project {
}
//# sourceMappingURL=Project.d.ts.map