/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { RecursivePartial } from '@maddimathon/utility-typescript/types';

import type {
    AstroUserConfig,
    FontProvider,
    Locales,
} from 'astro';

import { defineConfig, envField } from 'astro/config';


/**
 * Includes defaults and env variables for use with this library
 * 
 * @since ___PKG_VERSION___
 */
export function astroConfig<
    T_Locales extends Locales = never,
    T_Driver extends string = never,
    T_FontProviders extends Array<FontProvider> = never
>(
    config: AstroUserConfig<T_Locales, T_Driver, T_FontProviders>,
    env: RecursivePartial<astroConfig.EnvironmentConfig> = {},
): AstroUserConfig<T_Locales, T_Driver, T_FontProviders> {

    config.env = {
        ...config.env ?? {},

        schema: {
            ...config.env?.schema ?? {},

            MAIN_AS_ARTICLE: envField.boolean( {
                access: 'public',
                context: 'client',
                default: env.main?.asArticle ?? true,
                optional: true,
            } ),

            PRINT_SLOT_COMMENTS: envField.boolean( {
                access: 'public',
                context: 'client',
                default: env.print?.slotComments ?? import.meta.env.DEV,
                optional: true,
            } ),

            SCRIPTS_FEATURECHECK: envField.boolean( {
                access: 'public',
                context: 'client',
                default: env.include?.featureCheck ?? true,
                optional: true,
            } ),

            SCRIPTS_FEATURECHECK_OUTPUTRESULTS: envField.boolean( {
                access: 'public',
                context: 'client',
                default: env.featureCheck?.outputResults ?? false,
                optional: true,
            } ),

            SCRIPTS_SETTINGSMENU: envField.boolean( {
                access: 'public',
                context: 'client',
                default: env.include?.settingsMenu ?? true,
                optional: true,
            } ),

            SCRIPTS_TOGGLE: envField.boolean( {
                access: 'public',
                context: 'client',
                default: env.include?.toggle ?? true,
                optional: true,
            } ),

            SCRIPTS_TOGGLE_DEBUG: envField.boolean( {
                access: 'public',
                context: 'client',
                default: env.toggle?.debug ?? false,
                optional: true,
            } ),

            SCRIPTS_TOGGLE_OUTPUTRESULTS: envField.boolean( {
                access: 'public',
                context: 'client',
                default: env.toggle?.outputResults ?? false,
                optional: true,
            } ),
        }
    };

    return defineConfig( config );
}

/**
 * Utilities for the {@link astroConfig} function.
 * 
 * @since ___PKG_VERSION___
 */
export namespace astroConfig {

    /**
     * An easy input object for configuring environment variable default values.
     */
    export interface EnvironmentConfig {

        featureCheck: {
            /** @default false */
            outputResults: boolean;
        };

        /**
         * @since ___PKG_VERSION___
         */
        main: {
            /** @default true */
            asArticle: boolean;
        };

        /**
         * @since ___PKG_VERSION___
         */
        print: {
            /** @default import.meta.env.DEV */
            slotComments: boolean;
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
    };
}