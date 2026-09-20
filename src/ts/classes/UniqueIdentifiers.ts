/**
 * @since 0.1.0-beta.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Creates and tracks unique identifier values.
 * 
 * @since 0.1.0-beta.0
 */
export class UniqueIdentifiers {

    protected existing: Set<string> = new Set();

    public add( id: string ): void {
        this.existing.add( id );
    }

    public new( id: string ): string {
        let i = 1;

        let uniqueID = id;

        while ( this.existing.has( uniqueID ) ) {
            uniqueID = `${ id }-${ i }`;
            i++;
        }

        this.existing.add( uniqueID );
        return uniqueID;
    }
}