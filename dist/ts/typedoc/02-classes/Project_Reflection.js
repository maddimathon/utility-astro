/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import { Schemata, } from '../00-types/index.js';
import { isObjectEmpty } from '@maddimathon/build-utilities/internal';
export class Project_Reflection {
    raw;
    hasOwnPage;
    data;
    fullName;
    kind;
    name;
    sortingIndex;
    splitName;
    typeDocId;
    blockTags;
    flags;
    modifierTags;
    parent;
    constructor(raw, hasOwnPage) {
        this.raw = raw;
        this.hasOwnPage = hasOwnPage;
        this.data = this.raw.data;
        this.fullName = this.raw.fullName;
        this.kind = this.raw.kind;
        this.name = this.raw.name;
        this.sortingIndex = this.raw.sortingIndex;
        this.splitName = this.raw.splitName;
        this.typeDocId = this.raw.typeDocId;
        this.blockTags = this.raw.blockTags;
        this.flags = this.raw.flags;
        this.modifierTags = this.raw.modifierTags;
        this.parent = this.raw.parent;
    }
    /**
     * Creates a cleaner output for conversion.
     *
     * @since 0.1.0-alpha.draft
     */
    toJSON() {
        // const blockTags = isObjectEmpty( this.blockTags ) ? undefined : this.blockTags;
        const data = isObjectEmpty(this.data) ? undefined : this.data;
        const flags = isObjectEmpty(this.flags) ? undefined : this.flags;
        // const modifierTags = isObjectEmpty( this.modifierTags ) ? undefined : this.modifierTags;
        return {
            typeDocId: this.typeDocId,
            name: this.name,
            fullName: this.fullName,
            splitName: this.splitName,
            kind: this.kind,
            parent: this.parent,
            flags,
            hasOwnPage: this.hasOwnPage,
            blockTags: this.blockTags,
            modifierTags: this.modifierTags,
            sortingIndex: this.sortingIndex,
            data,
        };
    }
}
(function (Project_Reflection) {
    function make(raw, hasOwnPage) {
        const { kind } = raw;
        switch (kind) {
            case 'Accessor':
            case 'Constructor':
            case 'Function':
            case 'GetSignature':
            case 'Method':
            case 'SetSignature':
                return new Project_Reflection.Function(raw, hasOwnPage);
            case 'Class':
                return new Project_Reflection.Class(raw, hasOwnPage);
            case 'Document':
                return new Project_Reflection.Plain(raw, hasOwnPage);
            case 'Module':
                return new Project_Reflection.Module(raw, hasOwnPage);
            case 'Namespace':
                return new Project_Reflection.Namespace(raw, hasOwnPage);
            case 'Interface':
            case 'TypeAlias':
            case 'TypeLiteral':
            case 'TypeParameter':
                return new Project_Reflection.Type(raw, hasOwnPage);
            case 'Enum':
            case 'EnumMember':
            case 'Property':
            case 'Variable':
                return new Project_Reflection.Value(raw, hasOwnPage);
            case 'CallSignature':
            case 'ConstructorSignature':
            case 'IndexSignature':
            case 'Parameter':
            case 'Project':
            case 'Reference':
            default:
                return new Project_Reflection.Unknown(raw, hasOwnPage);
        }
    }
    Project_Reflection.make = make;
    ;
    class Class extends Project_Reflection {
    }
    Project_Reflection.Class = Class;
    class Function extends Project_Reflection {
    }
    Project_Reflection.Function = Function;
    class Module extends Project_Reflection {
    }
    Project_Reflection.Module = Module;
    class Namespace extends Project_Reflection {
    }
    Project_Reflection.Namespace = Namespace;
    class Plain extends Project_Reflection {
    }
    Project_Reflection.Plain = Plain;
    class Type extends Project_Reflection {
    }
    Project_Reflection.Type = Type;
    class Unknown extends Project_Reflection {
    }
    Project_Reflection.Unknown = Unknown;
    class Value extends Project_Reflection {
    }
    Project_Reflection.Value = Value;
})(Project_Reflection || (Project_Reflection = {}));
//# sourceMappingURL=Project_Reflection.js.map