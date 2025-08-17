/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { Test } from '@maddimathon/utility-typescript/types';

import {
    // describe,
    // expect,
    test,
} from '@jest/globals';

import * as z from 'zod';

import { Literals } from './Literals.js';
import { Schemata } from './Schemata.js';


// double-checks that the types match
type _Tests = [

    Test.Expect<Test.Exactly<
        Schemata.ReflectionGeneric<Literals.Reflections.Kind.Any>,
        Schemata.Reflection.Any
    >>,

    Test.Expect<Test.Exactly<
        z.infer<ReturnType<typeof Schemata.Reflection>>,
        Schemata.ReflectionGeneric<Literals.Reflections.Kind.Any>
    >>,

    Test.Expect<Test.Exactly<
        z.infer<ReturnType<typeof Schemata.Reflection>>,
        Schemata.Reflection.Any
    >>,


    // TODO finish
    Test.Expect<Test.Exactly<
        z.infer<typeof Schemata.Reflection.Class>,
        Schemata.ReflectionGeneric<"Class">
    >>,


    Test.Expect<Test.Exactly<
        Schemata.PageGeneric<Schemata.Reflection.Any>,
        Schemata.Page.Any
    >>,
];

// only here so that this type is used and doesn’t throw errors
true as _Tests[ 0 ];


test.todo( 'typedoc.Schemata' );
// describe( 'typedoc.Schemata', () => {

//     describe( 'typedoc.Schemata.Metadata', () => {

//         test( 'Reflection equivolency and inheritance', () => {
//         } );
//     } );
// } );