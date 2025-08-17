/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
import { escapeHTML } from 'astro/runtime/server/escape.js';
import { Schemata, } from '../00-types/index.js';
import { sortReflections, } from '../01-functions/index.js';
import { Project_Reflection } from './Project_Reflection.js';
/**
 * Constructs a hierarchical reference of all the given reflections.
 */
export class Project_Tree {
    input;
    tree;
    pages;
    reflections;
    topLevelPages;
    static toNestedList(tree, linked) {
        return tree.map((item) => {
            let html = escapeHTML(item.page.main.reflect.name);
            let href = linked ? item.page.customSlug : undefined;
            // returns
            if (item.children?.length) {
                return {
                    html,
                    href,
                    children: Project_Tree.toNestedList(item.children, linked),
                };
            }
            return { html, href };
        });
    }
    static sortTree(a, b) {
        return sortReflections(a.page.main.reflect, b.page.main.reflect);
    }
    constructor(input) {
        this.input = input;
        const pages = {};
        const reflections = {};
        /*
         * Create all reflection objects.
         */
        for (const t_reflectionID of Object.keys(input.reflections)) {
            const reflectionID = Number(t_reflectionID);
            // continues
            if (!input.reflections[reflectionID]) {
                continue;
            }
            reflections[reflectionID] = new Project_Tree.Reflection(input.reflections[reflectionID]);
        }
        this.reflections = reflections;
        /*
         * Create all page objects.
         */
        for (const pageID of input.reflectionGroups.hasOwnPage) {
            // continues
            if (!this.reflections[pageID]) {
                continue;
            }
            // throws
            if (!input.raw[pageID]) {
                throw new TypeError('pageID not found in tree raw inputs', {
                    cause: {
                        pageID,
                    },
                });
            }
            pages[pageID] = new Project_Tree.Page({
                customSlug: input.raw[pageID].data.customSlug,
                pageSections: input.raw[pageID].data.pageSections ?? [],
                reflect: this.reflections[pageID].reflect,
            });
        }
        this.pages = pages;
        /*
         * Create the tree.
         */
        const tree = [];
        this.topLevelPages = Object.values(this.pages)
            .filter(_page => !_page.parent)
            .sort((a, b) => sortReflections(a.main.reflect, b.main.reflect));
        for (const page of this.topLevelPages) {
            tree.push(this.buildTree(page.main.reflect.typeDocId));
        }
        this.tree = tree.sort(Project_Tree.sortTree);
    }
    buildTree(pageID) {
        // throws
        if (!this.pages[pageID]) {
            throw new TypeError('pageID not found in tree pages', {
                cause: {
                    pageID,
                },
            });
        }
        const children = [];
        if (this.input.reflectionGroups.childrenByParent[pageID]) {
            for (const _childID of this.input.reflectionGroups.childrenByParent[pageID]) {
                // throws
                if (!this.reflections[_childID]) {
                    throw new TypeError('_childID not found in tree reflections', {
                        cause: {
                            _childID,
                            pageID,
                        },
                    });
                }
                // continues
                if (!this.reflections[_childID].reflect.hasOwnPage) {
                    continue;
                }
                // throws
                if (!this.pages[_childID]) {
                    throw new TypeError('_childID not found in tree pages', {
                        cause: {
                            _childID,
                            pageID,
                        },
                    });
                }
                children.push(this.buildTree(_childID));
            }
        }
        const tree = {
            page: this.pages[pageID],
            children: Object.values(children).length
                ? children.sort(Project_Tree.sortTree)
                : undefined,
        };
        return tree;
    }
    /**
     * Creates a cleaner output for conversion.
     *
     * @since 0.1.0-alpha.draft
     */
    toJSON() {
        return {
            tree: this.tree,
            topLevelPages: this.topLevelPages,
        };
    }
}
(function (Project_Tree) {
    class Page {
        parent;
        members;
        customSlug;
        main;
        pageSections;
        constructor(page, parent, members) {
            this.parent = parent;
            this.members = members;
            this.customSlug = page.customSlug;
            this.main = new Project_Tree.Reflection(page.reflect);
            this.pageSections = page.pageSections;
        }
    }
    Project_Tree.Page = Page;
    class Reflection {
        reflect;
        constructor(reflect) {
            this.reflect = reflect;
        }
    }
    Project_Tree.Reflection = Reflection;
})(Project_Tree || (Project_Tree = {}));
//# sourceMappingURL=Project_Tree.js.map