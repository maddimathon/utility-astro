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
    expireDaysOrOpts, 
    /**
     * Default value to return instead of null.
     */
    dep_defaultValue = null, 
    /**
     * Whether to also save the cookie value to LocalStorage.
     *
     * @since 0.1.0-beta.0.draft
     */
    dep_copyToLocalStorage = false) {
        var _a, _b, _c, _d;
        this.name = name;
        this.path = path;
        const maxAge = 60 * 60 * 24 * 365 * 5;
        this.opts = typeof expireDaysOrOpts !== 'object'
            ? {
                copyToLocalStorage: dep_copyToLocalStorage,
                fallbackValue: dep_defaultValue !== null && dep_defaultValue !== void 0 ? dep_defaultValue : null,
                expireDays: expireDaysOrOpts !== null && expireDaysOrOpts !== void 0 ? expireDaysOrOpts : null,
                maxAge,
            }
            : {
                copyToLocalStorage: (_a = expireDaysOrOpts === null || expireDaysOrOpts === void 0 ? void 0 : expireDaysOrOpts.copyToLocalStorage) !== null && _a !== void 0 ? _a : false,
                fallbackValue: (_b = expireDaysOrOpts === null || expireDaysOrOpts === void 0 ? void 0 : expireDaysOrOpts.fallbackValue) !== null && _b !== void 0 ? _b : null,
                expireDays: (_c = expireDaysOrOpts === null || expireDaysOrOpts === void 0 ? void 0 : expireDaysOrOpts.expireDays) !== null && _c !== void 0 ? _c : null,
                maxAge: (_d = expireDaysOrOpts === null || expireDaysOrOpts === void 0 ? void 0 : expireDaysOrOpts.maxAge) !== null && _d !== void 0 ? _d : maxAge,
            };
    }
    /**
     * Empties the contents of this cookie.
     */
    delete() {
        this.set('', -1);
        if (this.opts.copyToLocalStorage) {
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
        return this.opts.fallbackValue;
    }
    /**
     * Sets this browser cookie.
     */
    set(value, expireDays = this.opts.expireDays) {
        var _a, _b;
        if (this.opts.copyToLocalStorage) {
            window.localStorage.setItem(this.name, value);
        }
        const expiry = typeof expireDays === 'number'
            ? (() => {
                const d = new Date();
                d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
                return {
                    date: d.toUTCString(),
                    expireDays,
                };
            })()
            : null;
        const cookie = {
            [this.name]: value,
            expires: ((_a = expiry === null || expiry === void 0 ? void 0 : expiry.date) === null || _a === void 0 ? void 0 : _a.length) ? expiry.date : null,
            'max-age': ((_b = expiry === null || expiry === void 0 ? void 0 : expiry.date) === null || _b === void 0 ? void 0 : _b.length) ? (expiry.expireDays <= 0 ? 0 : null) : String(this.opts.maxAge),
            path: this.path,
        };
        const cookieString = [];
        for (const key in cookie) {
            if (cookie[key] !== null) {
                cookieString.push(`${key}=${cookie[key]}`);
            }
        }
        document.cookie = cookieString.join('; ');
    }
}
