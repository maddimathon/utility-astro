/*
 * @package @maddimathon/utility-astro
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import {
    type Stage,
    CompileStage,
} from '@maddimathon/build-utilities';

/**
 * Extension of the built-in one.
 */
export class Compile extends CompileStage {

    override readonly subStages: Stage.SubStage.Compile[] = [
        'ts',
        'scss',
        'astro' as Stage.SubStage.Compile,
        'files',
    ];


    protected async astro() {
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

        // TODO - remove this when unneeded
        this.fs.delete( [
            distDir + '/' + subDir + '/components/NewComponent.astro',
            distDir + '/' + subDir + '/components/NewComponent.d.ts',
        ], 2 );
    }

    protected override async scss() {
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