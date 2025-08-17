/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import { escapeHTML } from 'astro/runtime/server/escape.js';
import { slugify } from '@maddimathon/utility-typescript/functions';
export function kindIconHTML(name) {
    let abbr;
    let type = 'page';
    switch (name) {
        case 'Project':
            abbr = '*';
            break;
        case 'Accessor':
            abbr = 'A';
            type = 'page-section';
            break;
        case 'Class':
            abbr = 'C';
            break;
        case 'Constructor':
            abbr = 'C';
            type = 'page-section';
            break;
        case 'Document':
            abbr = 'D';
            break;
        case 'Enum':
            abbr = 'E';
            break;
        case 'Function':
            abbr = 'F';
            break;
        case 'Interface':
            abbr = 'I';
            break;
        case 'Method':
            abbr = 'M';
            type = 'page-section';
            break;
        case 'Module':
            abbr = 'M';
            break;
        case 'Namespace':
            abbr = 'N';
            break;
        case 'Property':
            abbr = 'P';
            type = 'page-section';
            break;
        case 'Reference':
            abbr = 'R';
            break;
        case 'Type':
            abbr = 'T';
            break;
        case 'Variable':
            abbr = 'V';
            break;
        default:
            name;
            break;
    }
    // returns
    if (!name) {
        return '';
    }
    // returns
    if (abbr) {
        return `<abbr
            class="${[
            'reflection-kind-icon',
            `reflection-kind-icon--${type} `,
            `reflection-kind-icon--${slugify(name)} `,
        ].join(' ')}"
            title="${name}"
        >${escapeHTML(abbr)}</abbr>`;
    }
    return `<span
        class="${[
        'reflection-kind-prefix',
        `reflection-kind-prefix--${type} `,
        `reflection-kind-prefix--${slugify(name)} `,
    ].join(' ')}"
    >${escapeHTML(`${name}: `)}</span>`;
}
//# sourceMappingURL=kindIconHTML.js.map