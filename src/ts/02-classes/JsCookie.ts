/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Manages a simple, vanilla JS cookie value client-side.
 * 
 * @since ___PKG_VERSION___
 */
export class JsCookie {

    /**
     * @param name          Cookie's name.
     * @param path          Cookie's path.
     * @param expireDays    Optional. Number of days until the cookie expires.
     * @param defaultValue  Optional. Default value to return instead of null.
     */
    public constructor (
        public readonly name: string,
        public readonly path: string,
        public readonly expireDays: number | null = null,
        public readonly defaultValue: string | null = null,
    ) { }

    /**
     * Empties the contents of this cookie.
     */
    public delete(): void {
        this.set( '', -1 );
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

        return this.defaultValue;
    }

    /**
     * Sets this browser cookie.
     */
    public set(
        value: string,
        expireDays: number | null = this.expireDays,
    ): void {

        const cookie: { [ key: string ]: string | null; } = {
            [ this.name ]: value,
            expires: null,
            path: this.path,
        };

        if ( typeof expireDays === 'number' ) {

            const d = new Date();
            d.setTime( d.getTime() + ( expireDays * 24 * 60 * 60 * 1000 ) );

            cookie.expires = d.toUTCString();
        }

        const cookieString = [];

        for ( const key in cookie ) {

            if ( cookie[ key ] !== null ) {
                cookieString.push( `${ key }=${ cookie[ key ] }` );
            }
        }

        document.cookie = cookieString.join( ';' );
    }
}