#!/usr/bin/env node
// @ts-check
'use strict';
/*
 * @package @maddimathon/utility-astro
 * @author Maddi Mathon (https://www.maddimathon.com/web)
 * 
 * @license MIT
 */

/**
 * @import { Stage } from "@maddimathon/build-utilities"
 */

import {
    CompileStage,
} from '@maddimathon/build-utilities';

/**
 * Extension of the built-in one.
 */
export class Compile extends CompileStage {

    /**
     * @type {Stage.SubStage.Compile[]}
     * 
     * @override
     * @readonly
     */
    subStages = [
        // @ts-expect-error
        'tsconfig',
        'ts',
        // @ts-expect-error
        'templates',
        'files',
        'scss',
        // @ts-expect-error
        'astro',
    ];


    /**
     * @protected
     */
    async astro() {

        const subDir = 'astro';

        const distDir = this.getDistDir( undefined, subDir ).trim().replace( /\/$/g, '' );

        await this.runCustomDirCopySubStage( subDir );

        // TODO - remove this when unneeded
        this.fs.delete( [
            distDir + '/components/NewComponent.astro',
            distDir + '/components/NewComponent.d.ts',
        ], 2 );
    }

    /**
     * @protected
     * @override
     */
    async scss() {
        await this.runCustomDirCopySubStage( 'scss' );

        await this.runCustomScssDirSubStage(
            '',
            'src/astro/css',
            {
                postCSS: true,
                srcDir: 'src/scss/_astro',
            },
        );
    }

    /**
     * @protected
     */
    async templates() {

        await this.runCustomScssDirSubStage(
            'template',
            'dist/css',
            {
                postCSS: true,
                srcDir: 'src/scss',
            },
        );
    }

    /**
     * @protected
     */
    async tsconfig() {
        this.console.progress( 'writing tsconfig files...', 1 );

        await this.atry( this.writeTsConfig, 2, [
            'tsconfig.base.json',
            2,
            {
                extends: [
                    '@maddimathon/build-utilities/tsconfig',
                    'astro/tsconfigs/strictest',
                ],

                compilerOptions: {
                    types: undefined,
                },
            },
        ] );

        this.try( this.fs.write, 2, [
            'tsconfig.astro.json',
            JSON.stringify( {
                extends: [
                    './tsconfig.base.json',
                    'astro/tsconfigs/base',
                ],

                compilerOptions: {
                    isolatedDeclarations: false,
                    // module: 'NodeNext',
                    // moduleResolution: 'NodeNext',
                },
            }, null, 4 ),
            { force: true },
        ] );

        await this.atry( this.writeTsConfig, 2, [
            'tsconfig.json',
            2,
            {
                extends: './tsconfig.astro.json',

                include: [ './src/**/*' ],
                exclude: [
                    './.scripts/**/*',
                    './node_modules/**/*',
                ],

                compilerOptions: {
                    skipLibCheck: false,

                    plugins: [
                        {
                            name: '@astrojs/ts-plugin',
                        },
                    ],
                },
            },
        ] );

        const buildUtilsConfig = await this.compiler.resolveTsConfig(
            'node_modules/@maddimathon/build-utilities/tsconfig.base.json',
            2,
        );

        await this.atry( this.writeTsConfig, 2, [
            'src/ts/tsconfig.json',
            2,
            {
                extends: '../../tsconfig.base.json',

                include: [
                    '../../src/ts/**/*',
                    './src/ts/**/*',
                ],
                exclude: [
                    '**/node_modules/**/*'
                ],

                compilerOptions: {
                    allowImportingTsExtensions: undefined,
                    allowJs: undefined,
                    declaration: true,
                    declarationMap: false,
                    module: buildUtilsConfig.compilerOptions.module,
                    moduleResolution: buildUtilsConfig.compilerOptions.moduleResolution,
                    noEmit: undefined,
                    outDir: '../../dist/ts/',
                    sourceMap: false,
                    target: buildUtilsConfig.compilerOptions.target,
                },
            },
        ] );
    }
}