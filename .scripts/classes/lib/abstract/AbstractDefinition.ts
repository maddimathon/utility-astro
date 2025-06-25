/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type {
    Objects,
} from '@maddimathon/utility-typescript/types';

import { arrayUnique } from '@maddimathon/utility-typescript/functions';

import {
    JSONOutput as TypeDocJson,
    Models as TypeDocModels,
} from 'typedoc';

import { PageSection } from '../PageSection.js';

/**
 * The basic class for any type of code definition, whether it's a full page or
 * a section of it.
 */
export abstract class AbstractDefinition implements Objects.Classify<AbstractDefinition.Class> {

    public static _newKeys: string[] = [];

    public static _newModifierTags: string[] = [];

    protected processedInputKeys: string[] | undefined = [];

    /**
     * A list of call signatures attached to this declaration.
     *
     * TypeDoc creates one declaration per function that may contain one or
     * more signature reflections.
     */
    protected signatures?: TypeDocJson.SignatureReflection[];

    // inherited & documented in AbstractDefinition.Class
    public blockTags: {
        [ key: `@${ string }` ]: TypeDocJson.CommentDisplayPart[][];
    } = {};
    public children: AbstractDefinition.Class[ 'children' ] | undefined;
    public flags: AbstractDefinition.Class[ 'flags' ];
    public id: AbstractDefinition.Class[ 'id' ];
    public intro: ( TypeDocJson.CommentDisplayPart | PageSection )[] = [];
    public kind: AbstractDefinition.Class[ 'kind' ];
    public label: AbstractDefinition.Class[ 'label' ];
    public modifierTags: `@${ string }`[] = [];
    public name: AbstractDefinition.Class[ 'name' ];
    public sources: AbstractDefinition.Class[ 'sources' ];

    public constructor (
        protected input: TypeDocJson.DeclarationReflection,
    ) {

        this.flags = this.input.flags;
        this.id = this.input.id;
        this.name = this.input.name;

        this.children = this.input.children?.map( _child => _child.id );

        this.kind = this.parseKind();

        if ( this.input.comment ) {
            this.processComment( this.input.comment );
        }

        if ( this.input.signatures ) {
            this.signatures = this.input.signatures;
        }

        if ( this.input.sources ) {
            this.sources = this.input.sources;
        }

        // checking for any unprocessed prop keys
        for ( const _key in this.input ) {

            // continues
            if ( this.processedInputKeys?.includes( _key ) ) {
                continue;
            }

            switch ( _key ) {

                // to ignore on purpose
                case 'variant':
                    break;

                // handled here
                case 'children':
                case 'comment':
                case 'flags':
                case 'id':
                case 'kind':
                case 'name':
                case 'signatures':
                case 'sources':
                    break;

                default:
                    if ( !AbstractDefinition._newKeys.includes( _key ) ) {
                        console.log( 'NEW page key not yet supported: ' + _key );
                        AbstractDefinition._newKeys.push( _key );
                    }
                    break;
            }
        }
    }


    /**
     * Compile the code block to display this type in the header.
     */
    protected abstract headerType(): string;

    /**
     * Returns the kind string. Does not update any properties.
     */
    protected parseKind(): AbstractDefinition.Export[ 'kind' ] {

        switch ( this.input.kind ) {

            case TypeDocModels.ReflectionKind.Accessor:
                return 'Accessor';

            case TypeDocModels.ReflectionKind.CallSignature:
                return 'CallSignature';

            case TypeDocModels.ReflectionKind.Class:
                return 'Class';

            case TypeDocModels.ReflectionKind.Constructor:
                return 'Constructor';

            case TypeDocModels.ReflectionKind.ConstructorSignature:
                return 'ConstructorSignature';

            case TypeDocModels.ReflectionKind.Document:
                return 'Document';

            case TypeDocModels.ReflectionKind.Enum:
                return 'Enum';

            case TypeDocModels.ReflectionKind.EnumMember:
                return 'EnumMember';

            case TypeDocModels.ReflectionKind.Function:
                return 'Function';

            case TypeDocModels.ReflectionKind.GetSignature:
                return 'GetSignature';

            case TypeDocModels.ReflectionKind.IndexSignature:
                return 'IndexSignature';

            case TypeDocModels.ReflectionKind.Interface:
                return 'Interface';

            case TypeDocModels.ReflectionKind.Method:
                return 'Method';

            case TypeDocModels.ReflectionKind.Module:
                return 'Module';

            case TypeDocModels.ReflectionKind.Namespace:
                return 'Namespace';

            case TypeDocModels.ReflectionKind.Parameter:
                return 'Parameter';

            case TypeDocModels.ReflectionKind.Project:
                return 'Project';

            case TypeDocModels.ReflectionKind.Property:
                return 'Property';

            case TypeDocModels.ReflectionKind.Reference:
                return 'Reference';

            case TypeDocModels.ReflectionKind.SetSignature:
                return 'SetSignature';

            case TypeDocModels.ReflectionKind.TypeAlias:
                return 'TypeAlias';

            case TypeDocModels.ReflectionKind.TypeLiteral:
                return 'TypeLiteral';

            case TypeDocModels.ReflectionKind.TypeParameter:
                return 'TypeParameter';

            case TypeDocModels.ReflectionKind.Variable:
                return 'Variable';

            default:
                return this.input.kind;
        }
    }

    /**
     * Takes the input comment and updates properties accordingly.
     *
     * **This overwrites anything previously there and is only meant to be used
     * in the constructor.**
     */
    protected processComment( comment: TypeDocJson.Comment ): void {

        this.intro = comment.summary;
        this.label = comment.label;

        if ( comment.blockTags ) {

            for ( const _tag of comment.blockTags ) {

                const _tagString = _tag.tag;

                if (
                    !Array.isArray( this.blockTags[ _tagString ] )
                    || !this.blockTags[ _tagString ]
                ) {
                    this.blockTags[ _tagString ] = [];
                }

                this.blockTags[ _tagString ].push( _tag.content );
            }
        }

        if ( comment.modifierTags ) {

            for ( const _tag of comment.modifierTags ) {
                this.modifierTags.push( _tag );

                switch ( _tag ) {

                    case '@experimental':
                        this.flags.isExperimental = true;
                        break;

                    default:
                        if ( !AbstractDefinition._newModifierTags.includes( _tag ) ) {
                            console.log( 'NEW modifier tag not yet supported: ' + _tag );
                            AbstractDefinition._newModifierTags.push( _tag );
                        }
                        break;
                }
            }
        }
    }

    /**
     * Unique-ifies applicable properties in preparation for export.
     */
    protected makeUnique() {

        this.modifierTags = arrayUnique( this.modifierTags );

        if ( this.children ) {
            this.children = arrayUnique( this.children );
        }
    }

    public toJSON(): AbstractDefinition.Export {
        this.makeUnique();

        const exp: Objects.Classify<AbstractDefinition.Export> = {
            toJSON_fn: 'true - ' + this.constructor.name,

            id: this.id.toString(),
            name: this.name,
            kind: this.kind,

            flags: this.flags,

            intro: this.intro,

            markdown: {
                headerType: this.headerType(),
            },

            // optional props
            blockTags: this.blockTags,
            children: this.children,
            label: this.label,
            modifierTags: this.modifierTags,
            sources: this.sources,
        };

        return exp;
    }
}

export namespace AbstractDefinition {

    export interface Class {

        /**
         * Convinient formatting flags.
         */
        flags: Flags;

        /**
         * Unique typedoc id number.
         */
        id: number;

        /**
         * This text is below the initial title heading and type declaration,
         * but above any children type definition sections.
         */
        intro: (
            | TypeDocJson.CommentDisplayPart
            | PageSection
        )[];

        /**
         * The translated typedoc kind for this page.
         */
        kind: AbstractDefinition.Kind;

        /**
         * The name of the item represented on this page. Used for the title.
         */
        name: string;

        /**
         * TypeDoc id numbers of children items of this page.
         */
        children?: number[];

        /**
         * Label associated with this reflection, if any
         * (https://tsdoc.org/pages/tags/label/).
         */
        label?: string;

        /**
         * Block tags in the doc comment.
         */
        blockTags?: {
            [ key: `@${ string }` ]: TypeDocJson.CommentDisplayPart[][];
        };

        /**
         * Modifier tags in the doc comment.
         */
        modifierTags?: `@${ string }`[];

        /**
         * Paths to files where this type is defined.
         */
        sources?: TypeDocJson.SourceReference[];
    }

    export interface Export extends Omit<Class, "id"> {
        toJSON_fn?: string;

        /**
         * Unique typedoc id number.
         */
        id: string;

        /**
         * Pre-formatted markdown strings.
         */
        markdown: {

            /**
             * This is the codeblock to display the type summary information
             * below the heading.
             */
            headerType: string;
        };
    }

    export interface Flags extends TypeDocJson.ReflectionFlags {
        isExperimental?: boolean;
    }

    export type Kind =
        | number
        | "Accessor"
        | "CallSignature"
        | "Class"
        | "Constructor"
        | "ConstructorSignature"
        | "Document"
        | "Enum"
        | "EnumMember"
        | "Function"
        | "GetSignature"
        | "IndexSignature"
        | "Interface"
        | "Method"
        | "Module"
        | "Namespace"
        | "Parameter"
        | "Project"
        | "Property"
        | "Reference"
        | "SetSignature"
        | "TypeAlias"
        | "TypeLiteral"
        | "TypeParameter"
        | "Variable";

    export type Kind_Num = number;
}