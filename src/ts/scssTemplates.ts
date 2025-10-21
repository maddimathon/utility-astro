/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { RecursivePartial } from '@maddimathon/utility-typescript/types/objects';

import { mergeArgs } from '@maddimathon/utility-typescript/functions';

import {
    type Base_ParsedResult,
    templates as libTemplates,
    ScssTemplate,
    zod4,
} from '@maddimathon/scss-templater';


interface Parsed extends Base_ParsedResult {
}


// #region DEFAULT

const default_schema = libTemplates.base.config.schema.extend( {
} );

function default_parser(
    output: zod4.output<typeof default_schema>,
): Parsed {

    const def: Parsed = mergeArgs(
        {
            ...libTemplates.base.config.parser( output ),
        } satisfies Parsed,
        {
        },
        true
    );

    return mergeArgs( def, output as RecursivePartial<Parsed>, true );
}
// #endregion DEFAULT


// #region GLOBAL

const global_schema = default_schema.extend( {
} );

function global_parser(
    output: zod4.output<typeof global_schema>,
): Parsed {

    const def: Parsed = mergeArgs(
        {
            ...default_parser( output ),
        } satisfies Parsed,
        {
        },
        true
    );

    return mergeArgs( def, output as RecursivePartial<Parsed>, true );
}
// #endregion GLOBAL


// #region HTML

const html_schema = global_schema.extend( {
} );

function html_parser(
    output: zod4.output<typeof html_schema>,
): Parsed {

    const def: Parsed = mergeArgs(
        {
            ...global_parser( output ),
        } satisfies Parsed,
        {
        },
        true
    );

    return mergeArgs( def, output as RecursivePartial<Parsed>, true );
}
// #endregion HTML


// #region ASTRO

const astro_schema = html_schema.extend( {
} );

function astro_parser(
    output: zod4.output<typeof astro_schema>,
): Parsed {

    const def: Parsed = mergeArgs(
        {
            ...html_parser( output ),
        } satisfies Parsed,
        {
        },
        true
    );

    return mergeArgs( def, output as RecursivePartial<Parsed>, true );
}
// #endregion ASTRO


export const templates = {

    default: new ScssTemplate(
        'default',
        new ScssTemplate.Config(
            default_schema,
            default_parser,
            {},
        ),
    ),

    global: new ScssTemplate(
        'global',
        new ScssTemplate.Config(
            global_schema,
            global_parser,
            {},
        ),
    ),

    html: new ScssTemplate(
        'html',
        new ScssTemplate.Config(
            html_schema,
            html_parser,
            {},
        ),
    ),

    astro: new ScssTemplate(
        'astro',
        new ScssTemplate.Config(
            astro_schema,
            astro_parser,
            {},
        ),
    ),
};