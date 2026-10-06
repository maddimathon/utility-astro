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
export declare class UniqueIdentifiers {
    protected existing: Set<string>;
    add(id: string): void;
    new(id: string): string;
}
