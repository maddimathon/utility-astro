/**
 * @module moduleImport_pkgDoc
 *
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
export declare function functionExampleModule(): void;
export type TypeAliasModule = string | number;
export type TypeAliasFunctionModule = (str: string) => number;
export type TypeAliasReferenceModule = InterfaceModule;
export type TypeAliasLiteralModule = "literal type" | "second option";
export interface InterfaceModule {
    fn: (str: string) => number;
    param?: number | string;
}
export interface InterfaceFunctionModule {
    (str: string, num: number): number;
}
export interface InterfaceFunctionOverloadedModule {
    (param: number): number;
    (param: string): string;
    (param?: undefined): undefined;
    (param?: number | string): number | string | undefined;
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
    /**
     * This is an example class.
     *
     * @since 0.1.0-alpha.draft
     * @experimental
     */
    class ClassExample {
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
}
//# sourceMappingURL=module-import.d.ts.map