/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
// import { VariableInspector } from '@maddimathon/utility-typescript/classes';
export function parseCommentDisplayPart(_parts) {
    const parts = Array.isArray(_parts) ? _parts : [_parts];
    const inpectPrepper = (_part) => ({
        kind: _part.kind,
        text: _part.text,
        tag: _part.tag,
        target: typeof _part.target === 'string' ? `${_part.target}` : undefined,
        targetAnchor: _part.targetAnchor,
        tsLinkText: _part.tsLinkText,
    });
    return parts.map(_part => inpectPrepper(_part));
    // return parts.map( _part => VariableInspector.stringify( { part: inpectPrepper( _part ) }, { childArgs: { includeValue: false } } ) );
}
//# sourceMappingURL=parseCommentDisplayPart.js.map