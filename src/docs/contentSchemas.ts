/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import { z } from 'astro:content';

const AbstractDefinition_Kind = z.union( [
    z.literal( 'Accessor' ),
    z.literal( 'CallSignature' ),
    z.literal( 'Class' ),
    z.literal( 'Constructor' ),
    z.literal( 'ConstructorSignature' ),
    z.literal( 'Document' ),
    z.literal( 'Enum' ),
    z.literal( 'EnumMember' ),
    z.literal( 'Function' ),
    z.literal( 'GetSignature' ),
    z.literal( 'IndexSignature' ),
    z.literal( 'Interface' ),
    z.literal( 'Method' ),
    z.literal( 'Module' ),
    z.literal( 'Namespace' ),
    z.literal( 'Parameter' ),
    z.literal( 'Project' ),
    z.literal( 'Property' ),
    z.literal( 'Reference' ),
    z.literal( 'SetSignature' ),
    z.literal( 'TypeAlias' ),
    z.literal( 'TypeLiteral' ),
    z.literal( 'TypeParameter' ),
    z.literal( 'Variable' ),
] );

const PageSection = z.object( {} );

const TypeDocJson_InlineTagDisplayPart = z.object( {

    kind: z.union( [ z.literal( 'code' ), z.literal( 'text' ) ] ),
    tag: z.string(),
    text: z.string(),

    target: z.union( [
        z.number(),
        z.object( { // ReflectionSymbolId
            packageName: z.string(),
            packagePath: z.string(),
            qualifiedName: z.string(),
        } ),
        z.string(),
    ] ).optional(),

    tsLinkText: z.string().optional(),
} );

const TypeDocJson_RelativeLinkDisplayPart = z.object( {
    kind: z.literal( 'relative-link' ),
    text: z.string(),
    target: z.number().optional(),
    targetAnchor: z.string().optional(),
} );

const TypeDocJson_SourceReference = z.object( {
    character: z.number(),
    fileName: z.string(),
    line: z.number(),
    url: z.string().optional(),
} );

const CommentDisplayPart = z.union( [

    // simple CommentDisplayPart options
    z.object( {
        kind: z.union( [ z.literal( 'code' ), z.literal( 'text' ) ] ),
        text: z.string(),
    } ),

    TypeDocJson_InlineTagDisplayPart,
    TypeDocJson_RelativeLinkDisplayPart,
] );

const AbstractDefinition = z.object( {

    flags: z.object( {
        isAbstract: z.boolean().optional(),
        isConst: z.boolean().optional(),
        isExperimental: z.boolean().optional(),
        isExternal: z.boolean().optional(),
        isInherited: z.boolean().optional(),
        isOptional: z.boolean().optional(),
        isPrivate: z.boolean().optional(),
        isProtected: z.boolean().optional(),
        isPublic: z.boolean().optional(),
        isReadonly: z.boolean().optional(),
        isRest: z.boolean().optional(),
        isStatic: z.boolean().optional(),
    } ),

    id: z.string(),

    intro: z.array( z.union( [
        CommentDisplayPart,
        PageSection,
    ] ) ),

    kind: AbstractDefinition_Kind,

    name: z.string(),


    /* OPTIONAL */

    children: z.array( z.number() ).optional(),

    label: z.string().optional(),

    blockTags: z.record(
        z.string(),
        z.array( z.array( CommentDisplayPart ) ),
    ).optional(),

    modifierTags: z.array( z.string() ).optional(),

    sources: z.array( TypeDocJson_SourceReference ).optional(),
} );

export default {

    // AbstractDefinition,

    // CommentDisplayPart,

    // PageSection,

    // TypeDocJson: {
    //     TypeDocJson_InlineTagDisplayPart,
    //     TypeDocJson_RelativeLinkDisplayPart,
    //     TypeDocJson_SourceReference,
    // },

    PageUnion: AbstractDefinition,
};