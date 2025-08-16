/*
 * @package @maddimathon/utility-astro
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import type { TypeDocJson } from './lib/Collection.js';

import {
    type Stage,
    DocumentStage,
} from '@maddimathon/build-utilities';

import { Collection } from './lib/Collection.js';

/**
 * Extension of the built-in one.
 */
export class Document extends DocumentStage {

    /**
     * Paths to typedoc outputs.
     */
    static readonly typeDoc_paths = {
        json: './src/docs/content/typedoc.json',
        md: './src/docs/content/exports',
    };

    override readonly subStages: Stage.SubStage.Document[] = [
        'typeDoc',
        // 'collect' as Stage.SubStage.Document,
        'scss' as Stage.SubStage.Document,
        'astro' as Stage.SubStage.Document,
        'replace',
    ];


    protected override async typeDoc() {
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

    protected async collect() {
        this.console.progress( 'converting typeDoc export to content collection...', 1 );

        // returns
        if ( !this.fs.exists( Document.typeDoc_paths.json ) ) {
            this.console.progress( 'no typeDoc json export was found, exiting...', 2, { bold: true, clr: 'red', } );
            return;
        }

        const jsonFile = this.fs.readFile( Document.typeDoc_paths.json );

        const json = JSON.parse( jsonFile ) as TypeDocJson.ProjectReflection;


        this.console.verbose( 'creating object...', 2 );
        const collection = new Collection( json );


        this.console.verbose( 'writing content collection...', 2 );
        this.try(
            this.fs.write,
            this.params.verbose ? 2 : 1,
            [
                'src/docs/content/typedoc/typedoc.json',
                JSON.stringify( collection, null, 4 ),
                { force: true }
            ]
        );
    }

    protected async scss() {

        const outDir = (
            this.getSrcDir( 'docs', 'css' )[ 0 ]
            ?? this.getSrcDir( undefined, 'docs/css' )
        ).replace( /\/$/g, '' );

        await this.runCustomScssDirSubStage( 'docs/scss', outDir );
    }

    protected async astro() {
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