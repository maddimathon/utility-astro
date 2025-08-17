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
import { Schemata } from '../00-types/index.js';
import { Project_Page } from './Project_Page.js';
import { Project_Reflection } from './Project_Reflection.js';
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
     * All reflections in the project, indexed by their typeDocId property
     * value.
     */
    reflections = {};
    /**
     * Project reflections sorted into groups and indexed by their typeDocId
     * property value.
     */
    reflectionGroups;
    constructor(collection) {
        this.collection = collection;
        const reflectionGroups = {
            hasChild: [],
            hasParent: [],
            hasOwnPage: [],
        };
        for (const item of this.collection) {
            const _reflect = item.data.reflect;
            const _typeDocId = _reflect.typeDocId;
            // throws
            if (_typeDocId in this.reflections) {
                throw new TypeError('Duplicate TypeDocIDs found in collection', {
                    cause: {
                        existing: this.reflections[_typeDocId],
                        duplicate: item,
                    },
                });
            }
            this.reflections[_typeDocId] = Project_Reflection.make(_reflect, !!item.filePath);
            if (this.reflections[_typeDocId].parent) {
                reflectionGroups.hasParent.push(_typeDocId);
                reflectionGroups.hasChild.push(this.reflections[_typeDocId].parent);
            }
            if (this.reflections[_typeDocId].hasOwnPage) {
                reflectionGroups.hasOwnPage.push(_typeDocId);
                this.pages[_typeDocId] = new Project_Page({
                    customSlug: item.data.customSlug,
                    pageSections: item.data.pageSections,
                    reflect: this.reflections[_typeDocId],
                });
            }
        }
        this.reflectionGroups = {
            hasChild: arrayUnique(reflectionGroups.hasChild),
            hasParent: arrayUnique(reflectionGroups.hasParent),
            hasOwnPage: arrayUnique(reflectionGroups.hasOwnPage),
        };
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