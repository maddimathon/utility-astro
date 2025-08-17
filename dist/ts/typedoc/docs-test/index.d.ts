/**
 * @module
 * @mergeModuleWith <project>
 *
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
/**
 * @module moduleImport
 */
export * as moduleImport from './module-import.js';
export declare enum EnumExample {
    Enum_Member1 = 0,
    Enum_Member2 = 1,
    Enum_Member3 = 2,
    Enum_Member4 = 3,
    Enum_Member5 = 4
}
export type EnumTypeAliasExample = EnumExample;
export declare const constExample1 = 1;
export declare const constExample2 = "string";
export declare const constExample3: (string | number)[];
export declare const constExample4: readonly [1, "string"];
export declare let letExample1: number;
export declare let letExample2: string;
export declare let letExample3: (string | number)[];
export declare let letExample4: readonly [1, "string"];
export declare function functionSimple(): void;
/**
 * This comment is on the function's first overload.
 */
export declare function functionOverloaded(param: number): number;
/**
 * This comment is on the function's second overload.
 */
export declare function functionOverloaded(param: string): string;
/**
 * This comment is on the function's third overload.
 */
export declare function functionOverloaded(param?: undefined): undefined;
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
 * @since 0.1.0-alpha.draft
 * @experimental
 */
export declare class ClassExample {
    protected prop1: string;
    protected prop2: number;
    protected prop3?: number | object | undefined;
    constructor(prop1: string, prop2?: number, prop3?: number | object | undefined);
    /**
     *
     * @example
     * ```ts
     * ExampleVarFunction( 'hello' ) // expected return: 5
     * ```
     *
     * @source
     */
    propFunctionExample: (str: string) => number;
    methodSimple(): void;
    /**
     * This comment is on the function's first overload.
     */
    methodOverloaded(param: number): number;
    /**
     * This comment is on the function's second overload.
     */
    methodOverloaded(param: string): string;
    /**
     * This comment is on the function's third overload.
     */
    methodOverloaded(param?: undefined): undefined;
}
/**
 * Example namespace.
 *
 * @since 0.1.0-alpha.draft
 * @internal
 */
export declare namespace NamespaceExample {
    enum EnumExample {
        Enum_Member1 = 0,
        Enum_Member2 = 1,
        Enum_Member3 = 2,
        Enum_Member4 = 3,
        Enum_Member5 = 4
    }
    type EnumTypeAlias = EnumExample;
    /**
     *
     * @example
     * ```ts
     * ExampleVarFunction( 'hello' ) // expected return: 5
     * ```
     *
     * @source
     */
    const propFunction: (str: string) => number;
}
//# sourceMappingURL=index.d.ts.map