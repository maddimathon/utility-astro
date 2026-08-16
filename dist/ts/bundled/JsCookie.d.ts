/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
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
    readonly path: string;
    /**
     * Cookie's path.
     */
    protected readonly opts: Classify<JsCookie.Opts>;
    /**
     * Now accepting an args object instead of params 3-5.
     *
     * @since 0.1.0-beta.0.draft
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
     * Additional options for this instance.
     */
    opts: JsCookie.Opts.Input);
    /**
     * Please pass an opts object as the third param instead.
     *
     * @deprecated 0.1.0-beta.0.draft
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
/**
 * Utilities for use in the {@link JsCookie} class.
 *
 * @since 0.1.0-beta.0.draft
 */
export declare namespace JsCookie {
    /**
     * Additional configuration options.
     *
     * @since 0.1.0-beta.0.draft
     */
    interface Opts {
        /**
         * Whether to also save the cookie value to LocalStorage.
         *
         * @since 0.1.0-beta.0.draft
         */
        copyToLocalStorage?: undefined | boolean;
        /**
         * Value to return instead of null when no cookie value is found.
         *
         * @default null
         */
        fallbackValue: string | null;
        /**
         * Default number of days until the cookie expires.
         *
         * @default null
         */
        expireDays: number | null;
        /**
         * Maximum age to use when this cookie is set.
         *
         * @default
         * 60 * 60 * 24 * 365 * 5
         */
        maxAge: number;
    }
    /**
     * Additional types for {@link JsCookie.Opts}.
     *
     * @since 0.1.0-beta.0.draft
     */
    namespace Opts {
        /**
         * Additional configuration options.
         *
         * @since 0.1.0-beta.0.draft
         */
        type Input = Partial<JsCookie.Opts>;
    }
}
