/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import * as z from 'zod';

import type { Schemata } from './Schemata.js';

export namespace Astro {

    export interface CollectionItem<
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