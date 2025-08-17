/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
// import type { Objects } from '@maddimathon/utility-typescript/types';
import { arrayUnique } from '@maddimathon/utility-typescript/functions';
import { sortReflections } from '../01-functions/index.js';
import { Project_Page } from './Project_Page.js';
import { Project_Reflection } from './Project_Reflection.js';
import { Project_Tree } from './Project_Tree.js';
/**
 * A class used to represent all the outputs documented by TypeDoc in a given
 * project.
 *
 * @since 0.1.0-alpha.draft
 */
export class Project {
    collection;
    /**
     * All pages in the project, indexed by their typeDocId property value.
     */
    pages = {};
    /**
     * Raw inputs, indexed by their typeDocId property value.
     */
    raw = {};
    /**
     * All reflections in the project, indexed by their typeDocId property
     * value.
     */
    reflections = {};
    /**
     * Hierarchical representation of reflections in the project.
     */
    tree;
    /**
     * Project reflections sorted into groups and indexed by their typeDocId
     * property value.
     */
    reflectionGroups;
    constructor(collection) {
        this.collection = collection;
        this.collection.sort((a, b) => sortReflections(a.data.reflect, b.data.reflect));
        const reflectionGroups = {
            hasChild: [],
            hasParent: [],
            hasOwnPage: [],
            childrenByParent: {},
        };
        for (const item of this.collection) {
            const _reflect = item.data.reflect;
            const _typeDocId = _reflect.typeDocId;
            // throws
            if (_typeDocId in this.raw || _typeDocId in this.reflections) {
                throw new TypeError('Duplicate TypeDocIDs found in collection', {
                    cause: {
                        existing: this.reflections[_typeDocId],
                        duplicate: item,
                    },
                });
            }
            this.raw[_typeDocId] = item;
            this.reflections[_typeDocId] = Project_Reflection.make(_reflect, !!item.filePath);
            if (this.reflections[_typeDocId].parent) {
                const _parentID = this.reflections[_typeDocId].parent;
                reflectionGroups.hasParent.push(_typeDocId);
                reflectionGroups.hasChild.push(_parentID);
                if (!reflectionGroups.childrenByParent[_parentID]) {
                    reflectionGroups.childrenByParent[_parentID] = [];
                }
                reflectionGroups.childrenByParent[_parentID].push(_typeDocId);
            }
            if (this.reflections[_typeDocId].hasOwnPage) {
                reflectionGroups.hasOwnPage.push(_typeDocId);
            }
        }
        this.reflectionGroups = {
            all: arrayUnique(Object.values(this.reflections).map(_ref => _ref.typeDocId)),
            hasChild: arrayUnique(reflectionGroups.hasChild),
            hasParent: arrayUnique(reflectionGroups.hasParent),
            hasOwnPage: arrayUnique(reflectionGroups.hasOwnPage),
            childrenByParent: reflectionGroups.childrenByParent,
        };
        for (const typeDocID of this.reflectionGroups.hasOwnPage) {
            const item = this.raw[typeDocID];
            // continues
            if (!item) {
                continue;
            }
            this.pages[typeDocID] = new Project_Page(this.reflections[typeDocID], item);
        }
        this.tree = new Project_Tree({
            raw: this.raw,
            reflections: this.reflections,
            reflectionGroups: this.reflectionGroups,
        });
    }
    /**
     * Creates a cleaner output for conversion.
     *
     * @since 0.1.0-alpha.draft
     */
    toJSON() {
        // type Return = Objects.Classify<Omit<
        //     Project<T_CollectionItem, T_CollectionName>,
        //     "toJSON"
        // >>;
        // const reflections: Partial<typeof this.reflections> = {};
        // const pages: Partial<typeof this.pages> = {};
        return {
            reflections: this.reflections,
            reflectionGroups: this.reflectionGroups,
            pages: this.pages,
        };
    }
}
//# sourceMappingURL=Project.js.map