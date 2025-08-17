/**
 * @module moduleImport_pkgDoc
 * 
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

export function functionExampleModule() { }

export type TypeAliasModule = string | number;

export type TypeAliasFunctionModule = ( str: string ) => number;

export type TypeAliasReferenceModule = InterfaceModule;

export type TypeAliasLiteralModule = "literal type" | "second option";

export interface InterfaceModule {
    fn: ( str: string ) => number;
    param?: number | string;
}

export interface InterfaceFunctionModule {
    ( str: string, num: number ): number;
}

export interface InterfaceFunctionOverloadedModule {
    ( param: number ): number;
    ( param: string ): string;
    ( param?: undefined ): undefined;
    ( param?: number | string ): number | string | undefined;
}




/**
 * Example namespace.
 * 
 * @since ___PKG_VERSION___
 * @internal
 */
export namespace NamespaceExample {

    export enum EnumExample {
        Enum_Member1,
        Enum_Member2,
        Enum_Member3,
        Enum_Member4,
        Enum_Member5,
    }

    export type EnumTypeAlias = EnumExample;

    /**
     * 
     * @example
     * ```ts
     * ExampleVarFunction( 'hello' ) // expected return: 5
     * ```
     * 
     * @source
     */
    export const propFunction = ( str: string ) => str.length;


    /**
     * This is an example class.
     *
     * @since ___PKG_VERSION___
     * @experimental
     */
    export class ClassExample {

        constructor (
            protected prop1: string,
            protected prop2: number = 4,
            protected prop3?: number | object,
        ) { }

        /**
         * 
         * @example
         * ```ts
         * ExampleVarFunction( 'hello' ) // expected return: 5
         * ```
         * 
         * @source
         */
        public propFunctionExample = ( str: string ) => str.length;


        public methodSimple() { }


        /**
         * This comment is on the function's first overload.
         */
        public methodOverloaded( param: number ): number;

        /**
         * This comment is on the function's second overload.
         */
        public methodOverloaded( param: string ): string;

        /**
         * This comment is on the function's third overload.
         */
        public methodOverloaded( param?: undefined ): undefined;

        /**
         * This comment is on the function's implementation.
         * 
         * @param param  This is the param comment for the function implmentation.
         */
        public methodOverloaded( param?: number | string ): number | string | undefined {
            return param;
        }
    }
}