/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import type { parseKind } from './parseKind.js';
export declare function kindIconName<T_Kind extends parseKind.Return>(kind: T_Kind): kindIconName.Name | undefined;
export declare namespace kindIconName {
    type Name = "Accessor" | "Class" | "Constructor" | "Document" | "Enum" | "Function" | "Interface" | "Method" | "Module" | "Namespace" | "Parameter" | "Project" | "Property" | "Reference" | "Type" | "Variable";
}
//# sourceMappingURL=kindIconName.d.ts.map