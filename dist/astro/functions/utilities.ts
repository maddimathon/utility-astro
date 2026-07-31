/**
 * @since 0.1.0-beta.0.draft
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */

import type { ArrayItem } from '@maddimathon/utility-typescript/types';
import type { ClassList, ClassListItem } from '../../ts/types/index.js';

/**
 * @since 0.1.0-beta.0.draft
 */
function flattenClassList_single(
    classListItem: undefined | Exclude<ClassListItem, any[]> | ArrayItem<Extract<ClassListItem, any[]>>,
): string {
    // returns
    if ( !classListItem ) {
        return '';
    }

    if ( typeof classListItem === 'string' ) {
        return ' ' + classListItem;
    }

    return Object.entries( classListItem ).map(
        ( [ key, value ] ) => value ? key : ''
    ).filter( item => !!item ).join( ' ' );
}

/**
 * @since 0.1.0-beta.0.draft
 */
export function flattenClassList( classList: ClassList ): string {

    // returns
    if ( !Array.isArray( classList ) ) {
        return flattenClassList_single( classList );
    }

    let classes = '';

    for ( const item of classList ) {
        // continues
        if ( !item ) {
            continue;
        }

        // continues
        if ( !Array.isArray( item ) ) {
            classes += flattenClassList_single( item );
            continue;
        }

        classes += item.map( flattenClassList_single ).join( '' );
    }

    return classes.trim();
}

/**
 * @since 0.1.0-beta.0.draft
 */
function makeClassList_listParser( list: undefined | ClassList ) {
    return (
        Array.isArray( list ) ? list.flat() : [ list ]
    ).filter(
        item => !!item
    );
}

/**
 * @since 0.1.0-beta.0.draft
 */
export function makeClassList(
    defaultClasses: ClassList,
    inputClasses: undefined | ClassList,
): ClassList {

    const defaultList = makeClassList_listParser( defaultClasses );
    const inputList = makeClassList_listParser( inputClasses );

    return [
        ...defaultList,
        { '||': !!defaultList?.length && !!inputList?.length },
        ...inputList,
    ];
}