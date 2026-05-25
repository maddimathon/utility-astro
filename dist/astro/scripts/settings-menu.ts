/**
 * Script to initialize settings menus — to be imported by components, layouts,
 * etc.
 *
 * @since 0.1.0-beta.0.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */

import {
    SCRIPTS_SETTINGSMENU,
} from 'astro:env/client';

import { SettingsMenu } from '../../ts/classes/SettingsMenu.js';

if ( SCRIPTS_SETTINGSMENU ) {

    const settingsMenus: NodeListOf<HTMLElement> = document.querySelectorAll(
        '[data-settings-menu]',
    );

    const scrollBehaviour =
        ( window.getComputedStyle( document.documentElement ).scrollBehavior as
            | ScrollBehavior
            | undefined ) || undefined;

    /*
     * Setting up each found menu.
     */
    await SettingsMenu.init( settingsMenus, scrollBehaviour );
}