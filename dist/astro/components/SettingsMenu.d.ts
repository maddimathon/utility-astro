/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.4
 * @license MIT
 */

import { Props as ScriptsProps } from '../support/SettingsMenu_Scripts.astro';
import { Props as StylesProps } from '../support/SettingsMenu_Styles.astro';

/**
 * Input props for the SettingsMenu component.
 * 
 * @since 0.1.0-alpha
 */
export interface Props {

    /**
     * Email used for a focus link to report accessibility issues.
     */
    accessibilityReportEmail?: string;

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
        contrast?: boolean | {

            /** 
             * Whether to include the max contrast option.
             * 
             * @default false 
             */
            max?: boolean;
        };

        /**
         * @default false
         */
        motion?: boolean;

        /**
         * Custom settings options to append to the defaults.
         */
        custom?: {

            /** 
             * Unique id value for this setting -- also used to set the associated data attribute.
             */
            id: string;

            /**
             * The display name for this setting in the menu.
             */
            label: string;

            /**
             * Default value.
             */
            default: string;

            /**
             * All options, including the default.
             */
            options: {
                label: string;
                value: string;

                labelClass?: string;
            }[];
        }[];
    },

    /**
     * Whether to include the support scripts.
     * 
     * Use an object to enable scripts and pass settings.
     * 
     * @default true
     */
    scripts?: boolean | ScriptsProps;
}