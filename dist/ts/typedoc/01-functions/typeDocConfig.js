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
 * A default TypeDoc config to use with the documentation plugins and components
 * in this package.
 *
 * @since 0.1.0-alpha.draft
 */
export function typeDocConfig(override) {
    return {
        categorizeByGroup: false,
        excludeExternals: true,
        projectDocuments: [],
        // router: 'member',
        // @ts-expect-error - this is a typedoc-plugin-markdown prop
        entryFileName: 'index',
        hideBreadcrumbs: true,
        hidePageHeader: true,
        hidePageTitle: true,
        // indexFormat: 'table',
        // classPropertiesFormat: 'table',
        // interfacePropertiesFormat: 'table',
        // parametersFormat: 'table',
        // typeAliasPropertiesFormat: 'table',
        // enumMembersFormat: 'table',
        // typeDeclarationFormat: 'table',
        // propertyMembersFormat: 'table',
        // tableColumnSettings: {
        //     hideDefaults: true,
        //     hideInherited: true,
        //     hideModifiers: true,
        //     hideOverrides: true,
        //     hideSources: true,
        //     hideValues: true,
        //     leftAlignHeaders: true,
        // },
        sanitizeComments: true,
        useCodeBlocks: true,
        useHTMLEncodedBrackets: true,
        ...override ?? {},
    };
}
//# sourceMappingURL=typeDocConfig.js.map