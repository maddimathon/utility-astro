/**
 * @since 0.1.0-beta.0.draft
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */

import type { ClassList } from '../../ts/types/index.js';

function makeClassList_listParser( list: undefined | ClassList ) {
    return (
        Array.isArray( list ) ? list.flat() : [ list ]
    ).filter(
        item => !!item
    );
}

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