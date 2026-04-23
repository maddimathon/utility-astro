/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */
/**
 * Manages a simple, vanilla JS cookie value client-side.
 *
 * @since 0.1.0-alpha
 */
export declare class JsCookie {
    /**
     * Cookie's name.
     */
    readonly name: string;
    /**
     * Cookie's path.
     */
    readonly path: string;
    /**
     * Number of days until the cookie expires.
     */
    readonly expireDays: number | null;
    /**
     * Default value to return instead of null.
     */
    readonly defaultValue: string | null;
    /**
     * Whether to also save the cookie value to LocalStorage.
     *
     * @since 0.1.0-beta.0.draft
     */
    readonly copyToLocalStorage: boolean;
    constructor(
    /**
     * Cookie's name.
     */
    name: string, 
    /**
     * Cookie's path.
     */
    path: string, 
    /**
     * Number of days until the cookie expires.
     */
    expireDays?: number | null, 
    /**
     * Default value to return instead of null.
     */
    defaultValue?: string | null, 
    /**
     * Whether to also save the cookie value to LocalStorage.
     *
     * @since 0.1.0-beta.0.draft
     */
    copyToLocalStorage?: boolean);
    /**
     * Empties the contents of this cookie.
     */
    delete(): void;
    /**
     * Gets the current value of this cookie.
     */
    get(): string | null;
    /**
     * Sets this browser cookie.
     */
    set(value: string, expireDays?: number | null): void;
}
