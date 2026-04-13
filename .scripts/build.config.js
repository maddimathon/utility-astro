#!/usr/bin/env node
// @ts-check
'use strict';

/**
 * @import { Config, Stage } from "@maddimathon/build-utilities"
 */

import {
    BuildStage,
} from '@maddimathon/build-utilities';

import {
    Stage_Compiler,
} from '@maddimathon/build-utilities/internal';

import { sassCompilerOpts } from '@maddimathon/utility-sass';

import { Build } from './classes/Build.js';
import { Compile } from './classes/Compile.js';
import { Document } from './classes/Document.js';

const _defaults = {
    build: BuildStage.prototype.ARGS_DEFAULT,
    compiler: Stage_Compiler.prototype.ARGS_DEFAULT,
};

/**
 * @type {Config}
 */
const config = {

    title: 'Utility Astro',
    launchYear: '2025',

    compiler: {

        postCSS: {
            presetEnv: {
                features: {
                    clamp: false,

                    // "custom-properties": { },

                    // "logical-overflow": false,
                    // "logical-overscroll-behavior": false,
                    // "logical-properties-and-values": false,
                    // "logical-resize": false,
                    // "logical-viewport-units": false,
                },
            },
        },

        sass: ( args ) => sassCompilerOpts( args, {
            benchmarkCompileTime: true,
            // pathToSassLoggingRoot: 'node_modules/@maddimathon/build-utilities/node_modules',
        } ),

        ts: {
            tidyGlobs: '**/tsconfig.tsbuildinfo',
        },
    },

    stages: {

        build: [
            Build,
            {

                minimize: false,

                /**
                 * @param {Stage} _stage
                 */
                prettify: ( _stage ) => {

                    const _def = _defaults.build.prettify( _stage );

                    return {
                        ..._def,

                        css: [ [
                            ..._def.css.flat(),
                            'src/astro/css/**/*.css',
                            'src/docs/css/**/*.css',
                        ] ],

                        html: undefined,
                        js: undefined,
                        ts: undefined,
                        yaml: undefined,
                    };
                },
            },
        ],

        compile: Compile,

        document: [ Document, {
            entryPoints: [
                'src/ts/index.ts',

                // 'src/astro/components.ts',
                // 'src/astro/functions.ts',
                // 'src/astro/layouts.ts',
                // 'src/astro/support.ts',
            ],

            typeDoc: {
                out: 'src/docs/_public/typedoc',

                // compilerOptions: {
                //     allowArbitraryExtensions: true,
                //     allowImportingTsExtensions: true,
                //     skipLibCheck: true,
                //     strictNullChecks: false,
                // },

                projectDocuments: [
                    'README.md',
                ],

                tsconfig: 'src/ts/tsconfig.json',

                // plugin: [],

                navigation: {
                    // includeGroups: true,
                    includeFolders: true,
                },
            },
        } ],

        test: false,
    },
};

export default config;
