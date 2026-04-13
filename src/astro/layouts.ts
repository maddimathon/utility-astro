/**
 * Exports all the astro layouts and their types.
 * 
 * @module layouts
 * @category Exports
 * 
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
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