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
 * Input props for the SettingsMenu component.
 * 
 * @since 0.1.0-alpha.draft
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
}