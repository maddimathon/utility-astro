/**
 * @since 0.1.0-beta.0.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */
import type { RecursivePartial } from '@maddimathon/utility-typescript/types';
import type { AstroUserConfig, FontProvider, Locales, SessionDriverName } from 'astro';
/**
 * Includes defaults and env variables for use with this library
 *
 * @since 0.1.0-beta.0.draft
 */
export declare function astroConfig<T_Locales extends Locales = never, T_Driver extends SessionDriverName = never, T_FontProviders extends Array<FontProvider> = never>(config: AstroUserConfig<T_Locales, T_Driver, T_FontProviders>, env?: RecursivePartial<astroConfig.EnvironmentConfig>): AstroUserConfig<T_Locales, T_Driver, T_FontProviders>;
/**
 * Utilities for the {@link astroConfig} function.
 *
 * @since 0.1.0-beta.0.draft
 */
export declare namespace astroConfig {
    /**
     * An easy input object for configuring environment variable default values.
     */
    interface EnvironmentConfig {
        featureCheck: {
            /** @default false */
            outputResults: boolean;
        };
        /**
         * @since 0.1.0-beta.0.draft
         */
        styles: {
            /** @default true */
            icon: boolean;
        };
        toggle: {
            /** @default false */
            debug: boolean;
            /** @default false */
            outputResults: boolean;
        };
        /**
         * Whether to include init scripts,
         */
        include: {
            /**
             * Whether the {@link FeatureCheck} script should be initialized in
             * the Page layout.
             *
             * @default true
             */
            featureCheck: boolean;
            /**
             * Default value for the {@link astro.SettingsMenu} component itself
             * to include settings menu script.
             *
             * @default true
             */
            settingsMenu: boolean;
            /**
             * Default value for the {@link astro.Toggle} component itself to
             * include toggle script.
             *
             * @default true
             */
            toggle: boolean;
        };
    }
}
