/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import { defineCollection } from 'astro:content';
// import { glob, file } from 'astro/loaders';

// import type { AbstractPage } from '../../.scripts/classes/lib/abstract/AbstractPage.js';
// import type { Collection } from '../../.scripts/classes/lib/Collection.js';

// import partialConfig from '../../.scripts/build.config.js';
import schemas from './contentSchemas.js';

import typeDocJson from './content/typedoc/typedoc.json';

// import {
//     internal as buildUtils,

//     FileSystem,
//     ProjectConfig,

//     parseParamsCLI,
// } from '@maddimathon/build-utilities';

// const projectConfig = new ProjectConfig( buildUtils.internalConfig( partialConfig ) );

// const fs = new FileSystem(
//     new buildUtils.Stage_Console(
//         'black',
//         projectConfig,
//         parseParamsCLI( {} ),
//     ) as buildUtils.Logger,
// );

const docs = defineCollection( {
    loader: () => Object.values( typeDocJson.pages ),
    schema: schemas.PageUnion,
} );

export const collections = {
    docs,
};