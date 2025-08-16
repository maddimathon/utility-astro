/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import type { Reflection } from 'typedoc';
import type { MarkdownApplication } from 'typedoc-plugin-markdown';
type MarkdownPluginParams = Parameters<Parameters<MarkdownApplication['renderer']['markdownHooks']['on']>[1]>;
type MarkdownThemeContext = Omit<MarkdownPluginParams[0], "packagesMetaData">;
import type { Schemata } from '../00-types/index.js';
/**
 * Creates custom markdown export to work with the documentation components in
 * this package.
 *
 * @example
 * Create a file to initialize and export your plugin and include the path to
 * that file in your typeDoc plugins configurtion.
 * {@includeCode ./MarkdownExport.example.ts#content}
 * ```ts
 * import type { MarkdownApplication } from 'typedoc-plugin-markdown';
 * import * as UA from '@maddimathon/utility-astro';
 *
 * {@include ./MarkdownExport.example.ts#content}
 * ```
 *
 * @since 0.1.0-alpha.draft
 */
export declare class MarkdownExport<T_ReflectionMetadata extends typeof Schemata.Default.Metadata.REFLECTION, T_PageMetadata extends T_ReflectionMetadata & typeof Schemata.Default.Metadata.REFLECTION> {
    protected readonly schemata: {
        page: T_PageMetadata;
        reflection: T_ReflectionMetadata;
    };
    constructor(schemata: {
        page: T_PageMetadata;
        reflection: T_ReflectionMetadata;
    });
    /**
     * Creates a valid YAML string to insert at the beginning of the file.
     *
     * @since 0.1.0-alpha.draft
     */
    getMarkdownFrontmatterString(...p: MarkdownPluginParams): string;
    /**
     * Basic data for the given page.
     *
     * @since 0.1.0-alpha.draft
     */
    getPageMetadata(page: MarkdownThemeContext['page']): Schemata.Default.Metadata.Page;
    /**
     * Basic data for the given reflection.
     *
     * @since 0.1.0-alpha.draft
     */
    getReflectionMetadata(reflect: Reflection, __isRecursiveCall?: boolean): Schemata.Default.Metadata.Reflection;
}
/**
 * Support utilities for the {@link MarkdownExport} class.
 *
 * @since 0.1.0-alpha.draft
 */
export declare namespace MarkdownExport {
}
export {};
//# sourceMappingURL=MarkdownExport.d.ts.map