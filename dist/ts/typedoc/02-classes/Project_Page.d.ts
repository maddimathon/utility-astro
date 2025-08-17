/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import type { Objects } from '@maddimathon/utility-typescript/types';
import type { Project_Reflection } from './Project_Reflection.js';
import { Schemata } from '../00-types/index.js';
import type { parseKind } from '../01-functions/index.js';
export declare class Project_Page<T_Reflection extends Project_Page.ReflectionParam<T_Kind>, T_Kind extends parseKind.Return> implements Objects.Classify<Schemata.PageGeneric<T_Reflection>> {
    reflect: T_Reflection;
    pageSections: Schemata.PageGeneric<T_Reflection>['pageSections'];
    customSlug: string | undefined;
    constructor(page: Schemata.PageGeneric<T_Reflection>);
    /**
     * Creates a cleaner output for conversion.
     *
     * @since 0.1.0-alpha.draft
     */
    toJSON(): Objects.Classify<Schemata.PageGeneric<T_Reflection>>;
}
export declare namespace Project_Page {
    type Any = Project_Page<Project_Reflection.Any & {
        hasOwnPage: true;
    }, parseKind.Return>;
    type ReflectionParam<T_Kind extends parseKind.Return = parseKind.Return> = Project_Reflection<T_Kind> & {
        hasOwnPage: true;
    };
}
//# sourceMappingURL=Project_Page.d.ts.map