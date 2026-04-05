/**
 * Exports all the astro components and their types.
 * 
 * @module components
 * 
 * @since 0.1.0-beta.0.draft
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */

import Content from './layouts/Content.astro';
export type * from './layouts/Content.astro';

import Main from './layouts/Main.astro';
export type * from './layouts/Main.astro';

import Page from './layouts/Page.astro';
export type * from './layouts/Page.astro';

import Sidebar from './layouts/Sidebar.astro';
export type * from './layouts/Sidebar.astro';

export {
    Content,
    Main,
    Page,
    Sidebar,
};