/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import { slugify } from '@maddimathon/utility-typescript/functions';
import type {
    Schemata,
} from '../00-types/Schemata.js';

import type { parseKind } from './parseKind.js';

export function makeSortingIndex(
    reflect: Omit<Schemata.Reflection.Any, "sortingIndex">,
): string {

    const stringPadding = (
        index: number | string,
        len: number,
        opts: Partial<{
            /** 
             * Character used to pad the string.
             * 
             * @default '-'
             */
            char: string;

            dir: "start" | "end";
        }> = {}
    ) => {

        const {
            char = typeof index === 'number' ? '0' : '_',
            dir = typeof index === 'number' ? 'start' : 'end',
        } = opts;

        const str: string = typeof index === 'number' ? String( index ) : index;

        // returns
        if ( str.length == len ) {
            return str;
        }

        // returns
        if ( str.length > len ) {
            return str.slice( 0, len );
        }

        if ( dir == 'start' ) {
            return char.repeat( len - str.length ) + str;
        }

        return str + char.repeat( len - str.length );
    };


    const kindSortIndex = ( _kind: parseKind.Return ): number => {

        switch ( _kind ) {

            case 'Accessor':
            case 'CallSignature':
            case 'Class':
            case 'Constructor':
            case 'ConstructorSignature':
            case 'Document':
            case 'Enum':
            case 'EnumMember':
            case 'Function':
            case 'GetSignature':
            case 'IndexSignature':
            case 'Interface':
            case 'Method':
            case 'Module':
            case 'Namespace':
            case 'Parameter':
            case 'Project':
            case 'Property':
            case 'Reference':
            case 'SetSignature':
            case 'TypeAlias':
            case 'TypeLiteral':
            case 'TypeParameter':
            case 'Variable':
            default:
                return 100;
        }
    };

    const kindSortKey =
        stringPadding( kindSortIndex( reflect.kind ), 6 )
        + '-'
        + stringPadding( reflect.kind, 24 );


    const visibilitySortKey =
        reflect.flags?.public
            ? 20
            : reflect.flags?.protected
                ? 40
                : reflect.flags?.private
                    ? 60
                    : 80;


    return (
        ''
        + kindSortKey
        + '__'
        + stringPadding( visibilitySortKey, 3 )
        + '__'
        + slugify( reflect.name )
    );
}