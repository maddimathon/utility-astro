/**
 * @since 0.1.0-alpha.2.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.2.draft
 * @license MIT
 */
import { AbstractMapParser, jsValueToSass, mapToObjectRecursive, sassValueToJS, Template, Config as TemplaterConfig, } from '@maddimathon/scss-templater';
import * as sass from "sass-embedded";
export var ScssTemplater;
(function (ScssTemplater) {
    class Config extends AbstractMapParser {
        static async build(defaultValues, input, mergeExtendSelectorArrays) {
            return Config.buildValues(defaultValues, input, mergeExtendSelectorArrays).then(parsed => new Config(parsed));
        }
        static async buildSassValues(defaultMap, input, mergeExtendSelectorArrays) {
            return Promise.all([
                defaultMap
                    ? sassValueToJS(defaultMap).then(mapToObjectRecursive)
                    : undefined,
                input
                    ? sassValueToJS(input).then(mapToObjectRecursive)
                    : undefined,
            ]).then(([_default, _input,]) => Config.buildValues(_default, _input, mergeExtendSelectorArrays).then(async (parsed) => jsValueToSass(parsed)));
        }
        static async buildValues(defaultValues, input, mergeExtendSelectorArrays) {
            return TemplaterConfig.buildValues(defaultValues, input, mergeExtendSelectorArrays).then(parsed => ({
                ...parsed,
                print: {
                    ...parsed.print,
                    astro: input?.print?.astro ?? false,
                },
            }));
        }
        constructor(values) {
            super(values);
        }
    }
    ScssTemplater.Config = Config;
    (function (Config) {
        ;
    })(Config = ScssTemplater.Config || (ScssTemplater.Config = {}));
    ScssTemplater.template = new Template({ config: Config });
    let DEFAULT_CONFIG;
    (function (DEFAULT_CONFIG) {
        DEFAULT_CONFIG.tokens = {
            print: {
                tokens: true,
            },
            template: {
                name: 'Tokens',
            },
        };
        DEFAULT_CONFIG.globals = {
            ...DEFAULT_CONFIG.tokens,
            print: {
                ...DEFAULT_CONFIG.tokens.print,
                globals: true,
            },
            template: {
                ...DEFAULT_CONFIG.tokens.template,
                name: 'Globals',
            },
        };
        DEFAULT_CONFIG.html = {
            ...DEFAULT_CONFIG.globals,
            include: {
                // ...globals.include,
                html: true,
            },
            print: {
                ...DEFAULT_CONFIG.globals.print,
                normalize: true,
                utilities: true,
            },
            template: {
                ...DEFAULT_CONFIG.tokens.template,
                name: 'HTML',
            },
        };
        DEFAULT_CONFIG.astro = {
            ...DEFAULT_CONFIG.html,
            print: {
                ...DEFAULT_CONFIG.html.print,
                astro: true,
            },
            template: {
                ...DEFAULT_CONFIG.tokens.template,
                name: 'Astro',
            },
        };
    })(DEFAULT_CONFIG = ScssTemplater.DEFAULT_CONFIG || (ScssTemplater.DEFAULT_CONFIG = {}));
})(ScssTemplater || (ScssTemplater = {}));
//# sourceMappingURL=scssTemplater.js.map