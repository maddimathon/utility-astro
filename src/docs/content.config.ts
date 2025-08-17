/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
*/

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import * as typedoc from '../ts/typedoc/index.js';

const api = defineCollection( {
    loader: glob( { pattern: "**/*.md", base: "./src/docs/content/api" } ),
    schema: typedoc.Schemata.Page(),
} );

export const collections = { api };