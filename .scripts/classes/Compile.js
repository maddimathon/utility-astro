#!/usr/bin/env node
// @ts-check
'use strict';
/*
 * @package @maddimathon/utility-astro
 * @author Maddi Mathon (www.maddimathon.com)
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
     * Write tsconfig files and compiles ts files to be included in the package.
     * 
     * @protected
     * @override
     */
    async ts() {
        this.console.progress( 'writing tsconfig files...', 1 );

        const writeArgs = { force: true, rename: false };

        const buildUtilsConfig = await this.compiler.resolveTsConfig( 'node_modules/@maddimathon/build-utilities/tsconfig.base.json', 2 );

        const baseConfigPath = await this.writeTsConfig(
            'tsconfig.base.json',
            2,
            {
                extends: [
                    '@maddimathon/build-utilities/tsconfig',
                    'astro/tsconfigs/strictest',
                ],

                compilerOptions: {
                    isolatedDeclarations: false,
                },
            },
            writeArgs,
        );

        const basePath_relative = baseConfigPath ? this.fs.pathRelative( baseConfigPath ) : baseConfigPath;

        await this.writeTsConfig(
            'src/ts/tsconfig.json',
            2,
            {
                extends: basePath_relative ? basePath_relative : '../../tsconfig.base.json',

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
                    isolatedDeclarations: true,
                    noEmit: undefined,
                    outDir: '../../dist/ts/',
                    target: buildUtilsConfig.compilerOptions.target,
                },
            },
            writeArgs,
        );

        return super.ts();
    }
}