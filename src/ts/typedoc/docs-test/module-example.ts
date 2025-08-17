/**
 * @module module-example
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
