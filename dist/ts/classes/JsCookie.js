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
     * Number of days until the cookie expires.
     */
    pathOrOpts, 
    /**
     * Number of days until the cookie expires.
     */
    dep_expireDays = null, 
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
        var _a, _b, _c, _d, _e;
        this.name = name;
        const maxAge = 60 * 60 * 24 * 365 * 5; // = 5 years
        this.opts = typeof pathOrOpts !== 'object'
            ? {
                copyToLocalStorage: dep_copyToLocalStorage,
                domain: undefined,
                expireDays: dep_expireDays !== null && dep_expireDays !== void 0 ? dep_expireDays : null,
                fallbackValue: dep_defaultValue !== null && dep_defaultValue !== void 0 ? dep_defaultValue : null,
                maxAge,
                path: pathOrOpts !== null && pathOrOpts !== void 0 ? pathOrOpts : '/',
            }
            : {
                copyToLocalStorage: (_a = pathOrOpts === null || pathOrOpts === void 0 ? void 0 : pathOrOpts.copyToLocalStorage) !== null && _a !== void 0 ? _a : false,
                domain: pathOrOpts === null || pathOrOpts === void 0 ? void 0 : pathOrOpts.domain,
                expireDays: (_b = pathOrOpts === null || pathOrOpts === void 0 ? void 0 : pathOrOpts.expireDays) !== null && _b !== void 0 ? _b : null,
                fallbackValue: (_c = pathOrOpts === null || pathOrOpts === void 0 ? void 0 : pathOrOpts.fallbackValue) !== null && _c !== void 0 ? _c : null,
                maxAge: (_d = pathOrOpts === null || pathOrOpts === void 0 ? void 0 : pathOrOpts.maxAge) !== null && _d !== void 0 ? _d : maxAge,
                path: (_e = pathOrOpts === null || pathOrOpts === void 0 ? void 0 : pathOrOpts.path) !== null && _e !== void 0 ? _e : '/',
            };
    }
    /**
     * Empties the contents of this cookie.
     *
     * @deprecated 0.1.0-beta.0.draft
     */
    delete() {
        this.remove();
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
     * Empties the contents of this cookie.
     *
     * @since 0.1.0-beta.0.draft — Renamed from delete to remove.
     */
    remove() {
        this.set('', -1);
        if (this.opts.copyToLocalStorage) {
            window.localStorage.removeItem(this.name);
        }
    }
    /**
     * Sets this browser cookie.
     */
    set(value, expireDays = this.opts.expireDays) {
        var _a, _b, _c;
        if (this.opts.copyToLocalStorage) {
            window.localStorage.setItem(this.name, value);
        }
        const expiry = typeof expireDays === 'number'
            ? (() => {
                const d = new Date();
                d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
                return {
                    date: d.toISOString(),
                    expireDays,
                };
            })()
            : null;
        const cookie = {
            [this.name]: value,
            domain: (_a = this.opts.domain) !== null && _a !== void 0 ? _a : null,
            expires: ((_b = expiry === null || expiry === void 0 ? void 0 : expiry.date) === null || _b === void 0 ? void 0 : _b.length) ? expiry.date : null,
            'max-age': ((_c = expiry === null || expiry === void 0 ? void 0 : expiry.date) === null || _c === void 0 ? void 0 : _c.length) ? (expiry.expireDays <= 0 ? 0 : null) : String(this.opts.maxAge),
            path: this.opts.path === false ? null : this.opts.path,
        };
        const cookieString = [];
        for (const key in cookie) {
            const value = cookie[key];
            if (value !== null && typeof value !== 'undefined') {
                cookieString.push(`${key}=${value}`);
            }
        }
        document.cookie = cookieString.join('; ');
    }
}
/**
 * Utilities for use in the {@link JsCookie} class.
 *
 * @since 0.1.0-beta.0.draft
 */
(function (JsCookie) {
    /**
     * A utility to statically get the value of a cookie. For prettier code, not
     * for performance.
     *
     * @since 0.1.0-beta.0.draft
     */
    function get(name, opts = {}) {
        const cookie = new JsCookie(name, opts);
        return cookie.get();
    }
    JsCookie.get = get;
    /**
     * A utility to statically delete the value of a cookie. For prettier code, not
     * for performance.
     *
     * @since 0.1.0-beta.0.draft
     */
    function remove(name, opts = {}) {
        const cookie = new JsCookie(name, opts);
        return cookie.remove();
    }
    JsCookie.remove = remove;
    /**
     * A utility to statically set the value of a cookie. For prettier code, not
     * for performance.
     *
     * @since 0.1.0-beta.0.draft
     */
    function set(name, value, opts = {}) {
        const cookie = new JsCookie(name, opts);
        return cookie.set(value);
    }
    JsCookie.set = set;
})(JsCookie || (JsCookie = {}));
