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
    TestStage,
} from '@maddimathon/build-utilities';

/**
 * Extension of the built-in one.
 */
export class Test extends TestStage {

    /**
     * @type {Stage.SubStage.Test[]}
     * 
     * @readonly
     * @override
     */
    subStages = [
        'scss',
    ];

    /**
     * @override
     * @protected
     */
    async scss() {

        await this.customScssSubstage.demoDir(
            'demos',
            'dist/css',
            {
                maxConcurrent: 50,
                srcDir: 'src/scss',
            },
            1,
        );

        if ( this.params.packaging || this.params.releasing ) {
            this.console.verbose( 'tidying up compiled files...', 2 );
            this.try(
                this.fs.delete,
                ( this.params.verbose ? 3 : 2 ),
                [ [
                    'dist/scss/demos',
                ], ( this.params.verbose ? 3 : 2 ) ]
            );
        }
    }
}