/**
 * @since 0.1.0-beta.0.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */
import { defineConfig, envField } from 'astro/config';
/**
 * Includes defaults and env variables for use with this library
 *
 * @since 0.1.0-beta.0.draft
 */
export function astroConfig(config, env = {}) {
    config.env = {
        ...config.env ?? {},
        schema: {
            ...config.env?.schema ?? {},
            SCRIPTS_FEATURECHECK: envField.boolean({
                access: 'public',
                context: 'client',
                default: env.include?.featureCheck ?? true,
                optional: true,
            }),
            SCRIPTS_FEATURECHECK_OUTPUTRESULTS: envField.boolean({
                access: 'public',
                context: 'client',
                default: env.featureCheck?.outputResults ?? false,
                optional: true,
            }),
            SCRIPTS_SETTINGSMENU: envField.boolean({
                access: 'public',
                context: 'client',
                default: env.include?.settingsMenu ?? true,
                optional: true,
            }),
            SCRIPTS_TOGGLE: envField.boolean({
                access: 'public',
                context: 'client',
                default: env.include?.toggle ?? true,
                optional: true,
            }),
            SCRIPTS_TOGGLE_DEBUG: envField.boolean({
                access: 'public',
                context: 'client',
                default: env.toggle?.debug ?? false,
                optional: true,
            }),
            SCRIPTS_TOGGLE_OUTPUTRESULTS: envField.boolean({
                access: 'public',
                context: 'client',
                default: env.toggle?.outputResults ?? false,
                optional: true,
            }),
        }
    };
    return defineConfig(config);
}
/**
 * Utilities for the {@link astroConfig} function.
 *
 * @since 0.1.0-beta.0.draft
 */
(function (astroConfig) {
    ;
})(astroConfig || (astroConfig = {}));
