/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
export function kindIconName(kind) {
    switch (kind) {
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
//# sourceMappingURL=kindIconName.js.map