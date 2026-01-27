/**
 * @since 0.1.0-alpha.7
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.13
 * @license MIT
 */
import { escapeHTML } from 'astro/runtime/server/escape.js';
/**
 * Takes an object of html attributes and returns them as a single string.
 * Escapes values but not keys.
 *
 * @since 0.1.0-alpha.7
 *
 * @experimental
 */
export function htmlAttributeString(attrs) {
    const strings = [];
    for (const [key, value] of Object.entries(attrs)) {
        // continues on match
        switch (typeof value) {
            case 'boolean':
            case 'object':
                if (value) {
                    strings.push(`${key}="true"`);
                }
                continue;
            case 'number':
                strings.push(`${key}="${value.toString()}"`);
                continue;
            case 'string':
                strings.push(`${key}="${escapeHTML(value).replace(/"/g, "'")}"`);
                continue;
            case 'undefined':
                continue;
            default:
                value;
                break;
        }
    }
    // returns
    if (!strings.length) {
        return '';
    }
    return ' ' + strings.join(' ');
}
//# sourceMappingURL=htmlAttributeString.js.map