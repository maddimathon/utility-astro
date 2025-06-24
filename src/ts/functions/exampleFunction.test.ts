/**
 * @since 1.1.0+tmpl
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

// import type { Test } from '@maddimathon/utility-typescript/types';
import { expect, test } from '@jest/globals';

import { exampleFunction } from './exampleFunction.js';


test( 'exampleFunction()', () => {
    expect( exampleFunction() ).toBe( 'hello' );
} );
