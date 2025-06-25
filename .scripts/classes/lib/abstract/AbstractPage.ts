/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

// import {
//     JSONOutput as TypeDocJson,
//     // Models as TypeDocModels,
// } from 'typedoc';

import { AbstractDefinition } from './AbstractDefinition.js';

export abstract class AbstractPage<
    T_Definition extends AbstractDefinition = AbstractDefinition,
> {

    public constructor (
        public def: T_Definition,
    ) {
    }

    public toJSON(): AbstractPage.Export {

        const exp: AbstractPage.Export = this.def.toJSON();

        return exp;
    }
}

export namespace AbstractPage {

    export interface Export extends AbstractDefinition.Export {
    }
}