/**
 * @module module-example
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
//# sourceMappingURL=module-example.d.ts.map