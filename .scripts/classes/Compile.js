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
        'scss',
        // @ts-expect-error
        'astro',
        // @ts-expect-error
        'templates',
        'files',
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
            'scss/template',
            this.getDistDir( undefined, 'css/template' ),
            {
                postCSS: true,
            },
        );
    }
}