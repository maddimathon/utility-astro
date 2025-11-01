/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { RecursivePartial } from '@maddimathon/utility-typescript/types/objects/partial';

import {
    type MapParser,
    AbstractMapParser,
    jsValueToSass,
    mapToObjectRecursive,
    sassValueToJS,
    Template,
    Config as TemplaterConfig,
} from '@maddimathon/scss-templater';

import type { RecursiveRecord } from '@maddimathon/scss-templater/types/utils';

import * as sass from "sass-embedded";

export namespace ScssTemplater {

    export class Config extends AbstractMapParser<
        Config.Values,
        Config.Instance
    > implements Config.Instance {

        public static async build(
            defaultValues?: null | Config.Values,
            input?: RecursivePartial<Config.Values>,
            mergeExtendSelectorArrays?: boolean,
        ): Promise<Config> {

            return Config.buildValues(
                defaultValues,
                input,
                mergeExtendSelectorArrays,
            ).then(
                parsed => new Config( parsed )
            );
        }

        public static async buildSassValues(
            defaultMap?: null | sass.SassMap,
            input?: null | sass.SassMap,
            mergeExtendSelectorArrays?: boolean,
        ): Promise<sass.SassMap> {

            return Promise.all( [

                defaultMap
                    ? sassValueToJS( defaultMap ).then( mapToObjectRecursive )
                    : undefined,

                input
                    ? sassValueToJS( input ).then( mapToObjectRecursive )
                    : undefined,
            ] ).then(

                ( [
                    _default,
                    _input,
                ] ) => Config.buildValues(
                    _default as undefined | Config.Values,
                    _input,
                    mergeExtendSelectorArrays,
                ).then(
                    async ( parsed ) => jsValueToSass(
                        parsed as unknown as RecursiveRecord<
                            number | string,
                            jsValueToSass.SimpleAcceptedValues
                        >
                    )
                )

            );
        }

        public static async buildValues(
            defaultValues?: null | Config.Values,
            input?: RecursivePartial<Config.Values>,
            mergeExtendSelectorArrays?: boolean,
        ): Promise<Config.Values> {

            return TemplaterConfig.buildValues(
                defaultValues,
                input,
                mergeExtendSelectorArrays,
            ).then(
                parsed => ( {
                    ...parsed,

                    print: {
                        ...parsed.print,
                        astro: input?.print?.astro ?? false,
                    },
                } )
            );
        }

        public constructor ( values: Config.Values ) {
            super( values );
        }
    }

    export namespace Config {

        export interface PartialValues extends TemplaterConfig.Values {

            print: TemplaterConfig.Values[ 'print' ] & {
                astro?: boolean;
            };
        }

        export interface Instance extends MapParser.Instance<Config.Values> {
        };

        export interface Values extends TemplaterConfig.Values {

            print: TemplaterConfig.Values[ 'print' ] & {
                astro: boolean;
            };
        }
    }

    export const template = new Template<Config.Values>( { config: Config } );

    export namespace DEFAULT_CONFIG {

        export const tokens = {
            print: {
                tokens: true,
            },

            template: {
                name: 'Tokens',
            },
        } satisfies RecursivePartial<Config.Values>;

        export const globals = {
            ...tokens,

            print: {
                ...tokens.print,
                globals: true,
            },

            template: {
                ...tokens.template,
                name: 'Globals',
            },
        } satisfies RecursivePartial<Config.Values>;

        export const html = {
            ...globals,

            include: {
                // ...globals.include,
                html: true,
            },

            print: {
                ...globals.print,
                normalize: true,
                utilities: true,
            },

            template: {
                ...tokens.template,
                name: 'HTML',
            },
        } satisfies RecursivePartial<Config.Values>;

        export const astro = {
            ...html,

            print: {
                ...html.print,
                astro: true,
            },

            template: {
                ...tokens.template,
                name: 'Astro',
            },
        } satisfies RecursivePartial<Config.Values>;
    }
}