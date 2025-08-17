import type { MarkdownApplication } from 'typedoc-plugin-markdown';
import * as UA from '../../index.js';

// import type { MarkdownApplication } from 'typedoc-plugin-markdown';
// import * as UA from '@maddimathon/utility-astro';

//#region content
/**
 * A class to run in the plugin.
 */
const plugin = new UA.typedoc.plugins.MarkdownExport( {
    page: UA.typedoc.Schemata.Page(),
    reflection: UA.typedoc.Schemata.Reflection(),
} );

/**
 * This is the function run by typeDoc for this plugin.
 */
export function load( app: MarkdownApplication ) {
    app.renderer.markdownHooks.on( 'page.begin', plugin.getMarkdownFrontmatterString );
}
//#endregion content
