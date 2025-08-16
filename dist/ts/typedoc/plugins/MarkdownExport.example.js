import * as UA from '../../index.js';
// import type { MarkdownApplication } from 'typedoc-plugin-markdown';
// import * as UA from '@maddimathon/utility-astro';
//#region content
/**
 * Zod schemas used to define the output of this plugin.
 */
const schemata = new UA.typedoc.Schemata();
/**
 * A class to run in the plugin.
 */
const plugin = new UA.typedoc.plugins.MarkdownExport(schemata.metadata);
/**
 * This is the function run by typeDoc for this plugin.
 */
export function load(app) {
    app.renderer.markdownHooks.on('page.begin', plugin.getMarkdownFrontmatterString);
}
//#endregion content
//# sourceMappingURL=MarkdownExport.example.js.map