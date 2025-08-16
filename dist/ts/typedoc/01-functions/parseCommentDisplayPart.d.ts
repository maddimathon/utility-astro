/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import type { CommentDisplayPart } from 'typedoc';
export declare function parseCommentDisplayPart(_parts: CommentDisplayPart | CommentDisplayPart[]): {
    kind: "code" | "text" | "inline-tag" | "relative-link";
    text: string;
    tag: `@${string}`;
    target: string | undefined;
    targetAnchor: string | undefined;
    tsLinkText: string | undefined;
}[];
//# sourceMappingURL=parseCommentDisplayPart.d.ts.map