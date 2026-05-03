/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { ComponentProps } from 'astro/types';
import type { ArrayItem, PartialExcept } from '@maddimathon/utility-typescript/types';

import { arrayUnique } from '@maddimathon/utility-typescript';

import type TableOfContents from '../components/TableOfContents.astro';
import type { ToggleProps } from '../components/Toggle.astro';

/**
 * @since 0.1.0-alpha.20
 */
export interface LoremIpsum_DisplaySettings {

    /**
     * @since 0.1.0-alpha.20
     */
    blockquote?: boolean;

    /**
     * @since ___PKG_VERSION___
     */
    blockquotePullQuote?: boolean;

    /**
     * @since ___PKG_VERSION___
     */
    buttons?: boolean;

    /**
     * @since 0.1.0-alpha.20
     */
    buttonTypes?: boolean;

    /**
     * Additional button variations to include. 'primary' and 'disabled' are
     * always included.
     *
     * @default ['secondary']
     * 
     * @since 0.1.0-alpha.20 — Moved to LoremIpsum_DisplaySettings and renamed.
     */
    buttonVariations?: false | string[];

    /**
     * @since 0.1.0-alpha.20
     */
    buttonVariationsAll?: boolean;

    /**
     * @since 0.1.0-alpha.20
     */
    code?: boolean;

    /**
     * @since ___PKG_VERSION___
     */
    codeLong?: boolean;

    /**
     * @since 0.1.0-alpha.20
     */
    disabledButton?: boolean;

    /**
     * @since 0.1.0-alpha.20
     */
    forms?: boolean;

    /**
     * @since 0.1.0-alpha.20
     */
    formsLong?: boolean;

    /**
     * All heading levels to demo. Always includes 1-6.
     * 
     * @since 0.1.0-alpha.20 — Moved to LoremIpsum_DisplaySettings and renamed.
     */
    headingLevels?: number[];

    /**
     * @since 0.1.0-alpha.20
     */
    headingsList?: boolean;

    /**
     * @since 0.1.0-alpha.20
     */
    listsLong?: boolean;

    /**
     * @since 0.1.0-alpha.20
     */
    listsMedium?: boolean;

    /**
     * @since 0.1.0-alpha.20
     */
    table?: boolean;

    /**
     * @since ___PKG_VERSION___
     */
    tableLong?: boolean;

    /**
     * @since 0.1.0-alpha.20
     */
    textLong?: boolean;

    /**
     * @since 0.1.0-alpha.20
     */
    textMedium?: boolean;

    /**
     * @since 0.1.0-alpha.20
     */
    textPage?: boolean;

    /**
     * Whether to include a table of contents.
     * 
     * @default false
     * 
     * @since 0.1.0-alpha.7
     */
    toc?: boolean;

    /**
     * @default true
     * 
     * @since 0.1.0-alpha.7
     */
    tocDefaultOpen?: boolean;

    /**
     * @since ___PKG_VERSION___
     */
    tocDisplayHeading?: undefined | number;

    /**
     * @since ___PKG_VERSION___
     */
    tocExtraItems?: undefined | { label: string, id: string; }[] | {
        $?: { label: string, id: string; }[];
        two?: { label: string, id: string; }[];
        three?: { label: string, id: string; }[];
        four?: { label: string, id: string; }[];
    };

    /**
     * @since ___PKG_VERSION___
     */
    tocSortByLabel?: boolean;

    /**
     * @since 0.1.0-alpha.20
     */
    toggleBlocks?: boolean;
}

export interface LoremIpsum_DisplaySettings_Parsed extends Omit<Required<LoremIpsum_DisplaySettings>, 'buttonVariations'> {
    buttonVariations: string[];
}

export type LoremIpsum_PreviewComponent<T_Props extends { [ key: string ]: any; } = {}> = ( ( props: { ifDisplay: LoremIpsum_DisplaySettings_Parsed; } & T_Props ) => any ) | 'Fragment';

/**
 * Input props for the LoremIpsum component.
 * 
 * @since 0.1.0-alpha
 * @since 0.1.0-alpha.7 — Moved to component file.
 * @since 0.1.0-alpha.20 — Moved allHeadingLevels, buttonVariations, toc, tocDefaultOpen to LoremIpsum_DisplaySettings and renamed.
 */
export interface LoremIpsumProps {

    /**
     * Whether to output an abbreviated version (e.g., when displaying multiple 
     * on a page or as placeholder content).
     * 
     * @since 0.1.0-alpha.17
     */
    abbreviated?: boolean;

    /**
     * The starting visual heading level.
     * 
     * @default null
     */
    displayHeading?: number | undefined;

    /**
     * @since 0.1.0-alpha.20
     */
    displaySettings?: LoremIpsum_DisplaySettings;

    /**
     * The starting heading level.
     * 
     * @default 2
     */
    heading?: number;

    /**
     * Determines what preset to use for the display value to include.
     */
    mode?: "minimum" | "fancy" | "library";

    /**
     * @since ___PKG_VERSION___
     */
    previewComponents?: {
        Forms?: LoremIpsum_PreviewComponent<{
            displayHeading: undefined | number;
            heading: number;
            tableOfContentsIds: ReturnType<typeof getLoremIpsumIds>;
        }>,
        Lists?: LoremIpsum_PreviewComponent,
        Table?: LoremIpsum_PreviewComponent<{
            tableOfContentsIds: ReturnType<typeof getLoremIpsumIds>;
        }>,
        Toggle?: LoremIpsum_PreviewComponent<{
            tableOfContentsIds: ReturnType<typeof getLoremIpsumIds>;
        }>,
    };

    /**
     * Whether to output a very abbreviated version (e.g., inside an alert or
     * widget).
     * 
     * @since 0.1.0-alpha.17
     */
    superAbbreviated?: boolean;

    /**
     * @since ___PKG_VERSION___
     */
    ToggleComponent?: ( props: PartialExcept<ToggleProps, 'children' | 'id'> ) => any;

    /**
     * @since ___PKG_VERSION___
     */
    toggleProps?: {};
}

export function getLoremIpsumIds(
    _props: LoremIpsumProps,
    _ifDisplay?: LoremIpsum_DisplaySettings_Parsed,
) {
    const {
        blockquote,
        buttons,
        code,
        headingsList,
        forms,
        table,
        toggleBlocks,
        tocExtraItems,
    } = _ifDisplay ?? getLoremIpsumDisplaySettings( _props );

    const tocExtraItems_full = Array.isArray( tocExtraItems )
        ? {
            $: tocExtraItems,
        }
        : tocExtraItems;

    const extraItem_filter = ( value: undefined | {
        label: string;
        id: string;
    } ) => typeof value !== 'undefined';

    const extraItem_mapper = ( value: {
        label: string;
        id: string;
    } ) => [ value.id, value ] as const;

    const slots = {
        $: Object.fromEntries( tocExtraItems_full?.$?.filter( extraItem_filter ).map( extraItem_mapper ) ?? [] ),
        two: Object.fromEntries( tocExtraItems_full?.two?.filter( extraItem_filter ).map( extraItem_mapper ) ?? [] ),
        three: Object.fromEntries( tocExtraItems_full?.three?.filter( extraItem_filter ).map( extraItem_mapper ) ?? [] ),
        four: Object.fromEntries( tocExtraItems_full?.four?.filter( extraItem_filter ).map( extraItem_mapper ) ?? [] ),
    } as const;

    // headings toggles lists buttons blockquotes form
    return {

        headings: headingsList ? { label: 'Headings', id: 'headings' } as const : undefined,

        // MAIN SLOT
        ...slots.$,

        toggles: toggleBlocks ? { label: 'Toggle Blocks', id: 'toggles' } as const : undefined,

        lists: { label: 'Lists', id: 'lists' } as const,

        // SLOT TWO
        ...slots.two,

        buttons: buttons ? { label: 'Buttons', id: 'buttons' } as const : undefined,

        // SLOT THREE
        ...slots.three,

        // SLOT FOUR
        ...slots.four,

        blockquotes: blockquote ? { label: 'Blockquotes', id: 'blockquotes' } as const : undefined,

        code: code ? { label: 'Code Blocks', id: 'code' } as const : undefined,

        table: table ? { label: 'Tables', id: 'table' } as const : undefined,

        form: forms ? { label: 'Forms', id: 'form' } as const : undefined,

    } satisfies {
        [ key: string ]: undefined | { label: string, id: string; };
    };
}

/**
 * @since ___PKG_VERSION___ — Renamed from getLoremIpsumMode() to getLoremIpsumDisplaySettings().
 */
export function getLoremIpsumDisplaySettings( _props: LoremIpsumProps ): LoremIpsum_DisplaySettings_Parsed {

    const {
        superAbbreviated = false,
        displaySettings: settings = {},
        mode,
    } = _props;

    const abbreviated = _props.abbreviated || superAbbreviated;

    let modeValues: {
        isFancy: boolean;
        isLibrary: boolean;
    };

    switch ( mode ) {

        case 'fancy':
            modeValues = {
                isFancy: true,
                isLibrary: true,
            };
            break;

        case 'library':
            modeValues = {
                isFancy: false,
                isLibrary: true,
            };
            break;

        case 'minimum':
        default:
            modeValues = {
                isFancy: false,
                isLibrary: false,
            };
            break;
    }

    const { isFancy, isLibrary } = modeValues;

    const buttonVariations = Array.isArray( settings.buttonVariations )
        ? settings.buttonVariations?.filter(
            v => v != 'primary' && v != 'disabled'
        ) ?? [ 'secondary' ]
        : [];

    const headingLevels = arrayUnique(
        [ 1, 2, 3, 4, 5, 6 ].concat(
            settings.headingLevels
                ? settings.headingLevels.map( Number ).filter( num => !Number.isNaN( num ) )
                : [ 7, 8 ]
        )
    ).map(
        ( num ) => {
            const str = num.toString();
            return str.padStart( 10, '0' );
        }
    ).sort().map( Number );

    const toc = ( settings.toc ?? false ) && !abbreviated;

    const parsed = {
        blockquote: isFancy && !abbreviated,
        blockquotePullQuote: isFancy && !abbreviated,
        buttons: true,
        buttonTypes: isFancy && !abbreviated,
        buttonVariationsAll: isLibrary && ( isFancy || !abbreviated ),
        code: isLibrary && !abbreviated,
        codeLong: isFancy && !abbreviated,
        disabledButton: isLibrary && !abbreviated,
        forms: isFancy && !abbreviated,
        formsLong: isFancy && !abbreviated,
        headingsList: isFancy && !abbreviated,
        listsMedium: isLibrary,
        listsLong: isFancy && !abbreviated,
        table: isFancy && !abbreviated,
        tableLong: isFancy && !abbreviated,
        textMedium: isLibrary && ( isFancy || !abbreviated ),
        textLong: isFancy && !abbreviated,
        textPage: !abbreviated,
        toggleBlocks: isFancy && !abbreviated,

        toc,
        tocDefaultOpen: true,
        tocDisplayHeading: -1,
        tocExtraItems: undefined,
        tocSortByLabel: false,

        ...settings,

        buttonVariations,
        headingLevels,
    } satisfies LoremIpsum_DisplaySettings_Parsed;

    parsed.formsLong = parsed.formsLong && parsed.forms;
    parsed.textLong = parsed.textLong && parsed.textMedium;

    return parsed;
}

export function getLoremIpsumToc(
    _props: LoremIpsumProps,
    _toc_ids?: ReturnType<typeof getLoremIpsumIds>,
    _display?: LoremIpsum_DisplaySettings_Parsed,
) {
    const display = _display ?? getLoremIpsumDisplaySettings( _props );

    const toc_ids = _toc_ids ?? getLoremIpsumIds( _props, display );

    const entries = Object.entries( toc_ids );

    if ( display.tocSortByLabel ) {

        entries.sort(
            ( a, b ) => {
                const sort_a = a[ 1 ]?.label.toLowerCase() ?? '';
                const sort_b = b[ 1 ]?.label.toLowerCase() ?? '';

                if ( sort_a > sort_b ) {
                    return 1;
                }

                if ( sort_a < sort_b ) {
                    return -1;
                }

                return 0;
            }
        );
    }

    return entries.filter(
        ( entry ): entry is [ typeof entry[ 0 ], Exclude<typeof entry[ 1 ], undefined> ] => typeof entry[ 1 ] !== 'undefined'
    ).map(
        ( entry ) => ( {
            label: entry[ 1 ].label,
            href: `#${ entry[ 1 ].id }`,
        } as const satisfies ArrayItem<ComponentProps<typeof TableOfContents>[ 'menu' ]> )
    ) satisfies ComponentProps<typeof TableOfContents>[ 'menu' ];
}