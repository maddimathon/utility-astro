/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.21
 * @license MIT
 */

import type { HTMLAttributes } from 'astro/types';

import type {
    Objects,
} from '@maddimathon/utility-typescript/types';

import type { NavMenuProps } from '../components/NavMenu.astro';
import type { Page_MetaProps } from '../components/Page_Meta.astro';
import type { SettingsMenuProps } from '../components/SettingsMenu.astro';
import type { SkipLinksProps } from '../components/SkipLinks.astro';

import type {
    Props as ContentProps,
    ContentType,
} from './Content.astro';

/**
 * Attribute keys that are included elsewhere in the props (and not in attrs).
 * 
 * @since 0.1.0-alpha
 */
type HTML_excludeAttributes = "dir" | "lang";

type Copyright_HTML = {
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
};

type Copyright_PlainOwner = {
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
};

type Copyright_PlainYear = {
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
 * Input props for the NewComponent component.
 * 
 * @since 0.1.0-alpha
 * @since 0.1.0-alpha.17 — Moved to component file.
 * 
 * @interface
 */
export interface PageProps<T_ContentType extends ContentType = ContentType> {

    /**
     * Page title. Used for metadata default and passed to the Content component.
     */
    title: string | string[];

    /**
     * Page metadata used in <head>.
     */
    meta: Page_MetaProps;

    dir?: "ltr" | "rtl" | "auto";
    lang: string;

    /**
     * Email used for focus links to report accessibility issues.
     */
    accessibilityReportEmail?: string;

    /**
     * Attributes for elements on the page.
     */
    attrs?: {
        html?: Omit<HTMLAttributes<"html">, HTML_excludeAttributes>;
        body?: HTMLAttributes<"body">;
    };

    /**
     * Configuration for the child Content component.
     */
    content?: Omit<ContentProps<T_ContentType>, "subtitle" | "title" | "type">;

    /**
     * Used for NavMenu, ToggleNavMenu, and TableOfContents components.
     */
    convertHrefStringsToAbsolute?: boolean | null;

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
        copyright?: false | Copyright_HTML | Copyright_PlainOwner | Copyright_PlainYear;

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
    primaryMenu?: NavMenuProps[ 'menu' ] | Objects.PartialExcept<NavMenuProps, "convertHrefStringsToAbsolute" | "menu">;

    /**
     * A complete URL to the privacy policy page for this site.
     */
    privacyPolicy?: URL | string;

    /**
     * Params for the secondary (footer) menu.
     */
    secondaryMenu?: NavMenuProps[ 'menu' ] | Objects.PartialExcept<NavMenuProps, "convertHrefStringsToAbsolute" | "menu">;

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
     * Page subtitle. Passed to the Content component.
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
};