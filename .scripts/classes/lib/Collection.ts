/* 
 * @package @maddimathon/utility-astro
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import type { Test } from '@maddimathon/utility-typescript/types';

import {
    JSONOutput as TypeDocJson,
    Models as TypeDocModels,
} from 'typedoc';

import { typeOf } from '@maddimathon/utility-typescript/functions';

import { AbstractDefinition } from './abstract/AbstractDefinition.js';
import { AbstractPage } from './abstract/AbstractPage.js';

import { FunctionPage } from './pages/FunctionPage.js';

export type { TypeDocJson };

/**
 * A class for translating the TypeDoc json output into a json content
 * collection for astro.
 */
export class Collection {

    #newKinds: string[] = [];

    public pages: Collection.Class[ 'pages' ] = {};
    public pagesByKind: Collection.Class[ 'pagesByKind' ] = {};

    public rawPages: Collection.Class[ 'rawPages' ] = {};

    constructor (
        protected input: TypeDocJson.ProjectReflection,
    ) {
        this.input = input;

        if ( this.input.children ) {

            for ( const child of this.input.children ) {
                this.addPage( child );
            }
        }
    }

    protected addPage(
        page: TypeDocJson.DeclarationReflection,
    ) {
        this.rawPages[ page.id ] = page;

        const _pageKeys: string[] = [];

        for ( const _key of Object.keys( page ).sort() as ( keyof typeof page )[] ) {
            _pageKeys.push( _key + ':' + typeOf( page[ _key ] ) );
        }

        let pageKind: string;

        switch ( page.kind ) {

            case TypeDocModels.ReflectionKind.Accessor:
                pageKind = 'Accessor';
                break;

            case TypeDocModels.ReflectionKind.CallSignature:
                pageKind = 'CallSignature';
                break;

            case TypeDocModels.ReflectionKind.Class:
                pageKind = 'Class';
                break;

            case TypeDocModels.ReflectionKind.Constructor:
                pageKind = 'Constructor';
                break;

            case TypeDocModels.ReflectionKind.ConstructorSignature:
                pageKind = 'ConstructorSignature';
                break;

            case TypeDocModels.ReflectionKind.Document:
                pageKind = 'Document';
                break;

            case TypeDocModels.ReflectionKind.Enum:
                pageKind = 'Enum';
                break;

            case TypeDocModels.ReflectionKind.EnumMember:
                pageKind = 'EnumMember';
                break;

            case TypeDocModels.ReflectionKind.Function:
                pageKind = 'Function';
                break;

            case TypeDocModels.ReflectionKind.GetSignature:
                pageKind = 'GetSignature';
                break;

            case TypeDocModels.ReflectionKind.IndexSignature:
                pageKind = 'IndexSignature';
                break;

            case TypeDocModels.ReflectionKind.Interface:
                pageKind = 'Interface';
                break;

            case TypeDocModels.ReflectionKind.Method:
                pageKind = 'Method';
                break;

            case TypeDocModels.ReflectionKind.Module:
                pageKind = 'Module';
                break;

            case TypeDocModels.ReflectionKind.Namespace:
                pageKind = 'Namespace';
                break;

            case TypeDocModels.ReflectionKind.Parameter:
                pageKind = 'Parameter';
                break;

            case TypeDocModels.ReflectionKind.Project:
                pageKind = 'Project';
                break;

            case TypeDocModels.ReflectionKind.Property:
                pageKind = 'Property';
                break;

            case TypeDocModels.ReflectionKind.Reference:
                pageKind = 'Reference';
                break;

            case TypeDocModels.ReflectionKind.SetSignature:
                pageKind = 'SetSignature';
                break;

            case TypeDocModels.ReflectionKind.TypeAlias:
                pageKind = 'TypeAlias';
                break;

            case TypeDocModels.ReflectionKind.TypeLiteral:
                pageKind = 'TypeLiteral';
                break;

            case TypeDocModels.ReflectionKind.TypeParameter:
                pageKind = 'TypeParameter';
                break;

            case TypeDocModels.ReflectionKind.Variable:
                pageKind = 'Variable';
                break;

            default:
                // this should be unreachable
                type _NeverTest = Test.Expect<Test.Exactly<typeof page.kind, never>>;
                pageKind = String( page.kind as _NeverTest );
                break;
        }

        // returns - since this shouldn't be a proper page
        if ( page.variant !== 'declaration' ) {
            return;
        }

        // enforces a unique page id key for the this.pages object
        let _pageId = page.id.toString();
        let i = 1;

        while ( this.pages[ _pageId ] ) {

            _pageId = i > 1
                ? _pageId.replace( /(-\d+)?$/gi, `-${ i }` )
                : _pageId + '-' + i.toString();

            i++;
        }

        // constructs the right page object and logs any unsupported
        switch ( page.kind ) {

            // case TypeDocModels.ReflectionKind.Accessor:
            // case TypeDocModels.ReflectionKind.CallSignature:
            // case TypeDocModels.ReflectionKind.Constructor:
            // case TypeDocModels.ReflectionKind.ConstructorSignature:
            case TypeDocModels.ReflectionKind.Function:
                // case TypeDocModels.ReflectionKind.GetSignature:
                // case TypeDocModels.ReflectionKind.SetSignature:
                this.pages[ _pageId ] = new FunctionPage( page.kind, page );
                break;

            default:
                if ( !this.#newKinds.includes( pageKind ) ) {
                    console.log( 'NEW top-level TypeDoc kind not yet supported: ' + pageKind );
                    this.#newKinds.push( pageKind );
                }
                break;
        }

        // now add to compilation props
        const currentPage = this.pages[ _pageId ];

        if ( currentPage ) {

            const _pageKind = currentPage.def.kind;

            if ( !this.pagesByKind[ _pageKind ] ) {
                this.pagesByKind[ _pageKind ] = {};
            }

            this.pagesByKind[ _pageKind ][ _pageId ] = currentPage;
        }
    }

    toJSON(): Collection.Export {

        const exp: Collection.Export = {

            // UPGRADE - fix this typing
            pages: JSON.parse( JSON.stringify( this.pages ) ) as Collection.Export[ 'pages' ],
            pagesByKind: JSON.parse( JSON.stringify( this.pagesByKind ) ) as Collection.Export[ 'pagesByKind' ],

            debug: undefined,

            rawPages: this.rawPages,
        };

        if (
            this.#newKinds.length
            | AbstractDefinition._newKeys.length
            | AbstractDefinition._newModifierTags.length
        ) {
            exp.debug = {};

            if ( this.#newKinds.length ) {
                exp.debug.newKinds = this.#newKinds;
            }

            if ( AbstractDefinition._newKeys.length ) {
                exp.debug.newPageKeys = AbstractDefinition._newKeys;
            }

            if ( AbstractDefinition._newModifierTags.length ) {
                exp.debug.newModifierTags = AbstractDefinition._newModifierTags;
            }
        }

        return exp;
    }
}

export namespace Collection {

    export interface TestPage {
        id: number;
        name: string;
        kind: AbstractDefinition.Kind;
    }

    export interface PageDebug {

        id: number;
        kind: string;
        name: string;
        parent: number | undefined;
        variant: string;

        [ key: string ]: number | string | undefined | PageDebug | object;
    }

    export interface Class {

        /**
         * If false, the kind is unsupported, indexed by id.
         */
        pages: {
            [ key: string ]: AbstractPage;
        };

        /**
         * Pages sorted by kind and indexed by id.
         */
        pagesByKind: {
            [ K in AbstractDefinition.Kind ]?: {
                [ key: string ]: AbstractPage;
            };
        };

        /**
         * Raw page data, indexed by id.
         */
        rawPages: {
            [ key: string ]: TypeDocJson.DeclarationReflection;
        };

        debug?: {
            [ key: string ]: any;
        };
    }

    export interface Export extends Omit<Class, "pages" | "pagesByKind" | "rawPages"> {

        pages: {
            [ key: string ]: AbstractPage.Export;
        };

        pagesByKind: {
            [ K in AbstractDefinition.Kind ]?: {
                [ key: string ]: AbstractPage.Export;
            };
        };

        rawPages: {
            [ key: string ]: object;
        };
    }
}