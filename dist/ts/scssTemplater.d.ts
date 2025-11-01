/**
 * @since 0.1.0-alpha.2.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.2.draft
 * @license MIT
 */
import type { RecursivePartial } from '@maddimathon/utility-typescript/types/objects/partial';
import { type MapParser, AbstractMapParser, Template, Config as TemplaterConfig } from '@maddimathon/scss-templater';
import * as sass from "sass-embedded";
export declare namespace ScssTemplater {
    class Config extends AbstractMapParser<Config.Values, Config.Instance> implements Config.Instance {
        static build(defaultValues?: null | Config.Values, input?: RecursivePartial<Config.Values>, mergeExtendSelectorArrays?: boolean): Promise<Config>;
        static buildSassValues(defaultMap?: null | sass.SassMap, input?: null | sass.SassMap, mergeExtendSelectorArrays?: boolean): Promise<sass.SassMap>;
        static buildValues(defaultValues?: null | Config.Values, input?: RecursivePartial<Config.Values>, mergeExtendSelectorArrays?: boolean): Promise<Config.Values>;
        constructor(values: Config.Values);
    }
    namespace Config {
        interface PartialValues extends TemplaterConfig.Values {
            print: TemplaterConfig.Values['print'] & {
                astro?: boolean;
            };
        }
        interface Instance extends MapParser.Instance<Config.Values> {
        }
        interface Values extends TemplaterConfig.Values {
            print: TemplaterConfig.Values['print'] & {
                astro: boolean;
            };
        }
    }
    const template: Template<Config.Values, import("@maddimathon/scss-templater").Tokens.Values, MapParser.Class<Config.Values, MapParser.Instance<Config.Values>>, MapParser.Class<import("@maddimathon/scss-templater").Tokens.Values, MapParser.Instance<import("@maddimathon/scss-templater").Tokens.Values>>>;
    namespace DEFAULT_CONFIG {
        const tokens: {
            print: {
                tokens: true;
            };
            template: {
                name: string;
            };
        };
        const globals: {
            print: {
                globals: true;
                tokens: true;
            };
            template: {
                name: string;
            };
        };
        const html: {
            include: {
                html: true;
            };
            print: {
                normalize: true;
                utilities: true;
                globals: true;
                tokens: true;
            };
            template: {
                name: string;
            };
        };
        const astro: {
            print: {
                astro: true;
                normalize: true;
                utilities: true;
                globals: true;
                tokens: true;
            };
            template: {
                name: string;
            };
            include: {
                html: true;
            };
        };
    }
}
//# sourceMappingURL=scssTemplater.d.ts.map