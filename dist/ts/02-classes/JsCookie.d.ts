/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.18
 * @license MIT
 */
/**
 * Manages a simple, vanilla JS cookie value client-side.
 *
 * @since 0.1.0-alpha
 */
export declare class JsCookie {
    readonly name: string;
    readonly path: string;
    readonly expireDays: number | null;
    readonly defaultValue: string | null;
    /**
     * @param name          Cookie's name.
     * @param path          Cookie's path.
     * @param expireDays    Optional. Number of days until the cookie expires.
     * @param defaultValue  Optional. Default value to return instead of null.
     */
    constructor(name: string, path: string, expireDays?: number | null, defaultValue?: string | null);
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
//# sourceMappingURL=JsCookie.d.ts.map