/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

// import type { Objects } from '@maddimathon/utility-typescript/types';

import { arrayUnique } from '@maddimathon/utility-typescript/functions';
import type { z } from 'astro/zod';

import { Schemata } from '../00-types/index.js';

import type {
    // parseKind,
} from '../01-functions/index.js';

import { Project_Page } from './Project_Page.js';
import { Project_Reflection } from './Project_Reflection.js';

/**
 * A class used to represent all the outputs documented by TypeDoc in a given
 * project.
 *
 * @since ___PKG_VERSION___
 */
export class Project<
    T_CollectionItem extends Project.TypeParam.Item<T_CollectionName>,
    T_CollectionName extends string,
> {

    /**
     * All pages in the project, indexed by their typeDocId property value.
     */
    public readonly pages: { [ key: number ]: Project_Page.Any; } = {};

    /**
     * All reflections in the project, indexed by their typeDocId property
     * value.
     */
    public readonly reflections: { [ key: number ]: Project_Reflection.Any; } = {};

    /**
     * Project reflections sorted into groups and indexed by their typeDocId
     * property value.
     */
    protected readonly reflectionGroups: {
        hasChild: number[];
        hasParent: number[];
        hasOwnPage: number[];
    };

    constructor (
        protected readonly collection: T_CollectionItem[],
    ) {

        const reflectionGroups: typeof this.reflectionGroups = {
            hasChild: [],
            hasParent: [],
            hasOwnPage: [],
        };

        for ( const item of this.collection ) {

            const _reflect = item.data.reflect;
            const _typeDocId = _reflect.typeDocId;

            // throws
            if ( _typeDocId in this.reflections ) {

                throw new TypeError( 'Duplicate TypeDocIDs found in collection', {
                    cause: {
                        existing: this.reflections[ _typeDocId ],
                        duplicate: item,
                    },
                } );
            }

            this.reflections[ _typeDocId ] = Project_Reflection.make( _reflect, !!item.filePath );

            if ( this.reflections[ _typeDocId ].parent ) {
                reflectionGroups.hasParent.push( _typeDocId );
                reflectionGroups.hasChild.push( this.reflections[ _typeDocId ].parent );
            }

            if ( this.reflections[ _typeDocId ].hasOwnPage ) {

                reflectionGroups.hasOwnPage.push( _typeDocId );

                this.pages[ _typeDocId ] = new Project_Page( {
                    customSlug: item.data.customSlug,
                    pageSections: item.data.pageSections,
                    reflect: this.reflections[ _typeDocId ] as Project_Reflection.Any & { hasOwnPage: true; },
                } );
            }
        }

        this.reflectionGroups = {
            hasChild: arrayUnique( reflectionGroups.hasChild ),
            hasParent: arrayUnique( reflectionGroups.hasParent ),
            hasOwnPage: arrayUnique( reflectionGroups.hasOwnPage ),
        };
    }

    /**
     * Creates a cleaner output for conversion.
     * 
     * @since ___PKG_VERSION___
     */
    public toJSON() {
        // type Return = Objects.Classify<Omit<
        //     Project<T_CollectionItem, T_CollectionName>,
        //     "toJSON"
        // >>;

        // const reflections: Partial<typeof this.reflections> = {};

        // const pages: Partial<typeof this.pages> = {};

        return {
            reflections: this.reflections,
            reflectionGroups: this.reflectionGroups,
            pages: this.pages,
        };
    }
}

export namespace Project {

    export namespace TypeParam {

        export interface Item<
            T_CollectionName extends string = string,
            T_EntrySchema extends ReturnType<typeof Schemata.Page> = ReturnType<typeof Schemata.Page>,
        > {
            id: string;

            collection: T_CollectionName;
            data: z.output<T_EntrySchema>;

            body?: string;
            filePath?: string;

            rendered?: {
                html: string;

                metadata?: {
                    imagePaths: string[];
                    [ key: string ]: unknown;
                };
            };
        }
    }
}