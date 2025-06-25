/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import { Objects } from '@maddimathon/utility-typescript/types';

import {
    JSONOutput as TypeDocJson,
} from 'typedoc';

export class DocComment implements Objects.Classify<TypeDocJson.Comment> {

    public summary: TypeDocJson.CommentDisplayPart[];
    public blockTags: TypeDocJson.CommentTag[];
    public label: string | undefined;
    public modifierTags: `@${ string }`[];

    constructor ( {
        summary,
        blockTags,
        label,
        modifierTags,
    }: TypeDocJson.Comment ) {
        this.summary = summary;
        this.blockTags = blockTags ?? [];
        this.label = label;
        this.modifierTags = modifierTags ?? [];
    }
}