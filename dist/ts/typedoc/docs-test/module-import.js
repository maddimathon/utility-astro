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
export function functionExampleModule() { }
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
    /**
     * This is an example class.
     *
     * @since 0.1.0-alpha.draft
     * @experimental
     */
    class ClassExample {
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
    NamespaceExample.ClassExample = ClassExample;
})(NamespaceExample || (NamespaceExample = {}));
//# sourceMappingURL=module-import.js.map