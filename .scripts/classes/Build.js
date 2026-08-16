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
    escRegExpReplace,
    softWrapText,
} from '@maddimathon/utility-typescript';

import {
    BuildStage,
} from '@maddimathon/build-utilities';

import * as esbuild from 'esbuild';

/**
 * Extension of the built-in one.
 */
export class Build extends BuildStage {

    /**
     * @type {Stage.SubStage.Build[]}
     * 
     * @override
     * @readonly
     */
    subStages = [
        'compile',
        'replace',
        // @ts-expect-error
        'readme',
        'prettify',
        'minimize',
        // @ts-expect-error
        'bundle',
        'test',
        'document',
    ];

    /**
     * @override
     */
    // @ts-expect-error
    get ARGS_DEFAULT() {
        // returns
        if ( this.params.starting && !this.params.packaging && !this.params.releasing ) {

            /** @type {Stage.Args.Build} */
            const args = {
                ...super.ARGS_DEFAULT,
                prettify: false,
            };

            return args;
        }

        return super.ARGS_DEFAULT;
    }


    /**
     * @protected
     */
    async bundle() {
        this.console.progress( 'bundling javascript...', 1 );

        /** 
         * @type {string[]}
         */
        const typeGlobs = [];

        this.console.verbose( 'bundling...', 2 );
        await Promise.all( [
            'ElementToggle',
            'JsCookie',
            'SettingsMenu',
        ].map(
            filename => {
                typeGlobs.push( `${ filename }.d.ts` );

                return this.atry(
                    esbuild.build,
                    this.params.verbose ? 3 : 2,
                    [ {
                        bundle: true,
                        entryPoints: [ this.fs.pathResolve( `src/ts/classes/${ filename }.ts` ) ],
                        external: [],
                        format: 'esm',
                        outfile: this.fs.pathResolve( `dist/ts/bundled/${ filename }.js` ),
                        platform: 'browser',
                    } ],
                );
            }
        ) );

        this.console.verbose( 'copying types...', 2 );
        await this.atry(
            this.fs.copy,
            this.params.verbose ? 3 : 2,
            [
                typeGlobs,
                this.params.verbose ? 3 : 2,
                'dist/ts/bundled/',
                'dist/ts/classes/',
            ]
        );

        this.console.verbose( 'replacing placeholders...', 2 );
        const paths = this.fs.glob( [ 'dist/ts/bundled/**/*' ] );

        this.replaceInFiles( paths, 'current', this.params.verbose ? 3 : 2 );
        this.replaceInFiles( paths, 'package', this.params.verbose ? 3 : 2 );
    }


    /**
     * @protected
     */
    async readme() {
        this.console.progress( 'replacing readme placeholders...', 1 );

        const headerRegex = /(<!--README_HEADER-->).*?(<!--\/README_HEADER-->)/gs;

        let readmeContent = this.fs.readFile( 'README.md' )
            .replace( headerRegex, '$1\n' + escRegExpReplace( `# ${ this.config.title } @ ${ this.version.toString( this.isDraftVersion ) }` ) + '\n$2' );


        // READ DOCS
        readmeContent = readmeContent.replace(
            /(<!--README_DOCS_CTA-->).*?(<!--\/README_DOCS_CTA-->)/gs,
            '$1\n' + (
                this.pkg.homepage
                    ? escRegExpReplace( `<a href="${ this.pkg.homepage }" class="button">Read Documentation</a>` )
                    : ''
            ) + '\n$2'
        );


        // DESCRIPTION
        readmeContent = readmeContent.replace(
            /(<!--README_DESC-->).*?(<!--\/README_DESC-->)/gs,
            '$1\n' + (
                this.pkg.description
                    ? escRegExpReplace( softWrapText( this.pkg.description, 80 ) )
                    : ''
            ) + '\n$2'
        );


        /** 
         * Markdown links to read the changelog.
         * @type {string[]}
         */
        const changelogLinks = [];

        if ( this.pkg.repository ) {

            const _gitURL = this.pkg.repository;

            changelogLinks.push( `[the source](${ _gitURL.replace( /(\/+|\.git)$/gi, '' ) }/blob/main/CHANGELOG.md)` );
        }

        if ( this.pkg.homepage ) {
            changelogLinks.push( `[the docs site](${ this.pkg.homepage }/Changelog.html)` );
        }


        // CHANGELOG LINKS
        readmeContent = readmeContent.replace(
            /(<!--README_DOCS_CHANGELOG-->).*?(<!--\/README_DOCS_CHANGELOG-->)/gs,
            '$1\n' + (
                changelogLinks.length
                    ? escRegExpReplace( `Read it from ${ changelogLinks.join( ' \nor \n' ) }.` )
                    : ''
            ) + '\n$2'
        );


        if ( this.params.releasing ) {

            readmeContent = readmeContent.replace(
                /(<!--README_INSTALL-->).*?(<!--\/README_INSTALL-->)/gs,
                '$1\n' + escRegExpReplace( [
                    '```sh',
                    'npm i -D @maddimathon/utility-astro@' + this.pkg.version,
                    'npm i -D github:maddimathon/utility-astro#' + this.pkg.version,
                    '```',
                ].join( '\n' ) ) + '\n$2'
            );
        }


        this.fs.write( 'README.md', readmeContent, { force: true } );
    }
}