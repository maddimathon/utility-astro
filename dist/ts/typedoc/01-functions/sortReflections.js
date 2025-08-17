/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
export function sortReflections(a, b) {
    const _indexA = a?.sortingIndex ?? '';
    const _indexB = b?.sortingIndex ?? '';
    if (_indexA < _indexB) {
        return -1;
    }
    if (_indexB > _indexA) {
        return 1;
    }
    // names must be equal
    return 0;
}
//# sourceMappingURL=sortReflections.js.map