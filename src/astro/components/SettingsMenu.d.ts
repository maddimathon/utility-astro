/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import { Props as ScriptsProps } from '../support/SettingsMenu_Scripts.astro';
import { Props as StylesProps } from '../support/SettingsMenu_Styles.astro';

/**
 * Input props for the SettingsMenu component.
 * 
 * @since ___PKG_VERSION___
 */
export interface Props {

    /**
     * Email used for a focus link to report accessibility issues.
     */
    accessibilityReportEmail?: string;

    /** 
     * Value for component's `class` attribute.
     */
    class?: string | string[];

    /** 
     * Unique id attr.
     */
    id?: string;

    /**
     * A complete URL to the privacy policy page for this site.
     */
    privacyPolicy?: URL | string;

    /**
     * Whether to each settings group.
     */
    settings?: {

        /**
         * @default true
         */
        brightness?: boolean;

        /**
         * @default false
         */
        contrast?: boolean;

        /**
         * @default false
         */
        motion?: boolean;
    },

    /**
     * Whether to include the support scripts.
     * 
     * Use an object to enable scripts and pass settings.
     * 
     * @default true
     */
    scripts?: boolean | ScriptsProps;

    /**
     * Whether to include the support types.
     * 
     * Use an object to enable types and pass settings.
     * 
     * @default true
     */
    styles?: boolean | StylesProps;
}