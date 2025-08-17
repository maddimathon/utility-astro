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
import { Schemata } from '../00-types/index.js';
import type { parseKind } from '../01-functions/index.js';
export declare abstract class Project_Reflection<T_Kind extends parseKind.Return, T_HasOwnPage extends boolean = boolean> implements Objects.Classify<Schemata.ReflectionGeneric<T_Kind>> {
    protected reflect: Schemata.ReflectionGeneric<T_Kind>;
    hasOwnPage: T_HasOwnPage;
    data: Schemata.ReflectionGeneric<T_Kind>['data'];
    fullName: string;
    kind: T_Kind;
    name: string;
    splitName: string[];
    typeDocId: number;
    blockTags: Schemata.ReflectionGeneric<T_Kind>['blockTags'];
    flags: Schemata.ReflectionGeneric<T_Kind>['flags'];
    modifierTags: string[] | undefined;
    parent: number | undefined;
    constructor(reflect: Schemata.ReflectionGeneric<T_Kind>, hasOwnPage: T_HasOwnPage);
    /**
     * Creates a cleaner output for conversion.
     *
     * @since 0.1.0-alpha.draft
     */
    toJSON(): Objects.Classify<Schemata.ReflectionGeneric<T_Kind> & {
        hasOwnPage: T_HasOwnPage;
    }>;
}
export declare namespace Project_Reflection {
    function make<T_Kind extends parseKind.Return, T_HasOwnPage extends boolean>(reflect: Schemata.ReflectionGeneric<T_Kind>, hasOwnPage: T_HasOwnPage): Project_Reflection<T_Kind, T_HasOwnPage>;
    type Any = Project_Reflection<parseKind.Return>;
    class Class extends Project_Reflection<Schemata.Reflection.Class['kind']> implements Schemata.Reflection.Class {
    }
    class Function extends Project_Reflection<Schemata.Reflection.Function['kind']> implements Schemata.Reflection.Function {
    }
    class Module extends Project_Reflection<Schemata.Reflection.Module['kind']> implements Schemata.Reflection.Module {
    }
    class Namespace extends Project_Reflection<Schemata.Reflection.Namespace['kind']> implements Schemata.Reflection.Namespace {
    }
    class Plain extends Project_Reflection<Schemata.Reflection.Plain['kind']> implements Schemata.Reflection.Plain {
    }
    class Type extends Project_Reflection<Schemata.Reflection.Type['kind']> implements Schemata.Reflection.Type {
    }
    class Unknown extends Project_Reflection<Schemata.Reflection.Unknown['kind']> implements Schemata.Reflection.Unknown {
    }
    class Value extends Project_Reflection<Schemata.Reflection.Value['kind']> implements Schemata.Reflection.Value {
    }
}
//# sourceMappingURL=Project_Reflection.d.ts.map