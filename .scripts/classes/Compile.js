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
 * @import { FileExport } from "@maddimathon/scss-templater"
 */

import {
    CompileStage,
} from '@maddimathon/build-utilities';

import {
    // sassCompilerConfig,
} from '@maddimathon/scss-templater';

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
        // // @ts-expect-error
        // 'templates',
        // @ts-expect-error
        'newTemplates',
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
        // await this.runCustomDirCopySubStage( 'scss' );

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
     * @type {( ( ...params: Parameters<typeof this.fs.write> ) => Promise<ReturnType<typeof this.fs.write>> )}
     * @protected
     */
    // @ts-expect-error
    writeAsync = this.fs.write;

    /**
     * @protected
     */
    async templates() {

        await this.runCustomScssDirSubStage(
            'old-template',
            'dist/css/old-template',
            {
                postCSS: true,
                srcDir: 'src/scss',
            },
        );
    }

    /**
     * @protected
     */
    async newTemplates() {
        this.console.progress( 'building templates...', 1 );

        const { ScssTemplater } = await import( '../../dist/ts/scssTemplater.js' );

        /**
         * @satisfies {[ string, FileExport ][]}
         */
        const files = await Promise.all(
            ( [
                'default',
                'tokens',
                'globals',
                'html',
                'astro',
            ] ).map(
                /**
                 * @return {Promise<[ string, FileExport ][]>}
                 */
                async ( slug ) => {

                    switch ( slug ) {

                        case 'astro':
                        case 'globals':
                        case 'html':
                        case 'tokens':
                            return ScssTemplater.template.toScssFiles( {
                                defaults: {
                                    config: ScssTemplater.DEFAULT_CONFIG[ slug ],
                                },
                            } ).then( Object.entries );
                    }

                    return ScssTemplater.template.toScssFiles().then( Object.entries );
                }
            )
        ).then(
            /**
             * @return {[ string, FileExport ][]}
             */
            arr => arr.flat()
        );

        this.console.verbose( 'writing template scss files...', 2 );

        await Promise.all( files.map(
            async ( [ key, { path, content } ] ) => this.atry(
                this.writeAsync,
                ( this.params.verbose ? 3 : 2 ),
                [
                    this.getSrcDir( undefined, 'scss', path ),
                    content,
                    { force: true, rename: false },
                ],
            )
        ) );

        await this.runCustomScssDirSubStage(
            [
                'template',
            ],
            'dist/css',
            {
                maxConcurrent: 20,
                postCSS: false,
                srcDir: 'src/scss',
            },
            2,
            // await sassCompilerConfig( undefined, {
            //     config: ScssTemplater.Config,
            // } ),
        );
    }
}