/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import { mergeArgs } from '@maddimathon/utility-typescript/functions';
import { templates as libTemplates, ScssTemplate, zod4, } from '@maddimathon/scss-templater';
// #region DEFAULT
const default_schema = libTemplates.base.config.schema.extend({});
function default_parser(output) {
    const def = mergeArgs({
        ...libTemplates.base.config.parser(output),
    }, {}, true);
    return mergeArgs(def, output, true);
}
// #endregion DEFAULT
// #region GLOBAL
const global_schema = default_schema.extend({});
function global_parser(output) {
    const def = mergeArgs({
        ...default_parser(output),
    }, {}, true);
    return mergeArgs(def, output, true);
}
// #endregion GLOBAL
// #region HTML
const html_schema = global_schema.extend({});
function html_parser(output) {
    const def = mergeArgs({
        ...global_parser(output),
    }, {}, true);
    return mergeArgs(def, output, true);
}
// #endregion HTML
// #region ASTRO
const astro_schema = html_schema.extend({});
function astro_parser(output) {
    const def = mergeArgs({
        ...html_parser(output),
    }, {}, true);
    return mergeArgs(def, output, true);
}
// #endregion ASTRO
export const templates = {
    default: new ScssTemplate('default', new ScssTemplate.Config(default_schema, default_parser, {})),
    global: new ScssTemplate('global', new ScssTemplate.Config(global_schema, global_parser, {})),
    html: new ScssTemplate('html', new ScssTemplate.Config(html_schema, html_parser, {})),
    astro: new ScssTemplate('astro', new ScssTemplate.Config(astro_schema, astro_parser, {})),
};
//# sourceMappingURL=scssTemplates.js.map