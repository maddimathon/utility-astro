/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import * as z from 'zod';
/**
 * Simple types used with the TypeDoc plugins and utilities.
 *
 * @since 0.1.0-alpha.draft
 */
export var Literals;
(function (Literals) {
    let Reflections;
    (function (Reflections) {
        let Kind;
        (function (Kind) {
            Kind.Any = z.union([
                z.literal('Accessor'),
                z.literal('CallSignature'),
                z.literal('Class'),
                z.literal('Constructor'),
                z.literal('ConstructorSignature'),
                z.literal('Document'),
                z.literal('Enum'),
                z.literal('EnumMember'),
                z.literal('Function'),
                z.literal('GetSignature'),
                z.literal('IndexSignature'),
                z.literal('Interface'),
                z.literal('Method'),
                z.literal('Module'),
                z.literal('Namespace'),
                z.literal('Parameter'),
                z.literal('Project'),
                z.literal('Property'),
                z.literal('Reference'),
                z.literal('SetSignature'),
                z.literal('TypeAlias'),
                z.literal('TypeLiteral'),
                z.literal('TypeParameter'),
                z.literal('Variable'),
            ]);
        })(Kind = Reflections.Kind || (Reflections.Kind = {}));
    })(Reflections = Literals.Reflections || (Literals.Reflections = {}));
})(Literals || (Literals = {}));
//# sourceMappingURL=Literals.js.map