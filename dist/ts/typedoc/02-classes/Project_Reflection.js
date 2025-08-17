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
    reflect;
    hasOwnPage;
    data;
    fullName;
    kind;
    name;
    splitName;
    typeDocId;
    blockTags;
    flags;
    modifierTags;
    parent;
    constructor(reflect, hasOwnPage) {
        this.reflect = reflect;
        this.hasOwnPage = hasOwnPage;
        this.data = this.reflect.data;
        this.fullName = this.reflect.fullName;
        this.kind = this.reflect.kind;
        this.name = this.reflect.name;
        this.splitName = this.reflect.splitName;
        this.typeDocId = this.reflect.typeDocId;
        this.blockTags = this.reflect.blockTags;
        this.flags = this.reflect.flags;
        this.modifierTags = this.reflect.modifierTags;
        this.parent = this.reflect.parent;
    }
    /**
     * Creates a cleaner output for conversion.
     *
     * @since 0.1.0-alpha.draft
     */
    toJSON() {
        const blockTags = isObjectEmpty(this.blockTags) ? undefined : this.blockTags;
        const data = isObjectEmpty(this.data) ? undefined : this.data;
        const flags = isObjectEmpty(this.flags) ? undefined : this.flags;
        const modifierTags = isObjectEmpty(this.modifierTags) ? undefined : this.modifierTags;
        return {
            typeDocId: this.typeDocId,
            name: this.name,
            fullName: this.fullName,
            splitName: this.splitName,
            kind: this.kind,
            parent: this.parent,
            flags,
            hasOwnPage: this.hasOwnPage,
            blockTags,
            data,
            modifierTags,
        };
    }
}
(function (Project_Reflection) {
    function make(reflect, hasOwnPage) {
        const { kind } = reflect;
        switch (kind) {
            case 'Accessor':
            case 'Constructor':
            case 'Function':
            case 'GetSignature':
            case 'Method':
            case 'SetSignature':
                return new Project_Reflection.Function(reflect, hasOwnPage);
            case 'Class':
                return new Project_Reflection.Class(reflect, hasOwnPage);
            case 'Document':
                return new Project_Reflection.Plain(reflect, hasOwnPage);
            case 'Module':
                return new Project_Reflection.Module(reflect, hasOwnPage);
            case 'Namespace':
                return new Project_Reflection.Namespace(reflect, hasOwnPage);
            case 'Interface':
            case 'TypeAlias':
            case 'TypeLiteral':
            case 'TypeParameter':
                return new Project_Reflection.Type(reflect, hasOwnPage);
            case 'Enum':
            case 'EnumMember':
            case 'Property':
            case 'Variable':
                return new Project_Reflection.Value(reflect, hasOwnPage);
            case 'CallSignature':
            case 'ConstructorSignature':
            case 'IndexSignature':
            case 'Parameter':
            case 'Project':
            case 'Reference':
            default:
                return new Project_Reflection.Unknown(reflect, hasOwnPage);
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