/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { Classify } from '@maddimathon/utility-typescript/types';

/**
 * Manages a simple, vanilla JS cookie value client-side.
 * 
 * @since 0.1.0-alpha
 */
export class JsCookie {

    /**
     * Cookie's path.
     */
    protected readonly opts: Classify<JsCookie.Opts>;

    /**
     * Now accepting an args object instead of params 3-5.
     * 
     * @since ___PKG_VERSION___
     */
    public constructor (
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
        opts: JsCookie.Opts.Input,
    );

    /**
     * Please pass an opts object as the third param instead.
     * 
     * @deprecated ___PKG_VERSION___
     */
    public constructor (
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
         * @since ___PKG_VERSION___
         */
        copyToLocalStorage?: boolean,
    );

    public constructor (
        /**
         * Cookie's name.
         */
        public readonly name: string,

        /**
         * Cookie's path.
         */
        public readonly path: string,

        /**
         * Number of days until the cookie expires.
         */
        expireDaysOrOpts?: number | null | JsCookie.Opts.Input,

        /**
         * Default value to return instead of null.
         */
        dep_defaultValue: string | null = null,

        /**
         * Whether to also save the cookie value to LocalStorage.
         * 
         * @since ___PKG_VERSION___
         */
        dep_copyToLocalStorage: boolean = false,
    ) {

        const maxAge = 60 * 60 * 24 * 365 * 5;

        this.opts = typeof expireDaysOrOpts !== 'object'
            ? {
                copyToLocalStorage: dep_copyToLocalStorage,
                fallbackValue: dep_defaultValue ?? null,
                expireDays: expireDaysOrOpts ?? null,
                maxAge,
            } satisfies Classify<JsCookie.Opts>
            : {
                copyToLocalStorage: expireDaysOrOpts?.copyToLocalStorage ?? false,
                fallbackValue: expireDaysOrOpts?.fallbackValue ?? null,
                expireDays: expireDaysOrOpts?.expireDays ?? null,
                maxAge: expireDaysOrOpts?.maxAge ?? maxAge,
            } satisfies Classify<JsCookie.Opts>;
    }

    /**
     * Empties the contents of this cookie.
     */
    public delete(): void {
        this.set( '', -1 );

        if ( this.opts.copyToLocalStorage ) {
            window.localStorage.removeItem( this.name );
        }
    }

    /**
     * Gets the current value of this cookie.
     */
    public get(): string | null {

        const decodedCookie: string[] = decodeURIComponent( document.cookie )
            .split( ';' )
            .map( str => str.trim() );

        const cookieRegex: RegExp = new RegExp( `^${ this.name }=`, 'g' );

        for ( const pair of decodedCookie ) {

            if ( pair.match( cookieRegex ) !== null ) {
                return pair.replace( cookieRegex, '' );
            }
        }

        return this.opts.fallbackValue;
    }

    /**
     * Sets this browser cookie.
     */
    public set(
        value: string,
        expireDays: number | null = this.opts.expireDays,
    ): void {
        if ( this.opts.copyToLocalStorage ) {
            window.localStorage.setItem( this.name, value );
        }

        const expiry = typeof expireDays === 'number'
            ? ( () => {
                const d = new Date();
                d.setTime( d.getTime() + ( expireDays * 24 * 60 * 60 * 1000 ) );
                return {
                    date: d.toUTCString(),
                    expireDays,
                };
            } )()
            : null;

        const cookie = {
            [ this.name ]: value,
            expires: expiry?.date?.length ? expiry.date : null,
            'max-age': expiry?.date?.length ? ( expiry.expireDays <= 0 ? 0 : null ) : String( this.opts.maxAge ),
            path: this.path,
        };

        const cookieString = [];

        for ( const key in cookie ) {

            if ( cookie[ key ] !== null ) {
                cookieString.push( `${ key }=${ cookie[ key ] }` );
            }
        }

        document.cookie = cookieString.join( '; ' );
    }
}

/**
 * Utilities for use in the {@link JsCookie} class.
 * 
 * @since ___PKG_VERSION___
 */
export namespace JsCookie {

    /**
     * Additional configuration options.
     * 
     * @since ___PKG_VERSION___
     */
    export interface Opts {

        /**
         * Whether to also save the cookie value to LocalStorage.
         * 
         * @since ___PKG_VERSION___
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
     * @since ___PKG_VERSION___
     */
    export namespace Opts {
        /**
         * Additional configuration options.
         * 
         * @since ___PKG_VERSION___
         */
        export type Input = Partial<JsCookie.Opts>;
    }
}