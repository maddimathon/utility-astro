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
    DocumentStage,
} from '@maddimathon/build-utilities';

/**
 * Extension of the built-in one.
 */
export class Document extends DocumentStage {

    /**
     * Paths to typedoc outputs.
     * 
     * @readonly
     */
    static typeDoc_paths = {
        json: './src/docs/content/typedoc.json',
        md: './src/docs/content/api',
    };


    /**
     * @type {Stage.SubStage.Document[]}
     * 
     * @readonly
     * @override
     */
    subStages = [
        // 'typeDoc',
        // @ts-expect-error
        'scss',
        // @ts-expect-error
        'astro',
        'replace',
    ];


    /**
     * @protected
     * @override
     */
    async typeDoc() {
        this.fs.delete( [
            Document.typeDoc_paths.json,
            Document.typeDoc_paths.md,
        ], 1 );

        await super.typeDoc();


        this.console.verbose( 'making replacements in markdown...', 2 );
        const replacePaths = [
            Document.typeDoc_paths.json,
            Document.typeDoc_paths.md + '/**/*',
        ];

        this.replaceInFiles( replacePaths, 'current', this.params.verbose ? 3 : 2 );
        this.replaceInFiles( replacePaths, 'package', this.params.verbose ? 3 : 2 );

        this.console.verbose( 'replacing markdown paths...', 2 );
        this.fs.replaceInFiles( replacePaths, [
            [ /(?<=\[[^\]]+\]\([^\)]+)\.md\)/gi, '.html)' ],
        ], this.params.verbose ? 3 : 2 );


        this.console.verbose( 'tidying up...', 2 );
        this.fs.delete( [
            Document.typeDoc_paths.md + '/.nojekyll',
            Document.typeDoc_paths.md + '/index.md',
        ], 1 );
    }


    /**
     * @protected
     */
    async scss() {

        const outDir = (
            this.getSrcDir( 'docs', 'css' )[ 0 ]
            ?? this.getSrcDir( undefined, 'docs/css' )
        ).replace( /\/$/g, '' );

        await this.runCustomScssDirSubStage( 'docs/scss', outDir, { postCSS: false } );

        await this.atry(
            this.fs.prettier,
            2,
            [ [
                'src/docs/css/*.css',
                'src/docs/css/**/*.css',
            ], 'css' ]
        );
    }

    /**
     * @protected
     */
    async astro() {
        this.console.progress( 'building astro docs...', 1 );

        const distDir = this.getDistDir( 'docs' ).trim().replace( /\/$/g, '' );

        if ( this.fs.exists( distDir ) ) {
            this.console.verbose( 'deleting existing files...', 2 );
            this.fs.delete( distDir, this.params.verbose ? 3 : 2 );
        }

        this.console.verbose( 'checking astro types...', 2 );
        this.try(
            this.console.nc.cmd,
            this.params.verbose ? 3 : 2,
            [ 'astro check' ]
        );

        this.console.verbose( 'compiling to ' + distDir + '...', 2 );
        this.try(
            this.console.nc.cmd,
            this.params.verbose ? 3 : 2,
            [ 'astro build' ]
        );
    }
}