/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import * as z from 'zod';
import type { Schemata } from './Schemata.js';
export declare namespace Astro {
    interface CollectionItem<T_CollectionName extends string = string, T_EntrySchema extends ReturnType<typeof Schemata.Page> = ReturnType<typeof Schemata.Page>> {
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
//# sourceMappingURL=Astro.d.ts.map