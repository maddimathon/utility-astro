/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.1
 * @license MIT
 */
import type { Classify } from '@maddimathon/utility-typescript/types';
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
    protected readonly opts: Classify<JsCookie.Opts>;
    /**
     * Now accepting an args object instead of params 3-5.
     *
     * @since 0.1.0-beta.0
     */
    constructor(
    /**
     * Cookie's name.
     */
    name: string, 
    /**
     * Additional options for this instance.
     */
    opts: JsCookie.Opts.Input);
    /**
     * Please pass an opts object as the third param instead.
     *
     * @deprecated 0.1.0-beta.0
     */
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
    fallbackValue?: string | null, 
    /**
     * Whether to also save the cookie value to LocalStorage.
     *
     * @since 0.1.0-beta.0
     */
    copyToLocalStorage?: boolean);
    /**
     * Empties the contents of this cookie.
     *
     * @deprecated 0.1.0-beta.0
     */
    delete(): void;
    /**
     * Gets the current value of this cookie.
     */
    get(): string | null;
    /**
     * Empties the contents of this cookie.
     *
     * @since 0.1.0-beta.0 — Renamed from delete to remove.
     */
    remove(): void;
    /**
     * Sets this browser cookie.
     */
    set(value: string, expireDays?: number | null): void;
}
/**
 * Utilities for use in the {@link JsCookie} class.
 *
 * @since 0.1.0-beta.0
 */
export declare namespace JsCookie {
    /**
     * A utility to statically get the value of a cookie. For prettier code, not
     * for performance.
     *
     * @since 0.1.0-beta.0
     */
    function get(name: string, opts?: JsCookie.Opts.Input): string | null;
    /**
     * A utility to statically delete the value of a cookie. For prettier code, not
     * for performance.
     *
     * @since 0.1.0-beta.0
     */
    function remove(name: string, opts?: JsCookie.Opts.Input): void;
    /**
     * A utility to statically set the value of a cookie. For prettier code, not
     * for performance.
     *
     * @since 0.1.0-beta.0
     */
    function set(name: string, value: string, opts?: JsCookie.Opts.Input): void;
    /**
     * Additional configuration options.
     *
     * @since 0.1.0-beta.0
     */
    interface Opts {
        /**
         * Whether to also save the cookie value to LocalStorage.
         *
         * @since 0.1.0-beta.0
         */
        copyToLocalStorage?: undefined | boolean;
        /**
         * Cookie's path.
         */
        domain?: undefined | string;
        /**
         * Default number of days until the cookie expires.
         *
         * @default null
         */
        expireDays: number | null;
        /**
         * Value to return instead of null when no cookie value is found.
         *
         * @default null
         */
        fallbackValue: string | null;
        /**
         * Maximum age to use when this cookie is set.
         *
         * @default
         * 60 * 60 * 24 * 365 * 5
         */
        maxAge: number;
        /**
         * Cookie's path.
         */
        path: string | false;
    }
    /**
     * Additional types for {@link JsCookie.Opts}.
     *
     * @since 0.1.0-beta.0
     */
    namespace Opts {
        /**
         * Additional configuration options.
         *
         * @since 0.1.0-beta.0
         */
        type Input = Partial<JsCookie.Opts>;
    }
}
