/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
/**
 * Functions for adding and removing trailing slashes.
 *
 * @since 0.1.0-alpha.draft
 */
export var trailingSlash;
(function (trailingSlash) {
    /**
     * @since 0.1.0-alpha.draft
     */
    function add(str) {
        // returns
        if (!str.match(/\.[a-z][a-z0-9\-]*$/)) {
            return str.replace(/\/$/gi, '') + '/';
        }
        return str;
    }
    trailingSlash.add = add;
    ;
    /**
     * @since 0.1.0-alpha.draft
     */
    function remove(str) {
        return str.replace(/\/$/gi, '');
    }
    trailingSlash.remove = remove;
    ;
})(trailingSlash || (trailingSlash = {}));
//# sourceMappingURL=trailingSlash.js.map