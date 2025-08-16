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

        compile: Compile,

        document: [
            Document,
            {

                entryPoints: [
                    'src/ts/typedoc/docs-test/index.ts',
                    'src/ts/typedoc/docs-test/module-example.ts',
                    // 'src/ts/index.ts',
                    // 'src/astro/components/docs.d.ts',
                    // 'src/astro/layouts/docs.d.ts',
                ],

                typeDoc: {
                    categorizeByGroup: false,
                    excludeExternals: true,

                    projectDocuments: [],

                    // @ts-expect-error - this is a typedoc-plugin-markdown prop
                    entryFileName: 'index',
                    hideBreadcrumbs: true,
                    hidePageHeader: true,
                    hidePageTitle: true,

                    sanitizeComments: true,
                    useCodeBlocks: true,
                    useHTMLEncodedBrackets: true,


                    // json: Document.typeDoc_paths.json,
                    out: Document.typeDoc_paths.md,

                    plugin: [
                        'typedoc-plugin-markdown',
                        './dist/ts/typedoc/plugins/MarkdownExport.example.js',
                    ],

                    tsconfig: 'tsconfig.json',

                    compilerOptions: {
                        plugins: [
                            {
                                name: '@astrojs/ts-plugin',
                            },
                        ],
                    },
                },
            }
        ],

        test: false,
    },
};

export default config;
