/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.16
 * @license MIT
 */
import { escRegExp } from '@maddimathon/utility-typescript/functions';
/**
 * Escapes a url string for better, more properly applicable, url matching.
 *
 * - makes https into https?
 * - makes last slash optional
 * - makes www. prefix optional.
 *
 * @since 0.1.0-alpha
 */
export function escRegExpURL(url) {
    const matches = url.match(/^((?:https?:\/\/)?)((?:www\.)?)(.*)(\/?)$/i);
    const [matched, http, www, meat, trailingSlash,] = matches ?? [];
    // returns
    if (!matched) {
        return url;
    }
    let regex = '';
    if (http) {
        regex += '(?:https?:\\/\\/)?';
    }
    if (www) {
        regex += '(?:www\\.)?';
    }
    if (meat) {
        regex += escRegExp(meat);
    }
    if (trailingSlash) {
        regex += '\\/?';
    }
    return regex;
}
//# sourceMappingURL=escRegExpURL.js.map