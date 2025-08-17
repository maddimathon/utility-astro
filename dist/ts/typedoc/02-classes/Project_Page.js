/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import { Schemata, } from '../00-types/index.js';
export class Project_Page {
    reflect;
    pageSections;
    customSlug;
    constructor(page) {
        this.reflect = page.reflect;
        this.pageSections = page.pageSections;
        this.customSlug = page.customSlug;
    }
    /**
     * Creates a cleaner output for conversion.
     *
     * @since 0.1.0-alpha.draft
     */
    toJSON() {
        return {
            customSlug: this.customSlug,
            pageSections: this.pageSections,
            reflect: this.reflect,
        };
    }
}
//# sourceMappingURL=Project_Page.js.map