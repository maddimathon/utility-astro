/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import type { Stage } from '@maddimathon/build-utilities';
/**
 * A default TypeDoc config to use with the documentation plugins and components
 * in this package.
 *
 * @since 0.1.0-alpha.draft
 */
export declare function typeDocConfig<T_Override extends Partial<Stage.Args.Document['typeDoc']>>(override?: T_Override): {
    readonly sort?: ("kind" | "source-order" | "alphabetical" | "alphabetical-ignoring-documents" | "enum-value-ascending" | "enum-value-descending" | "enum-member-source-order" | "static-first" | "instance-first" | "visibility" | "required-first" | "external-last" | "documents-first" | "documents-last")[] | undefined;
    readonly html?: string | undefined;
    readonly options?: string | undefined;
    readonly validation?: boolean | Partial<import("typedoc").ValidationOptions> | undefined;
    readonly name?: string | undefined;
    readonly blockTags?: `@${string}`[] | undefined;
    readonly modifierTags?: `@${string}`[] | undefined;
    readonly headings?: boolean | Partial<{
        readme: boolean;
        document: boolean;
    }> | undefined;
    readonly tsconfig?: string | undefined;
    readonly compilerOptions?: unknown;
    readonly plugin?: string[] | undefined;
    readonly lang?: string | undefined;
    readonly locales?: Record<string, Record<string, string>> | undefined;
    readonly packageOptions?: import("node_modules/typedoc/dist/lib/utils/options/declaration.js").TypeDocPackageOptions | undefined;
    readonly entryPointStrategy?: "Resolve" | "Expand" | "Packages" | "Merge" | "resolve" | "expand" | "packages" | "merge" | undefined;
    readonly alwaysCreateEntryPointModule?: boolean | undefined;
    projectDocuments: string[];
    readonly exclude?: string[] | undefined;
    readonly externalPattern?: string[] | undefined;
    excludeExternals: boolean;
    readonly excludeNotDocumented?: boolean | undefined;
    readonly excludeNotDocumentedKinds?: import("typedoc").ReflectionKind.KindString[] | undefined;
    readonly excludeInternal?: boolean | undefined;
    readonly excludePrivate?: boolean | undefined;
    readonly excludeProtected?: boolean | undefined;
    readonly excludeReferences?: boolean | undefined;
    readonly excludeCategories?: string[] | undefined;
    readonly maxTypeConversionDepth?: number | undefined;
    readonly includeVersion?: boolean | undefined;
    readonly disableSources?: boolean | undefined;
    readonly sourceLinkTemplate?: string | undefined;
    readonly sourceLinkExternal?: boolean | undefined;
    readonly markdownLinkExternal?: boolean | undefined;
    readonly disableGit?: boolean | undefined;
    readonly gitRevision?: string | undefined;
    readonly gitRemote?: string | undefined;
    readonly readme?: string | undefined;
    readonly outputs?: import("typedoc").OutputSpecification[] | undefined;
    readonly out?: string | undefined;
    readonly json?: string | undefined;
    readonly pretty?: boolean | undefined;
    readonly emit?: "both" | "docs" | "none" | undefined;
    readonly theme?: string | undefined;
    readonly router?: string | undefined;
    readonly lightHighlightTheme?: import("@gerrit0/mini-shiki").BundledTheme | undefined;
    readonly darkHighlightTheme?: import("@gerrit0/mini-shiki").BundledTheme | undefined;
    readonly highlightLanguages?: string[] | undefined;
    readonly ignoredHighlightLanguages?: string[] | undefined;
    readonly typePrintWidth?: number | undefined;
    readonly customCss?: string | undefined;
    readonly customJs?: string | undefined;
    readonly markdownItOptions?: Record<string, unknown> | undefined;
    readonly markdownItLoader?: ((parser: any) => void) | undefined;
    readonly basePath?: string | undefined;
    readonly cname?: string | undefined;
    readonly favicon?: string | undefined;
    readonly githubPages?: boolean | undefined;
    readonly hostedBaseUrl?: string | undefined;
    readonly useHostedBaseUrlForAbsoluteLinks?: boolean | undefined;
    readonly cacheBust?: boolean | undefined;
    readonly hideGenerator?: boolean | undefined;
    readonly customFooterHtml?: string | undefined;
    readonly customFooterHtmlDisableWrapper?: boolean | undefined;
    readonly searchInComments?: boolean | undefined;
    readonly searchInDocuments?: boolean | undefined;
    readonly cleanOutputDir?: boolean | undefined;
    readonly titleLink?: string | undefined;
    readonly navigationLinks?: Record<string, string> | undefined;
    readonly sidebarLinks?: Record<string, string> | undefined;
    readonly navigationLeaves?: string[] | undefined;
    readonly navigation?: boolean | Partial<{
        includeCategories: boolean;
        includeGroups: boolean;
        includeFolders: boolean;
        compactFolders: boolean;
        excludeReferences: boolean;
    }> | undefined;
    readonly sluggerConfiguration?: boolean | Partial<{
        lowercase: boolean;
    }> | undefined;
    readonly includeHierarchySummary?: boolean | undefined;
    readonly visibilityFilters?: {
        [tag: `@${string}`]: boolean;
        protected?: boolean;
        private?: boolean;
        inherited?: boolean;
        external?: boolean;
    } | undefined;
    readonly searchCategoryBoosts?: Record<string, number> | undefined;
    readonly searchGroupBoosts?: Record<string, number> | undefined;
    readonly useFirstParagraphOfCommentAsSummary?: boolean | undefined;
    readonly commentStyle?: "line" | "All" | "JSDoc" | "Block" | "Line" | "jsdoc" | "all" | "block" | undefined;
    readonly useTsLinkResolution?: boolean | undefined;
    readonly preserveLinkText?: boolean | undefined;
    readonly jsDocCompatibility?: boolean | Partial<import("typedoc").JsDocCompatibility> | undefined;
    readonly suppressCommentWarningsInDeclarationFiles?: boolean | undefined;
    readonly inlineTags?: `@${string}`[] | undefined;
    readonly excludeTags?: `@${string}`[] | undefined;
    readonly notRenderedTags?: `@${string}`[] | undefined;
    readonly externalSymbolLinkMappings?: Record<string, Record<string, string>> | undefined;
    readonly cascadedModifierTags?: `@${string}`[] | undefined;
    categorizeByGroup: boolean;
    readonly groupReferencesByType?: boolean | undefined;
    readonly defaultCategory?: string | undefined;
    readonly categoryOrder?: string[] | undefined;
    readonly groupOrder?: string[] | undefined;
    readonly sortEntryPoints?: boolean | undefined;
    readonly kindSortOrder?: import("typedoc").ReflectionKind.KindString[] | undefined;
    readonly treatWarningsAsErrors?: boolean | undefined;
    readonly treatValidationWarningsAsErrors?: boolean | undefined;
    readonly intentionallyNotExported?: string[] | undefined;
    readonly requiredToBeDocumented?: import("typedoc").ReflectionKind.KindString[] | undefined;
    readonly packagesRequiringDocumentation?: string[] | undefined;
    readonly intentionallyNotDocumented?: string[] | undefined;
    readonly watch?: boolean | undefined;
    readonly preserveWatchOutput?: boolean | undefined;
    readonly help?: boolean | undefined;
    readonly version?: boolean | undefined;
    readonly showConfig?: boolean | undefined;
    readonly logLevel?: import("typedoc").LogLevel | "Verbose" | "Info" | "Warn" | "Error" | "None" | undefined;
    readonly skipErrorChecking?: boolean | undefined;
    readonly entryFileName: "index";
    readonly hideBreadcrumbs: true;
    readonly hidePageHeader: true;
    readonly hidePageTitle: true;
    readonly sanitizeComments: true;
    readonly useCodeBlocks: true;
    readonly useHTMLEncodedBrackets: true;
};
//# sourceMappingURL=typeDocConfig.d.ts.map