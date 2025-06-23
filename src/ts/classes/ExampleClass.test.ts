/**
 * @since 1.1.0+tmpl
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/template-npm-library@___CURRENT_VERSION___
 * @license MIT
 */

// import type { Test } from '@maddimathon/build-utilities/types';
import { describe, expect, test } from '@jest/globals';

import { ExampleClass } from './ExampleClass.js';


describe( 'ExampleClass', () => {

    const exClass = new ExampleClass();

    test( 'ExampleClass.test()', () => {
        expect( exClass.test() ).toBe( 'hello' );
    } );
} );
