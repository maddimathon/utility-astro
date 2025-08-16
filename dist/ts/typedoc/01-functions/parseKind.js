/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import { Models, ReflectionKind, } from 'typedoc';
import * as z from 'zod';
/**
 * Converts the TypeDoc reflection number enum into the kind's name.
 *
 * @since 0.1.0-alpha.draft
 *
 * @experimental
 */
export function parseKind(kind) {
    switch (kind) {
        case Models.ReflectionKind.Accessor:
            return 'Accessor';
        case Models.ReflectionKind.CallSignature:
            return 'CallSignature';
        case Models.ReflectionKind.Class:
            return 'Class';
        case Models.ReflectionKind.Constructor:
            return 'Constructor';
        case Models.ReflectionKind.ConstructorSignature:
            return 'ConstructorSignature';
        case Models.ReflectionKind.Document:
            return 'Document';
        case Models.ReflectionKind.Enum:
            return 'Enum';
        case Models.ReflectionKind.EnumMember:
            return 'EnumMember';
        case Models.ReflectionKind.Function:
            return 'Function';
        case Models.ReflectionKind.GetSignature:
            return 'GetSignature';
        case Models.ReflectionKind.IndexSignature:
            return 'IndexSignature';
        case Models.ReflectionKind.Interface:
            return 'Interface';
        case Models.ReflectionKind.Method:
            return 'Method';
        case Models.ReflectionKind.Module:
            return 'Module';
        case Models.ReflectionKind.Namespace:
            return 'Namespace';
        case Models.ReflectionKind.Parameter:
            return 'Parameter';
        case Models.ReflectionKind.Project:
            return 'Project';
        case Models.ReflectionKind.Property:
            return 'Property';
        case Models.ReflectionKind.Reference:
            return 'Reference';
        case Models.ReflectionKind.SetSignature:
            return 'SetSignature';
        case Models.ReflectionKind.TypeAlias:
            return 'TypeAlias';
        case Models.ReflectionKind.TypeLiteral:
            return 'TypeLiteral';
        case Models.ReflectionKind.TypeParameter:
            return 'TypeParameter';
        case Models.ReflectionKind.Variable:
            return 'Variable';
        default:
            true;
            return kind;
    }
}
;
(function (parseKind) {
    parseKind.returnSchema = z.union([
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
})(parseKind || (parseKind = {}));
;
//# sourceMappingURL=parseKind.js.map