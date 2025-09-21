/**
 * @since 0.1.0-alpha.draft
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */

import type { Objects } from '@maddimathon/utility-typescript/types';

import type { HTMLAttributes } from 'astro/types';

import type { GenericProps } from '../../ts/index.ts';

import type { Props as NavMenuProps } from '../components/NavMenu.d.ts';
import type { Props as Page_MetaProps } from '../components/Page_Meta.d.ts';
import type { Props as SettingsMenuProps } from '../components/SettingsMenu.d.ts';
import type { Props as SkipLinksProps } from '../components/SkipLinks.d.ts';

import type { Props as ContentProps, ContentType, DefaultContentType } from './Content.d.ts';

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
export type Props<
    T_ContentType extends ContentType = ContentType,
> = GenericProps<{

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
     * Configuration for the child Content component.
     */
    content?: Omit<ContentProps<T_ContentType>, "type" | "subtitle">;

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
        copyright?: false | {

            /**
             * Escaped HTML to include after the copyright symbol.
             */
            html: string;

            owner?: undefined;

            /**
             * If undefined, this defaults to the current year. If it is greater
             * than the current year, this is displayed as a range.
             * 
             * *Text to be escaped, NOT html.*
             */
            year?: number;
        } | {

            html?: undefined;

            /**
             * Text to follow the copyright symbol and date.
             * 
             * *Text to be escaped, NOT html.*
             */
            owner: string;

            /**
             * If undefined, this defaults to the current year. If it is greater
             * than the current year, this is displayed as a range.
             * 
             * *Text to be escaped, NOT html.*
             */
            year?: number;
        } | {

            html?: undefined;

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
            year: number;
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
     * Content layout type.
     */
    layout?: T_ContentType;

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
     * Whether to inlcude the settings menu. Optionally this can be an object of
     * props to pass to the component.
     * 
     * @default true
     */
    settings?: boolean | Omit<SettingsMenuProps, "accessibilityReportEmail" | "privacyPolicy">,

    /**
     * Skip links for this page.
     */
    skipLinks?: SkipLinksProps[ 'links' ];

    /**
     * Page subtitle.
     */
    subtitle?: string | null;

    /**
     * Whether to include scripts scripts for these components
     */
    scripts?: {

        /**
         * Initializes the class from utility-sass.
         * 
         * @default true
         */
        featureCheck?: boolean;

        /**
         * Includes the SettingsMenu_Scripts component.
         * 
         * @default true
         */
        settingsMenu?: boolean;

        /**
         * Includes the Toggle_Scripts component.
         * 
         * @default true
         */
        toggle?: boolean;
    };
}>;