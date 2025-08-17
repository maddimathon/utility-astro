/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { parseKind } from './parseKind.js';

export function kindIconName<T_Kind extends parseKind.Return>( kind: T_Kind ): kindIconName.Name | undefined {

    switch ( kind ) {

        case 'Accessor':
        case 'Constructor':
        case 'GetSignature':
        case 'SetSignature':
            return 'Accessor';

        case 'ConstructorSignature':
            return 'Constructor';

        case 'TypeAlias':
        case 'TypeLiteral':
        case 'TypeParameter':
            return 'Type';

        case 'Class':
        case 'Document':
        case 'Enum':
        case 'Function':
        case 'Interface':
        case 'Method':
        case 'Module':
        case 'Namespace':
        case 'Parameter':
        case 'Project':
        case 'Property':
        case 'Reference':
        case 'Variable':
            return kind;
    }

    return undefined;
}

export namespace kindIconName {

    export type Name =
        | "Accessor"
        | "Class"
        | "Constructor"
        | "Document"
        | "Enum"
        | "Function"
        | "Interface"
        | "Method"
        | "Module"
        | "Namespace"
        | "Parameter"
        | "Project"
        | "Property"
        | "Reference"
        | "Type"
        | "Variable";
}