#!/usr/bin/env node
'use strict';
// @ts-check
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
        'files',
    ];

    /**
     * @protected
     */
    async astro() {
        this.console.progress( 'copying astro files to dist...', 1 );

        const subDir = 'astro';

        const distDir = this.getDistDir().trim().replace( /\/$/g, '' );

        if ( this.fs.exists( distDir ) ) {
            this.console.verbose( 'deleting existing files...', 2 );
            this.fs.delete( distDir + '/' + subDir, this.params.verbose ? 3 : 2 );
        }

        const srcDir = this.getSrcDir().trim().replace( /\/$/g, '' );

        this.fs.copy(
            subDir,
            2,
            distDir,
            srcDir,
            {
                force: true,
                rename: true,
                recursive: true,
            },
        );
    }

    /**
     * @protected
     * @override
     */
    async scss() {
        this.console.progress( 'copying scss files to dist...', 1 );

        const subDir = 'scss';

        const distDir = this.getDistDir().trim().replace( /\/$/g, '' );

        if ( this.fs.exists( distDir ) ) {
            this.console.verbose( 'deleting existing files...', 2 );
            this.fs.delete( distDir + '/' + subDir, this.params.verbose ? 3 : 2 );
        }

        const srcDir = this.getSrcDir().trim().replace( /\/$/g, '' );

        this.fs.copy(
            subDir,
            2,
            distDir,
            srcDir,
            {
                force: true,
                rename: true,
                recursive: true,
            },
        );
    }
}