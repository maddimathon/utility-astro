/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import { slugify } from '@maddimathon/utility-typescript/functions';
export function makeSortingIndex(reflect) {
    const stringPadding = (index, len, opts = {}) => {
        const { char = typeof index === 'number' ? '0' : '_', dir = typeof index === 'number' ? 'start' : 'end', } = opts;
        const str = typeof index === 'number' ? String(index) : index;
        // returns
        if (str.length == len) {
            return str;
        }
        // returns
        if (str.length > len) {
            return str.slice(0, len);
        }
        if (dir == 'start') {
            return char.repeat(len - str.length) + str;
        }
        return str + char.repeat(len - str.length);
    };
    const kindSortIndex = (_kind) => {
        switch (_kind) {
            case 'Accessor':
            case 'CallSignature':
            case 'Class':
            case 'Constructor':
            case 'ConstructorSignature':
            case 'Document':
            case 'Enum':
            case 'EnumMember':
            case 'Function':
            case 'GetSignature':
            case 'IndexSignature':
            case 'Interface':
            case 'Method':
            case 'Module':
            case 'Namespace':
            case 'Parameter':
            case 'Project':
            case 'Property':
            case 'Reference':
            case 'SetSignature':
            case 'TypeAlias':
            case 'TypeLiteral':
            case 'TypeParameter':
            case 'Variable':
            default:
                return 100;
        }
    };
    const kindSortKey = stringPadding(kindSortIndex(reflect.kind), 6)
        + '-'
        + stringPadding(reflect.kind, 24);
    const visibilitySortKey = reflect.flags?.public
        ? 20
        : reflect.flags?.protected
            ? 40
            : reflect.flags?.private
                ? 60
                : 80;
    return (''
        + kindSortKey
        + '__'
        + stringPadding(visibilitySortKey, 3)
        + '__'
        + slugify(reflect.name));
}
//# sourceMappingURL=makeSortingIndex.js.map