/**
 * @since 0.1.0-beta.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.4.draft
 * @license MIT
 */

import { hasIterator } from '@maddimathon/utility-typescript';

import type { ClassList } from '../../ts/types/index.js';

/**
 * @since 0.1.0-beta.0
 */
function flattenClassList_single(
    classListItem: undefined | string | Record<string, boolean>,
): string {
    // returns
    if ( !classListItem ) {
        return '';
    }

    if ( typeof classListItem === 'string' ) {
        return ' ' + classListItem;
    }

    return ' ' + Object.entries( classListItem ).map(
        ( [ key, value ] ) => value ? key : ''
    ).filter( item => !!item ).join( ' ' );
}

/**
 * @since 0.1.0-beta.0
 */
export function flattenClassList( classList: undefined | null | ClassList ): string {

    // returns
    if ( !hasIterator( classList ) ) {
        return flattenClassList_single( classList ?? undefined );
    }

    let classes = '';

    for ( const item of classList ) {
        // continues
        if ( !item ) {
            continue;
        }

        // continues
        if ( !hasIterator( item ) ) {
            classes += flattenClassList_single( item );
            continue;
        }

        classes += Array.from( item ).map( flattenClassList_single ).join( '' );
    }

    return classes.trim();
}

/**
 * @since 0.1.0-beta.0
 */
function makeClassList_listParser( list: undefined | null | ClassList ): ( string | Record<string, boolean> )[] {
    return (
        Array.isArray( list ) ? list.flat() : [ list ]
    ).filter(
        ( item ): item is Exclude<NonNullable<typeof item>, false | ''> => !!item?.length
    );
}

/**
 * @since 0.1.0-beta.0
 */
export function makeClassList(
    defaultClasses: null | ClassList,
    inputClasses?: undefined | null | ClassList,
): ( string | Record<string, boolean> )[] {

    const defaultList = makeClassList_listParser( defaultClasses );
    const inputList = makeClassList_listParser( inputClasses );

    const classes = [
        ...defaultList,
    ];

    if ( !!defaultList?.length && !!inputList?.length ) {
        classes.push( { '||': !!defaultList?.length && !!inputList?.length } );
    }

    classes.push( ...inputList );

    return classes;
}