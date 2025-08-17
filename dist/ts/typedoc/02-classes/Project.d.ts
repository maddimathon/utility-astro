/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import type { z } from 'astro/zod';
import { Schemata } from '../00-types/index.js';
import { Project_Page } from './Project_Page.js';
import { Project_Reflection } from './Project_Reflection.js';
/**
 * A class used to represent all the outputs documented by TypeDoc in a given
 * project.
 *
 * @since 0.1.0-alpha.draft
 */
export declare class Project<T_CollectionItem extends Project.TypeParam.Item<T_CollectionName>, T_CollectionName extends string> {
    protected readonly collection: T_CollectionItem[];
    /**
     * All pages in the project, indexed by their typeDocId property value.
     */
    readonly pages: {
        [key: number]: Project_Page.Any;
    };
    /**
     * All reflections in the project, indexed by their typeDocId property
     * value.
     */
    readonly reflections: {
        [key: number]: Project_Reflection.Any;
    };
    /**
     * Project reflections sorted into groups and indexed by their typeDocId
     * property value.
     */
    protected readonly reflectionGroups: {
        hasChild: number[];
        hasParent: number[];
        hasOwnPage: number[];
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
            hasChild: number[];
            hasParent: number[];
            hasOwnPage: number[];
        };
        pages: {
            [key: number]: Project_Page.Any;
        };
    };
}
export declare namespace Project {
    namespace TypeParam {
        interface Item<T_CollectionName extends string = string, T_EntrySchema extends ReturnType<typeof Schemata.Page> = ReturnType<typeof Schemata.Page>> {
            id: string;
            collection: T_CollectionName;
            data: z.output<T_EntrySchema>;
            body?: string;
            filePath?: string;
            rendered?: {
                html: string;
                metadata?: {
                    imagePaths: string[];
                    [key: string]: unknown;
                };
            };
        }
    }
}
//# sourceMappingURL=Project.d.ts.map