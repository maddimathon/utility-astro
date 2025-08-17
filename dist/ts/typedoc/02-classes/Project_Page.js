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
import {} from '../01-functions/index.js';
export class Project_Page {
    reflect;
    pageSections;
    customSlug;
    constructor(reflect, raw) {
        this.reflect = reflect;
        this.customSlug = raw.data.customSlug;
        this.pageSections = raw.data.pageSections;
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