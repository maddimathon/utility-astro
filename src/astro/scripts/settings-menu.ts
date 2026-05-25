/**
 * Script to initialize settings menus — to be imported by components, layouts,
 * etc.
 *
 * @since ___PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
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