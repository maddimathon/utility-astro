/**
 * @since 0.1.0-beta.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0
 * @license MIT
 */

import { hasIterator } from '@maddimathon/utility-typescript';

import type { ClassList, ClassListItem } from '../../ts/types/index.js';

/**
 * @since 0.1.0-beta.0
 */
function flattenClassList_single(
    classListItem: undefined | string | Record<string, boolean>,
): string[] {
    // returns
    if ( !classListItem ) {
        return [];
    }

    if ( typeof classListItem === 'string' ) {
        return [ classListItem ];
    }

    return Object.entries( classListItem ).map(
        ( [ key, value ] ) => value ? key : ''
    ).filter( item => !!item?.length );
}

/**
 * @since 0.1.0-beta.0
 */
export function flattenClassList( classList: undefined | null | ClassList ): string | null {
    // returns
    if ( !hasIterator( classList ) ) {
        return flattenClassList_single( classList ?? undefined ).join( ' ' ) || null;
    }

    const classes = [];

    for ( const item of classList ) {
        // continues
        if ( !item ) {
            continue;
        }

        classes.push( ...flattenClassList_single( item ) );
    }

    return classes.join( ' ' ).trim() || null;
}

/**
 * @since 0.1.0-beta.0
 */
export function makeClassList(
    defaultClasses: null | ClassList | ClassList[],
    inputClasses?: undefined | null | ClassList | ClassList[],
    {
        separator = '||',
    }: Partial<{
        separator: string | false;
    }> = {},
): null | ClassListItem[] {

    const inputList = makeClassList.listParser( inputClasses );

    const allClasses = makeClassList.listParser( defaultClasses );

    if ( separator && allClasses?.length && inputList?.length ) {
        allClasses.push( separator );
    }

    allClasses.push( ...inputList );

    return allClasses.length ? allClasses : null;
}

/**
 * Utilities for the {@link makeClassList} function.
 * 
 * @since 0.1.0-beta.6
 */
export namespace makeClassList {

    /**
     * @since 0.1.0-beta.0
     */
    export function listParser(
        list: undefined | null | ClassList | ClassList[],
    ): ClassListItem[] {

        const itemFilter = ( item: undefined | null | ClassListItem ): item is ClassListItem => {
            // returns - by length
            if ( !item || typeof item !== 'object' ) {
                return !!item?.length;
            }

            return Object.values( item ).some( _item => !!_item );
        };

        return (
            Array.isArray( list ) ? list.flat() : [ list ]
        ).filter( itemFilter );
    }

    /**
     * @since 0.1.0-beta.6
     */
    export function flat(
        defaultClasses: null | ClassList | ClassList[],
        inputClasses?: undefined | null | ClassList | ClassList[],
        opts: Parameters<typeof makeClassList>[ 2 ] = {},
    ): string | null {

        return flattenClassList(
            makeClassList( defaultClasses, inputClasses, opts )
        );
    }
}