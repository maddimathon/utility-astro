/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { Stage } from '@maddimathon/build-utilities';

/**
 * A default TypeDoc config to use with the documentation plugins and components
 * in this package.
 *
 * @since ___PKG_VERSION___
 */
export function typeDocConfig<
    T_Override extends Partial<Stage.Args.Document[ 'typeDoc' ]>,
>(
    override?: T_Override,
) {

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

    } as const satisfies Stage.Args.Document[ 'typeDoc' ];
}