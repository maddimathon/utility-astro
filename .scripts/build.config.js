#!/usr/bin/env node
// @ts-check
'use strict';

/**
 * @import { Config, Stage } from "@maddimathon/build-utilities"
 */

import * as typeDoc from "typedoc";

import {
    BuildStage,
} from '@maddimathon/build-utilities';

import { Build } from './classes/Build.js';

const _defaults = {
    build: BuildStage.prototype.ARGS_DEFAULT,
};

/**
 * @type {Config}
 */
const config = {

    title: 'NPM Library Template',
    launchYear: '2025',

    stages: {

        build: [
            Build,
            {

                minimize: false,

                /**
                 * @param {Stage} _stage
                 */
                prettify: ( _stage ) => {

                    return {
                        ..._defaults.build.prettify( _stage ),

                        html: undefined,
                        js: undefined,
                        ts: undefined,
                        yaml: undefined,
                    };
                },
            },
        ],

        compile: {

            files: {

                src: [
                    'scss',
                ],
            },
        },

        document: {

            entryPoints: [
                // 'src/ts/index.ts',
                'src/ts/classes/index.ts',
                'src/ts/functions/index.ts',
                'src/ts/types/index.ts',
            ],

            typeDoc: {

                categorizeByGroup: false,

                highlightLanguages: [
                    ...typeDoc.OptionDefaults.highlightLanguages,

                    'astro',
                    'csv',
                    'handlebars',
                    'jsx',
                    'latex',
                    'markdown',
                    'md',
                    'php',
                    'regex',
                    'regexp',
                    'sass',
                    'scss',
                    'sh',
                    'shell',
                    'shellscript',
                    'sql',
                    'swift',
                    'tsv',
                    'vue-html',
                    'vue',
                    'xml',
                    'yaml',
                    'yml',
                    'zsh',
                ],

                projectDocuments: [
                    'README.md',
                    // 'CHANGELOG.md',
                    // 'LICENSE.md',
                    'src/docs/*.md',
                ],
            },
        },

        release: {

            /**
             * @param {Stage}    _stage
             * @param {string[]} _defaultPaths
             * 
             * @return {string[]}
             */
            commit: ( _stage, _defaultPaths = [] ) => _defaultPaths.filter(
                _path => _path.match( /(^\s*|\.\/)dist(\/|\s*$)/gi ) === null
            ),
        },

        test: true,
    },
};

export default config;
