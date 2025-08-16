/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
*/

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import * as typedoc from '../ts/typedoc/index.js';

export const typeDocSchemata = new typedoc.Schemata();

const exports = defineCollection( {
    loader: glob( { pattern: "**/*.md", base: "./src/docs/content/exports" } ),
    schema: typeDocSchemata.metadata.page,
} );

export const collections = { exports };