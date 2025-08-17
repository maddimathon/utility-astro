/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import * as z from 'zod';


/**
 * Simple types used with the TypeDoc plugins and utilities.
 * 
 * @since ___PKG_VERSION___
 */
export namespace Literals {

    export namespace Reflections {

        export namespace Kind {

            export const Any = z.union( [
                z.literal( 'Accessor' ),
                z.literal( 'CallSignature' ),
                z.literal( 'Class' ),
                z.literal( 'Constructor' ),
                z.literal( 'ConstructorSignature' ),
                z.literal( 'Document' ),
                z.literal( 'Enum' ),
                z.literal( 'EnumMember' ),
                z.literal( 'Function' ),
                z.literal( 'GetSignature' ),
                z.literal( 'IndexSignature' ),
                z.literal( 'Interface' ),
                z.literal( 'Method' ),
                z.literal( 'Module' ),
                z.literal( 'Namespace' ),
                z.literal( 'Parameter' ),
                z.literal( 'Project' ),
                z.literal( 'Property' ),
                z.literal( 'Reference' ),
                z.literal( 'SetSignature' ),
                z.literal( 'TypeAlias' ),
                z.literal( 'TypeLiteral' ),
                z.literal( 'TypeParameter' ),
                z.literal( 'Variable' ),
            ] );

            export type Any = z.infer<typeof Literals.Reflections.Kind.Any>;
        }
    }
}