/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { Objects } from '@maddimathon/utility-typescript/types';

import {
    Schemata,
} from '../00-types/index.js';

import type {
    parseKind,
} from '../01-functions/index.js';
import { isObjectEmpty } from '@maddimathon/build-utilities/internal';

export abstract class Project_Reflection<
    T_Kind extends parseKind.Return,

    // optional
    T_HasOwnPage extends boolean = boolean,
> implements Objects.Classify<Schemata.ReflectionGeneric<T_Kind>> {

    public data: Schemata.ReflectionGeneric<T_Kind>[ 'data' ];
    public fullName: string;
    public kind: T_Kind;
    public name: string;
    public splitName: string[];
    public typeDocId: number;

    public blockTags: Schemata.ReflectionGeneric<T_Kind>[ 'blockTags' ];
    public flags: Schemata.ReflectionGeneric<T_Kind>[ 'flags' ];
    public modifierTags: string[] | undefined;
    public parent: number | undefined;


    public constructor (
        protected reflect: Schemata.ReflectionGeneric<T_Kind>,
        public hasOwnPage: T_HasOwnPage,
    ) {
        this.data = this.reflect.data;
        this.fullName = this.reflect.fullName;
        this.kind = this.reflect.kind;
        this.name = this.reflect.name;
        this.splitName = this.reflect.splitName;
        this.typeDocId = this.reflect.typeDocId;

        this.blockTags = this.reflect.blockTags;
        this.flags = this.reflect.flags;
        this.modifierTags = this.reflect.modifierTags;
        this.parent = this.reflect.parent;
    }


    /**
     * Creates a cleaner output for conversion.
     * 
     * @since ___PKG_VERSION___
     */
    public toJSON(): Objects.Classify<Schemata.ReflectionGeneric<T_Kind> & { hasOwnPage: T_HasOwnPage; }> {

        // const blockTags = isObjectEmpty( this.blockTags ) ? undefined : this.blockTags;
        const data = isObjectEmpty( this.data ) ? undefined : this.data;
        const flags = isObjectEmpty( this.flags ) ? undefined : this.flags;
        // const modifierTags = isObjectEmpty( this.modifierTags ) ? undefined : this.modifierTags;

        return {
            typeDocId: this.typeDocId,

            name: this.name,
            fullName: this.fullName,
            splitName: this.splitName,

            kind: this.kind,
            parent: this.parent,

            flags,

            hasOwnPage: this.hasOwnPage,

            blockTags: this.blockTags,
            modifierTags: this.modifierTags,

            data,
        };
    }
}

export namespace Project_Reflection {

    export function make<
        T_Kind extends parseKind.Return,
        T_HasOwnPage extends boolean,
    >(
        reflect: Schemata.ReflectionGeneric<T_Kind>,
        hasOwnPage: T_HasOwnPage,
    ): Project_Reflection<T_Kind, T_HasOwnPage> {

        const { kind } = reflect;

        switch ( kind ) {

            case 'Accessor':
            case 'Constructor':
            case 'Function':
            case 'GetSignature':
            case 'Method':
            case 'SetSignature':
                return new Project_Reflection.Function( reflect as Schemata.Reflection.Function, hasOwnPage ) as Project_Reflection<T_Kind, T_HasOwnPage>;

            case 'Class':
                return new Project_Reflection.Class( reflect as Schemata.Reflection.Class, hasOwnPage ) as Project_Reflection<T_Kind, T_HasOwnPage>;

            case 'Document':
                return new Project_Reflection.Plain( reflect as Schemata.Reflection.Plain, hasOwnPage ) as Project_Reflection<T_Kind, T_HasOwnPage>;

            case 'Module':
                return new Project_Reflection.Module( reflect as Schemata.Reflection.Module, hasOwnPage ) as Project_Reflection<T_Kind, T_HasOwnPage>;

            case 'Namespace':
                return new Project_Reflection.Namespace( reflect as Schemata.Reflection.Namespace, hasOwnPage ) as Project_Reflection<T_Kind, T_HasOwnPage>;

            case 'Interface':
            case 'TypeAlias':
            case 'TypeLiteral':
            case 'TypeParameter':
                return new Project_Reflection.Type( reflect as Schemata.Reflection.Type, hasOwnPage ) as Project_Reflection<T_Kind, T_HasOwnPage>;

            case 'Enum':
            case 'EnumMember':
            case 'Property':
            case 'Variable':
                return new Project_Reflection.Value( reflect as Schemata.Reflection.Value, hasOwnPage ) as Project_Reflection<T_Kind, T_HasOwnPage>;

            case 'CallSignature':
            case 'ConstructorSignature':
            case 'IndexSignature':
            case 'Parameter':
            case 'Project':
            case 'Reference':
            default:
                return new Project_Reflection.Unknown( reflect as Schemata.Reflection.Unknown, hasOwnPage ) as Project_Reflection<T_Kind, T_HasOwnPage>;
        }
    };

    export type Any = Project_Reflection<parseKind.Return>;


    export class Class extends Project_Reflection<
        Schemata.Reflection.Class[ 'kind' ]
    > implements Schemata.Reflection.Class { }


    export class Function extends Project_Reflection<
        Schemata.Reflection.Function[ 'kind' ]
    > implements Schemata.Reflection.Function { }


    export class Module extends Project_Reflection<
        Schemata.Reflection.Module[ 'kind' ]
    > implements Schemata.Reflection.Module { }


    export class Namespace extends Project_Reflection<
        Schemata.Reflection.Namespace[ 'kind' ]
    > implements Schemata.Reflection.Namespace { }


    export class Plain extends Project_Reflection<
        Schemata.Reflection.Plain[ 'kind' ]
    > implements Schemata.Reflection.Plain { }


    export class Type extends Project_Reflection<
        Schemata.Reflection.Type[ 'kind' ]
    > implements Schemata.Reflection.Type { }


    export class Unknown extends Project_Reflection<
        Schemata.Reflection.Unknown[ 'kind' ]
    > implements Schemata.Reflection.Unknown { }


    export class Value extends Project_Reflection<
        Schemata.Reflection.Value[ 'kind' ]
    > implements Schemata.Reflection.Value { }
}