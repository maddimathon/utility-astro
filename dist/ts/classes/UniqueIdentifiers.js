/**
 * @since 0.1.0-beta.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.4.draft
 * @license MIT
 */
/**
 * Creates and tracks unique identifier values.
 *
 * @since 0.1.0-beta.0
 */
export class UniqueIdentifiers {
    constructor() {
        this.existing = new Set();
    }
    add(id) {
        this.existing.add(id);
    }
    new(id) {
        let i = 1;
        let uniqueID = id;
        while (this.existing.has(uniqueID)) {
            uniqueID = `${id}-${i}`;
            i++;
        }
        this.existing.add(uniqueID);
        return uniqueID;
    }
}
