/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import {
    JSONOutput as TypeDocJson,
    // Models as TypeDocModels,
} from 'typedoc';

import { AbstractPage } from '../abstract/AbstractPage.js';
import { FunctionDefinition } from '../definitions/FunctionDefinition.js';

export class FunctionPage extends AbstractPage<FunctionDefinition> {

    public constructor (
        kindNum: FunctionDefinition.KindNum,
        input: TypeDocJson.DeclarationReflection,
    ) {
        super( new FunctionDefinition( kindNum, input ) );
    }
}

export namespace FunctionPage {

    export interface Export extends AbstractPage.Export {
    }
}