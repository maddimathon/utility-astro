/**
 * @since 0.1.0-alpha.draft
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */

import type { HTMLAttributes } from 'astro/types';

import type { GenericProps } from '../../ts/index.ts';

import type { Props as NavMenuProps } from '../components/NavMenu.d.ts';
import type { Props as Page_MetaProps } from '../components/Page_Meta.d.ts';
import type { Props as SettingsMenuProps } from '../components/SettingsMenu.d.ts';
import type { Props as SkipLinksProps } from '../components/SkipLinks.d.ts';
import type { Objects } from '@maddimathon/utility-typescript/types';

/**
 * Attribute keys that are included elsewhere in the props (and not in attrs).
 * 
 * @since 0.1.0-alpha.draft
 */
type HTML_excludeAttributes = "dir" | "lang";

/**
 * Input props for the NewComponent component.
 * 
 * @since 0.1.0-alpha.draft
 * 
 * @interface
 */
export type Props = GenericProps<{

    /**
     * Page title.
     */
    title: string | string[];

    /**
     * Page metadata used in <head>.
     */
    meta: Page_MetaProps;

    // } & {
    dir?: "ltr" | "rtl" | "auto";
    lang: string;
    // } & {
    //     [ K in Exclude<HTML_excludeAttributes, "dir" | "lang"> ]: HTMLAttributes<"html">[ K ];
    // } & {

    /**
     * Email used for focus links to report accessibility issues.
     */
    accessibilityReportEmail?: string;

    /**
     * Attributes for elements on the page.
     */
    attrs?: {
        html?: Omit<HTMLAttributes<"html">, HTML_excludeAttributes>,
        body?: HTMLAttributes<"body">,
    };

    /**
     * The content to include in the page footer, if any.
     *
     * An empty object can also be passed to enable the wrapper and slot without
     * any default content.  If the slot is not passed or empty, the footer
     * wrapper does not appear.
     */
    footer?: {

        /**
         * Content for the copyright section of the footer.
         * 
         * An empty object can also be passed to enable the default output.
         */
        copyright?: {

            /**
             * Escaped HTML to include after the copyright symbol.
             */
            html: string;

            /**
             * If undefined, this defaults to the current year. If it is greater
             * than the current year, this is displayed as a range.
             * 
             * *Text to be escaped, NOT html.*
             */
            year?: number;

            owner?: never;

        } | {

            /**
             * Text to follow the copyright symbol and date.
             * 
             * *Text to be escaped, NOT html.*
             */
            owner?: string;

            /**
             * If undefined, this defaults to the current year. If it is greater
             * than the current year, this is displayed as a range.
             * 
             * *Text to be escaped, NOT html.*
             */
            year?: number;

            html?: never;
        };

        /**
         * Escaped HTML to include.
         */
        designedBy?: string;
    };

    /**
     * The content to include in the page header, if any.
     *
     * An empty object can also be passed to enable the wrapper and slot without
     * any default content.  If the slot is not passed or empty, the header
     * wrapper does not appear.
     */
    header?: {

        /**
         * Text to be escaped, NOT html.
         */
        tagline?: string;

        /**
         * Text to be escaped, NOT html.
         */
        title?: string;
    };

    /**
     * Params for the primary (header) menu.
     */
    primaryMenu?: NavMenuProps[ 'menu' ] | Objects.PartialExcept<NavMenuProps, "menu">;

    /**
     * A complete URL to the privacy policy page for this site.
     */
    privacyPolicy?: URL | string;

    /**
     * Params for the secondary (footer) menu.
     */
    secondaryMenu?: NavMenuProps[ 'menu' ] | Objects.PartialExcept<NavMenuProps, "menu">;

    /**
     * Whether to inlcude each settings group.
     */
    settings?: Required<SettingsMenuProps>[ 'settings' ],

    /**
     * Skip links for this page.
     */
    skipLinks?: SkipLinksProps[ 'links' ];

    /**
     * Varies features to turn on or off.
     */
    support?: {

        /**
         * @default true
         */
        elementToggle?: boolean;

        /**
         * @default true
         */
        featureCheck?: boolean;

        /**
         * @default true
         */
        settings?: boolean;
    };
}>;