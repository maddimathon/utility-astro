/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import { type Base_ParsedResult, ScssTemplate, zod4 } from '@maddimathon/scss-templater';
interface Parsed extends Base_ParsedResult {
}
export declare const templates: {
    default: ScssTemplate<"default", ScssTemplate.Config<zod4.ZodObject<{
        include: zod4.ZodOptional<zod4.ZodObject<{
            featureCheck: zod4.ZodOptional<zod4.ZodBoolean>;
            html: zod4.ZodOptional<zod4.ZodBoolean>;
            noPreferenceMediaQueries: zod4.ZodOptional<zod4.ZodBoolean>;
        }, zod4.z.core.$loose>>;
        print: zod4.ZodOptional<zod4.ZodObject<{
            globals: zod4.ZodOptional<zod4.ZodBoolean>;
            normalize: zod4.ZodOptional<zod4.ZodBoolean>;
            template: zod4.ZodOptional<zod4.ZodObject<{
                docBlock: zod4.ZodOptional<zod4.ZodBoolean>;
            }, zod4.z.core.$loose>>;
        }, zod4.z.core.$loose>>;
        template: zod4.ZodOptional<zod4.ZodObject<{
            name: zod4.ZodOptional<zod4.ZodString>;
            isDefault: zod4.ZodOptional<zod4.ZodBoolean>;
            isTemplate: zod4.ZodOptional<zod4.ZodBoolean>;
        }, zod4.z.core.$loose>>;
    }, zod4.z.core.$loose>, Parsed>>;
    global: ScssTemplate<"global", ScssTemplate.Config<zod4.ZodObject<{
        include: zod4.ZodOptional<zod4.ZodObject<{
            featureCheck: zod4.ZodOptional<zod4.ZodBoolean>;
            html: zod4.ZodOptional<zod4.ZodBoolean>;
            noPreferenceMediaQueries: zod4.ZodOptional<zod4.ZodBoolean>;
        }, zod4.z.core.$loose>>;
        print: zod4.ZodOptional<zod4.ZodObject<{
            globals: zod4.ZodOptional<zod4.ZodBoolean>;
            normalize: zod4.ZodOptional<zod4.ZodBoolean>;
            template: zod4.ZodOptional<zod4.ZodObject<{
                docBlock: zod4.ZodOptional<zod4.ZodBoolean>;
            }, zod4.z.core.$loose>>;
        }, zod4.z.core.$loose>>;
        template: zod4.ZodOptional<zod4.ZodObject<{
            name: zod4.ZodOptional<zod4.ZodString>;
            isDefault: zod4.ZodOptional<zod4.ZodBoolean>;
            isTemplate: zod4.ZodOptional<zod4.ZodBoolean>;
        }, zod4.z.core.$loose>>;
    }, zod4.z.core.$loose>, Parsed>>;
    html: ScssTemplate<"html", ScssTemplate.Config<zod4.ZodObject<{
        include: zod4.ZodOptional<zod4.ZodObject<{
            featureCheck: zod4.ZodOptional<zod4.ZodBoolean>;
            html: zod4.ZodOptional<zod4.ZodBoolean>;
            noPreferenceMediaQueries: zod4.ZodOptional<zod4.ZodBoolean>;
        }, zod4.z.core.$loose>>;
        print: zod4.ZodOptional<zod4.ZodObject<{
            globals: zod4.ZodOptional<zod4.ZodBoolean>;
            normalize: zod4.ZodOptional<zod4.ZodBoolean>;
            template: zod4.ZodOptional<zod4.ZodObject<{
                docBlock: zod4.ZodOptional<zod4.ZodBoolean>;
            }, zod4.z.core.$loose>>;
        }, zod4.z.core.$loose>>;
        template: zod4.ZodOptional<zod4.ZodObject<{
            name: zod4.ZodOptional<zod4.ZodString>;
            isDefault: zod4.ZodOptional<zod4.ZodBoolean>;
            isTemplate: zod4.ZodOptional<zod4.ZodBoolean>;
        }, zod4.z.core.$loose>>;
    }, zod4.z.core.$loose>, Parsed>>;
    astro: ScssTemplate<"astro", ScssTemplate.Config<zod4.ZodObject<{
        include: zod4.ZodOptional<zod4.ZodObject<{
            featureCheck: zod4.ZodOptional<zod4.ZodBoolean>;
            html: zod4.ZodOptional<zod4.ZodBoolean>;
            noPreferenceMediaQueries: zod4.ZodOptional<zod4.ZodBoolean>;
        }, zod4.z.core.$loose>>;
        print: zod4.ZodOptional<zod4.ZodObject<{
            globals: zod4.ZodOptional<zod4.ZodBoolean>;
            normalize: zod4.ZodOptional<zod4.ZodBoolean>;
            template: zod4.ZodOptional<zod4.ZodObject<{
                docBlock: zod4.ZodOptional<zod4.ZodBoolean>;
            }, zod4.z.core.$loose>>;
        }, zod4.z.core.$loose>>;
        template: zod4.ZodOptional<zod4.ZodObject<{
            name: zod4.ZodOptional<zod4.ZodString>;
            isDefault: zod4.ZodOptional<zod4.ZodBoolean>;
            isTemplate: zod4.ZodOptional<zod4.ZodBoolean>;
        }, zod4.z.core.$loose>>;
    }, zod4.z.core.$loose>, Parsed>>;
};
export {};
//# sourceMappingURL=scssTemplates.d.ts.map