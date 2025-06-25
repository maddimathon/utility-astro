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
    Models as TypeDocModels,
} from 'typedoc';

import { AbstractDefinition } from '../abstract/AbstractDefinition.js';

export class FunctionDefinition extends AbstractDefinition {

    protected override processedInputKeys = [];

    protected functionSignature: TypeDocJson.SignatureReflection | undefined;

    public constructor (
        protected kindNum: FunctionDefinition.KindNum,
        input: TypeDocJson.DeclarationReflection,
    ) {
        super( input );

        this.functionSignature = this.signatures?.filter(
            ( _sig ) => _sig.name === this.name && _sig.variant === 'signature'
        )[ 0 ];

        const functionComment = this.functionSignature?.comment ?? this.input?.comment;

        if ( functionComment ) {
            this.processComment( functionComment );
        }
    }

    protected headerType(): string {
        return 'unimplemented';
    }
}

export namespace FunctionDefinition {

    export type Kind =
        | "Accessor"
        | "CallSignature"
        | "Constructor"
        | "ConstructorSignature"
        | "Function"
        | "GetSignature"
        | "SetSignature";

    export type KindNum =
        | TypeDocModels.ReflectionKind.Accessor
        | TypeDocModels.ReflectionKind.CallSignature
        | TypeDocModels.ReflectionKind.Constructor
        | TypeDocModels.ReflectionKind.ConstructorSignature
        | TypeDocModels.ReflectionKind.Function
        | TypeDocModels.ReflectionKind.GetSignature
        | TypeDocModels.ReflectionKind.SetSignature;

    export interface Export extends AbstractDefinition.Export {
    }
}