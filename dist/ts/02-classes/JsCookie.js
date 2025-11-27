/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.5
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
    /**
     * @param name          Cookie's name.
     * @param path          Cookie's path.
     * @param expireDays    Optional. Number of days until the cookie expires.
     * @param defaultValue  Optional. Default value to return instead of null.
     */
    constructor(name, path, expireDays = null, defaultValue = null) {
        this.name = name;
        this.path = path;
        this.expireDays = expireDays;
        this.defaultValue = defaultValue;
    }
    /**
     * Empties the contents of this cookie.
     */
    delete() {
        this.set('', -1);
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
//# sourceMappingURL=JsCookie.js.map