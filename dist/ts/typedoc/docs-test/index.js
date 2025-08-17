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
export var EnumExample;
(function (EnumExample) {
    EnumExample[EnumExample["Enum_Member1"] = 0] = "Enum_Member1";
    EnumExample[EnumExample["Enum_Member2"] = 1] = "Enum_Member2";
    EnumExample[EnumExample["Enum_Member3"] = 2] = "Enum_Member3";
    EnumExample[EnumExample["Enum_Member4"] = 3] = "Enum_Member4";
    EnumExample[EnumExample["Enum_Member5"] = 4] = "Enum_Member5";
})(EnumExample || (EnumExample = {}));
export const constExample1 = 1;
export const constExample2 = 'string';
export const constExample3 = [1, 'string'];
export const constExample4 = [1, 'string'];
export let letExample1 = 1;
export let letExample2 = 'string';
export let letExample3 = [1, 'string'];
export let letExample4 = [1, 'string'];
export function functionSimple() { }
/**
 * This comment is on the function's implementation.
 *
 * @param param  This is the param comment for the function implmentation.
 */
export function functionOverloaded(param) {
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
 * @since 0.1.0-alpha.draft
 * @experimental
 */
export class ClassExample {
    prop1;
    prop2;
    prop3;
    constructor(prop1, prop2 = 4, prop3) {
        this.prop1 = prop1;
        this.prop2 = prop2;
        this.prop3 = prop3;
    }
    /**
     *
     * @example
     * ```ts
     * ExampleVarFunction( 'hello' ) // expected return: 5
     * ```
     *
     * @source
     */
    propFunctionExample = (str) => str.length;
    methodSimple() { }
    /**
     * This comment is on the function's implementation.
     *
     * @param param  This is the param comment for the function implmentation.
     */
    methodOverloaded(param) {
        return param;
    }
}
/**
 * Example namespace.
 *
 * @since 0.1.0-alpha.draft
 * @internal
 */
export var NamespaceExample;
(function (NamespaceExample) {
    let EnumExample;
    (function (EnumExample) {
        EnumExample[EnumExample["Enum_Member1"] = 0] = "Enum_Member1";
        EnumExample[EnumExample["Enum_Member2"] = 1] = "Enum_Member2";
        EnumExample[EnumExample["Enum_Member3"] = 2] = "Enum_Member3";
        EnumExample[EnumExample["Enum_Member4"] = 3] = "Enum_Member4";
        EnumExample[EnumExample["Enum_Member5"] = 4] = "Enum_Member5";
    })(EnumExample = NamespaceExample.EnumExample || (NamespaceExample.EnumExample = {}));
    /**
     *
     * @example
     * ```ts
     * ExampleVarFunction( 'hello' ) // expected return: 5
     * ```
     *
     * @source
     */
    NamespaceExample.propFunction = (str) => str.length;
})(NamespaceExample || (NamespaceExample = {}));
//# sourceMappingURL=index.js.map