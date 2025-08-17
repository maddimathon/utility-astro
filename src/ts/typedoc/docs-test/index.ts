/**
 * @module
 * @mergeModuleWith <project>
 * 
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * @module moduleImport
 */
export * as moduleImport from './module-import.js';


export enum EnumExample {
    Enum_Member1,
    Enum_Member2,
    Enum_Member3,
    Enum_Member4,
    Enum_Member5,
}

export type EnumTypeAliasExample = EnumExample;


export const constExample1 = 1;
export const constExample2 = 'string';
export const constExample3 = [ 1, 'string' ];
export const constExample4 = [ 1, 'string' ] as const;

export let letExample1 = 1;
export let letExample2 = 'string';
export let letExample3 = [ 1, 'string' ];
export let letExample4 = [ 1, 'string' ] as const;


export function functionSimple() { }


/**
 * This comment is on the function's first overload.
 */
export function functionOverloaded( param: number ): number;

/**
 * This comment is on the function's second overload.
 */
export function functionOverloaded( param: string ): string;

/**
 * This comment is on the function's third overload.
 */
export function functionOverloaded( param?: undefined ): undefined;

/**
 * This comment is on the function's implementation.
 * 
 * @param param  This is the param comment for the function implmentation.
 */
export function functionOverloaded( param?: number | string ): number | string | undefined {
    return param;
}


/**
 * This is an example class.
 *
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Aenean tortor
 * nulla, laoreet eget fermentum et, efficitur vitae est.  Integer ipsum arcu,
 * ultrices eget lacus sed, posuere pulvinar sapien.  Vivamus non malesuada
 * tortor.
 *
 * Quisque elit est, vulputate in mattis nec, varius ut velit.  In vel leo
 * varius, placerat ex id, cursus nulla. Sed turpis libero, dapibus ut
 * condimentum vitae, vestibulum quis arcu.
 *
 * @remarks
 * This is a remarks block tag.  Lorem ipsum dolor sit amet, consectetur
 * adipiscing elit.  Aenean tortor nulla, laoreet eget fermentum et, efficitur
 * vitae est.  Integer ipsum arcu, ultrices eget lacus sed, posuere pulvinar
 * sapien.  Vivamus non malesuada tortor.  Quisque elit est, vulputate in mattis
 * nec, varius ut velit.  In vel leo varius, placerat ex id, cursus nulla. Sed
 * turpis libero, dapibus ut condimentum vitae, vestibulum quis arcu.
 *
 * In aliquet lacus enim, et congue lectus condimentum ac.  Suspendisse quis
 * tortor id lacus bibendum dignissim et a augue.  Curabitur nec metus
 * tincidunt, tristique libero in, pretium massa.  Nullam nunc nulla, iaculis
 * non neque eget, dignissim lobortis neque.
 *
 * Morbi imperdiet nunc eget velit suscipit, eget posuere mi porttitor.  Donec
 * at mauris id est bibendum aliquam vitae ornare velit.  Sed varius, est quis
 * dictum interdum, lectus risus aliquet nisi, molestie viverra mi justo dapibus
 * elit.
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
}