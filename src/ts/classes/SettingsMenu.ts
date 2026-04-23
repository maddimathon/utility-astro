/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { Classify } from '@maddimathon/utility-typescript/types';

import { JsCookie } from './JsCookie.js';

/**
 * Sets up and manages the SettingsMenu component's js.
 * 
 * @since 0.1.0-alpha
 */
export class SettingsMenu {

    /**
     * @since 0.1.0-alpha
     */
    readonly #attributeKeys: string[] = [];

    /**
     * For storing the cookies made to deal with each option.
     * 
     * @since 0.1.0-alpha
     */
    #cookies: { [ key: string ]: JsCookie; } = {};

    /**
     * For storing the default value (if any) for each option.
     * 
     * @since 0.1.0-alpha
     */
    #defaults: { [ key: string ]: string | null; } = {};

    /**
     * @since 0.1.0-alpha
     */
    readonly #inputs: NodeListOf<HTMLInputElement> | null;

    /**
     * @since 0.1.0-alpha
     */
    readonly #path: string;

    /**
     * @since 0.1.0-alpha
     */
    readonly #resetButton: HTMLButtonElement | null;

    /**
     * @since 0.1.0-alpha
     */
    readonly #rootElement: HTMLElement;

    /**
     * @since 0.1.0-alpha
     */
    #timeout: ReturnType<typeof setTimeout> | null = null;

    /**
     * @param menu  The website settings menu wrapper to set up.
     */
    public constructor (
        /**
         * @since ___PKG_VERSION___
         */
        root: HTMLElement,

        /**
         * @since 0.1.0-alpha
         */
        public readonly menu: HTMLElement,

        /**
         * @since 0.1.0-alpha
         */
        selectors?: SettingsMenu.Selectors.Constructor,
    ) {

        this.#rootElement = root;

        this.#inputs = this.menu.querySelectorAll(
            selectors?.inputs || 'input[data-settings-input]'
        );

        this.#path = this.menu.getAttribute(
            selectors?.pathAttr || 'data-settings-path'
        ) || '/';

        this.#resetButton = this.menu.querySelector(
            selectors?.resetButton || '[data-settings-reset]'
        );

        this.resetButtonClicked = this.resetButtonClicked.bind( this );
        this.settingSelected = this.settingSelected.bind( this );
        this.update_allInputs = this.update_allInputs.bind( this );
        this._update_input = this._update_input.bind( this );

        // set values from localStorage if they exist
        Promise.all(
            Array.from( this.#inputs ).map(
                ( input ) => {
                    const attr = input.getAttribute( 'name' );

                    // returns
                    if ( !attr ) {
                        return;
                    }

                    this._setup_attr_key( attr ).then(
                        () => {
                            const value = input.getAttribute( 'value' );

                            // returns
                            if ( !value ) {
                                return;
                            }

                            const current: string | null = window.localStorage.getItem( attr );

                            // returns
                            if ( !current ) {
                                return;
                            }

                            if ( `${ value }` == `${ current }` ) {
                                input.checked = true;
                                this.#rootElement.setAttribute( `data-${ attr }`, current );
                            } else {
                                input.checked = false;
                            }
                        }
                    );
                }
            )
        ).then(
            () => {
                // returns
                if ( !this.#resetButton ) {
                    return;
                }

                /*
                 * Adding change event listener and collecting attribute names.
                 */
                this.update_allInputs();

                this.#inputs?.forEach( ( input ) => {
                    input.addEventListener( 'change', () =>
                        this.settingSelected( input )
                    );
                } );

                /*
                 * Add reset button listener.
                 */
                this.#resetButton.addEventListener(
                    'click',
                    this.resetButtonClicked
                );
            }
        );
    }

    /**
     * Caches attr keys that have been succesfully set up.
     * 
     * @since ___PKG_VERSION___
     */
    #setup_attr_keys: { [ key: string ]: boolean; } = {};

    /**
     * @since 0.1.0-alpha
     * @since ___PKG_VERSION___ — Made async.
     */
    private async _setup_attr_key( attr: string ): Promise<void> {

        // returns
        if ( this.#setup_attr_keys[ attr ] === true ) {
            return;
        }

        let defaultValue: string | null = null;

        switch ( attr ) {
            case 'brightness-mode':
                window
                    .matchMedia( `( prefers-color-scheme: no-preference )` )
                    .addEventListener( 'change', this.update_allInputs );

                [ 'light', 'dark' ].forEach( ( value ) => {
                    if (
                        window.matchMedia(
                            `( prefers-color-scheme: ${ value } )`
                        ).matches
                    ) {
                        defaultValue = value;
                    }
                } );
                break;

            case 'contrast-mode':
                window
                    .matchMedia( `( prefers-contrast: no-preference )` )
                    .addEventListener( 'change', this.update_allInputs );

                defaultValue = 'average';

                if (
                    window.matchMedia( `( forced-colors: active )` ).matches
                    || window.matchMedia( `( prefers-contrast: custom )` ).matches
                ) {
                    defaultValue = 'forced-colors';
                } else if (
                    window.matchMedia( `( prefers-contrast: less )` ).matches
                ) {
                    defaultValue = 'low';
                } else if (
                    window.matchMedia( `( prefers-contrast: more )` ).matches
                ) {
                    defaultValue = 'high';
                }
                break;

            case 'motion':
                window
                    .matchMedia( `( prefers-reduced-motion: reduce )` )
                    .addEventListener( 'change', this.update_allInputs );

                defaultValue = 'reduce';

                if (
                    window.matchMedia(
                        '( prefers-reduced-motion: no-preference )'
                    ).matches
                ) {
                    defaultValue = 'no-preference';
                }
                break;

            default:
                const fieldset = this.menu.querySelector( `[data-settings-menu-custom-setting=${ attr }]` );

                // breaks
                if ( !fieldset ) {
                    break;
                }

                defaultValue = fieldset.getAttribute( 'data-settings-menu-custom-setting-default' );
                break;
        }

        this.#defaults[ attr ] = defaultValue;

        // returns
        if ( this.#attributeKeys.includes( attr ) || this.#cookies[ attr ] ) {
            return;
        }

        this.#attributeKeys.push( attr );

        this.#cookies[ attr ] = new JsCookie( attr, this.#path, null, null, true );

        this.#setup_attr_keys[ attr ] = true;
    }

    /**
     * Triggered by a click lisetener.
     * 
     * @since 0.1.0-alpha
     */
    public resetButtonClicked(): void {
        this.#attributeKeys.forEach( ( attr: string ) => {
            this.#rootElement.removeAttribute( attr );
            this.#cookies[ attr ]?.delete();
        } );

        this.update_allInputs();
    }

    /**
     * A callback for when an input is selected.
     * 
     * @since 0.1.0-alpha
     */
    public settingSelected( input: HTMLInputElement ): void {
        const attr = input.getAttribute( 'name' );
        if ( !attr ) {
            return;
        }

        const value = input.getAttribute( 'value' );
        if ( !value ) {
            return;
        }

        this.#rootElement.setAttribute( `data-${ attr }`, value );
        this.#cookies[ attr ]?.set( value );
    }

    /**
     * @since 0.1.0-alpha
     */
    public update_allInputs(): void {
        this.#inputs?.forEach( ( input ) => {
            input.checked = false;
        } );

        // fixes issues about reselecting updated values after settings
        // reset and quick-triggered event listeners
        this.#timeout && clearTimeout( this.#timeout );
        this.#timeout = setTimeout(
            () => Promise.all( Array.from( this.#inputs ?? [] ).map( this._update_input ) ),
            100,
        );
    }

    /**
     * Prepares single inputs and sets its current values.
     * 
     * @since ___PKG_VERSION___
     */
    protected async _update_input( input: HTMLInputElement ): Promise<void> {

        const attr = input.getAttribute( 'name' );

        // returns
        if ( !attr ) {
            return;
        }

        return this._setup_attr_key( attr ).then(
            () => {
                const value = input.getAttribute( 'value' );

                // returns
                if ( !value ) {
                    return;
                }

                const current: string | null =
                    this.#cookies[ attr ]?.get() ?? this.#defaults[ attr ] ?? null;

                // returns
                if ( !current ) {
                    return;
                }

                if ( `${ value }` == `${ current }` ) {
                    input.checked = true;

                    this.#rootElement.setAttribute( `data-${ attr }`, current );
                } else {
                    input.checked = false;
                }
            }
        );
    }
}

/**
 * Utilities for the {@link SettingsMenu} class.
 * 
 * @since 0.1.0-alpha
 */
export namespace SettingsMenu {

    /**
     * @since ___PKG_VERSION___
     */
    async function init_mapper(
        root: HTMLElement,
        menu: HTMLElement,
        scrollBehaviour: ScrollBehavior,
        selectors: Selectors.Mapper,
    ): Promise<void> {

        const resetSelector = typeof selectors?.reset === 'function'
            ? menu.id ? selectors.reset( menu.id ) : '[data-settings-reset]'
            : selectors.reset ?? '[data-settings-reset]';

        new SettingsMenu( root, menu, {
            inputs: selectors.inputs,
            pathAttr: selectors.pathAttr,
            resetButton: resetSelector,
        } satisfies Classify<Selectors.Constructor> );

        const scrollToMenu = () =>
            menu.scrollIntoView( {
                behavior: scrollBehaviour ?? 'auto',
                block: 'start',
                inline: 'nearest',
            } );

        menu.addEventListener( 'toggle-open', scrollToMenu );
        menu.addEventListener( 'toggle-close', scrollToMenu );

        // trap the focus order in the menu

        const menuID: string = menu.id;

        if ( !menuID ) {
            return;
        }

        const sels: {
            [ K in keyof Pick<Selectors.Mapper, 'reset' | 'toggle'> ]-?: string;
        } = {

            reset: resetSelector,

            toggle: selectors?.toggle
                ? (
                    typeof selectors.toggle === 'function'
                        ? selectors.toggle( menuID )
                        : selectors.toggle
                )
                : `button[data-toggle-control=${ menuID }]`,
        };

        const toggleButton: HTMLButtonElement | null =
            document.querySelector( sels.toggle );

        if ( !toggleButton ) {
            return;
        }

        const resetButton: HTMLButtonElement | null =
            menu.querySelector( sels.reset );

        if ( !resetButton ) {
            return;
        }

        const toggleBlur = ( event?: HTMLElementEventMap[ 'blur' ] ) => {
            if (
                event?.relatedTarget &&
                !menu.contains( event.relatedTarget as HTMLElement )
            ) {
                resetButton.focus();
            }
        };

        const resetBlur = ( event?: HTMLElementEventMap[ 'blur' ] ) => {
            if (
                event?.relatedTarget &&
                !menu.contains( event.relatedTarget as HTMLElement )
            ) {
                toggleButton.focus();
            }
        };

        menu.addEventListener( 'toggle-open', () => {
            toggleButton.addEventListener( 'blur', toggleBlur );
            resetButton.addEventListener( 'blur', resetBlur );
        } );

        menu.addEventListener( 'toggle-close', () => {
            toggleButton.removeEventListener( 'blur', toggleBlur );
            resetButton.removeEventListener( 'blur', resetBlur );
            toggleButton.focus();
        } );
    }

    /**
     * Initializes the given settings menu(s).
     * 
     * @since 0.1.0-alpha
     */
    export async function init(
        settingsMenus: HTMLElement | NodeListOf<HTMLElement>,
        scrollBehaviour: ScrollBehavior = 'auto',
        selectors: SettingsMenu.Selectors.Mapper = {},
    ): Promise<void[]> {

        const rootElement = document.querySelector(
            selectors?.root || ':root'
        ) as HTMLElement;

        const menuArray =
            typeof ( settingsMenus as NodeListOf<HTMLElement> ).forEach === 'function'
                ? Array.from( settingsMenus as NodeListOf<HTMLElement> )
                : [ settingsMenus as HTMLElement ];

        return Promise.all( menuArray.map(
            menu => init_mapper( rootElement, menu, scrollBehaviour, selectors )
        ) );
    }

    /**
     * @since ___PKG_VERSION___
     */
    export namespace Selectors {

        /**
         * @since ___PKG_VERSION___
         */
        export interface Constructor {
            inputs?: undefined | string;
            pathAttr?: undefined | string;
            resetButton?: undefined | string;
        };

        /**
         * @since 0.1.0-alpha
         * @since ___PKG_VERSION___ — Moved out of constructor to separate definition.
         */
        export interface Mapper extends Omit<Constructor, 'resetButton'> {
            /**
             * @since ___PKG_VERSION___
             */
            root?: undefined | string;

            /**
             * @default 
             * '[data-settings-reset]'
             * 
             * @since 0.1.0-alpha
             */
            reset?: undefined | string | ( ( menuID?: string ) => string );

            /**
             * @default 
             * `button[data-toggle-control=${ menuID }]`
             * 
             * @since 0.1.0-alpha
             */
            toggle?: undefined | string | ( ( menuID?: string ) => string );
        };
    }
}
