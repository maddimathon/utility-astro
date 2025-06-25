/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import {
    JSONOutput as TypeDocJson,
} from 'typedoc';

/**
 * A page section is a contious portion of a page that starts with a heading and
 * may have subsections.
 */
export class PageSection {

    public subSections: PageSection[] = [];

    /**
     * @param level    A number (1 or above) representing the heading level for this section.
     * @param heading  The heading text for this section.
     * @param content  The page content for this section.
     */
    constructor (
        public level: number,
        public heading: string,
        public content: ( string | PageSection | TypeDocJson.CommentDisplayPart )[],
    ) { }

    /**
     * @param heading           The heading text for this sub-section.
     * @param content           The page content for this sub-section.
     * @param additionalLevels  Level *in addition to this.level* for this subsection.
     */
    public addSubSection(
        heading: string,
        content: ( string | PageSection | TypeDocJson.CommentDisplayPart )[],
        additionalLevels: number = 1,
    ) {
        this.subSections.push(
            new PageSection(
                this.level + Math.max( 1, additionalLevels ),
                heading,
                content,
            )
        );
    }

    public toJSON() {

        return {
            level: this.level,
            heading: this.heading,
            content: this.content,
            subSections: this.subSections,
            toJSON: true,
        };
    }
}