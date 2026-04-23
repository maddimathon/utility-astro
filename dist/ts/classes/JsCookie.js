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
export class JsCookie {
    name;
    path;
    expireDays;
    defaultValue;
    copyToLocalStorage;
    constructor(
    /**
     * Cookie's name.
     */
    name, 
    /**
     * Cookie's path.
     */
    path, 
    /**
     * Number of days until the cookie expires.
     */
    expireDays = null, 
    /**
     * Default value to return instead of null.
     */
    defaultValue = null, 
    /**
     * Whether to also save the cookie value to LocalStorage.
     *
     * @since 0.1.0-beta.0.draft
     */
    copyToLocalStorage = false) {
        this.name = name;
        this.path = path;
        this.expireDays = expireDays;
        this.defaultValue = defaultValue;
        this.copyToLocalStorage = copyToLocalStorage;
    }
    /**
     * Empties the contents of this cookie.
     */
    delete() {
        this.set('', -1);
        if (this.copyToLocalStorage) {
            window.localStorage.removeItem(this.name);
        }
    }
    /**
     * Gets the current value of this cookie.
     */
    get() {
        const decodedCookie = decodeURIComponent(document.cookie)
            .split(';')
            .map(str => str.trim());
        const cookieRegex = new RegExp(`^${this.name}=`, 'g');
        for (const pair of decodedCookie) {
            if (pair.match(cookieRegex) !== null) {
                return pair.replace(cookieRegex, '');
            }
        }
        return this.defaultValue;
    }
    /**
     * Sets this browser cookie.
     */
    set(value, expireDays = this.expireDays) {
        if (this.copyToLocalStorage) {
            window.localStorage.setItem(this.name, value);
        }
        const cookie = {
            [this.name]: value,
            expires: null,
            path: this.path,
        };
        if (typeof expireDays === 'number') {
            const d = new Date();
            d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
            cookie['expires'] = d.toUTCString();
        }
        const cookieString = [];
        for (const key in cookie) {
            if (cookie[key] !== null) {
                cookieString.push(`${key}=${cookie[key]}`);
            }
        }
        document.cookie = cookieString.join(';');
    }
}
