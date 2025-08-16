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
    CommentDisplayPart,
    InlineTagDisplayPart,
    RelativeLinkDisplayPart,
} from 'typedoc';

// import { VariableInspector } from '@maddimathon/utility-typescript/classes';

export function parseCommentDisplayPart(
    _parts: CommentDisplayPart | CommentDisplayPart[],
) {

    const parts = Array.isArray( _parts ) ? _parts : [ _parts ];

    const inpectPrepper = ( _part: CommentDisplayPart ) => ( {
        kind: _part.kind,
        text: _part.text,

        tag: ( _part as InlineTagDisplayPart ).tag,
        target: typeof ( _part as InlineTagDisplayPart | RelativeLinkDisplayPart ).target === 'string' ? `${ ( _part as InlineTagDisplayPart | RelativeLinkDisplayPart ).target }` : undefined,
        targetAnchor: ( _part as RelativeLinkDisplayPart ).targetAnchor,
        tsLinkText: ( _part as InlineTagDisplayPart ).tsLinkText,
    } );

    return parts.map( _part => inpectPrepper( _part ) );
    // return parts.map( _part => VariableInspector.stringify( { part: inpectPrepper( _part ) }, { childArgs: { includeValue: false } } ) );
}