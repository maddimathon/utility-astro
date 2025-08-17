/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type {
    Schemata,
} from '../00-types/index.js';

export function sortReflections( a: Schemata.Reflection.Any | undefined, b: Schemata.Reflection.Any | undefined ): number {

    const _indexA = a?.sortingIndex ?? '';
    const _indexB = b?.sortingIndex ?? '';

    if ( _indexA < _indexB ) {
        return -1;
    }
    if ( _indexB > _indexA ) {
        return 1;
    }

    // names must be equal
    return 0;
}