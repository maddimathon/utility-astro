/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import { JsCookie } from './JsCookie.js';

/**
 * Sets up and manages the SettingsMenu component's js.
 * 
 * @since ___PKG_VERSION___
 */
export class SettingsMenu {
    readonly #attributeKeys: string[] = [];
    readonly #rootElement: HTMLElement;

    /**
     * For storing the cookies made to deal with each option.
     */
    #cookies: { [ key: string ]: JsCookie; } = {};

    /**
     * For storing the default value (if any) for each option.
     */
    #defaults: { [ key: string ]: string | null; } = {};

    readonly #inputs: NodeListOf<HTMLInputElement> | null;
    readonly #path: string;
    readonly #resetButton: HTMLButtonElement | null;

    #timeout: NodeJS.Timeout | null = null;

    /**
     * @param menu  The website settings menu wrapper to set up.
     */
    public constructor (
        public readonly menu: HTMLElement,
        selectors?: {
            root?: string;
            resetButton?: string;
            pathAttr?: string;
            inputs?: string;
        },
    ) {
        this.#rootElement = document.querySelector(
            selectors?.root || ':root'
        ) as HTMLElement;

        this.#resetButton = menu.querySelector(
            selectors?.resetButton || '[data-settings-reset]'
        );

        this.#path = menu.getAttribute(
            selectors?.pathAttr || 'data-settings-path'
        ) || '/';

        this.#inputs = menu.querySelectorAll(
            selectors?.inputs || 'input[data-settings-input]'
        );

        if ( !this.#resetButton || !this.#inputs ) {
            return;
        }

        this.resetButtonClicked = this.resetButtonClicked.bind( this );
        this.settingSelected = this.settingSelected.bind( this );
        this.update_allInputs = this.update_allInputs.bind( this );
        this._update_allInputs = this._update_allInputs.bind( this );

        /*
         * Adding change event listener and collecting attribute names.
         */
        this.update_allInputs();
        this.#inputs.forEach( ( input ) => {
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

    private _setup_attr_key( attr: string ): void {
        let defaultValue: string | null = null;

        switch ( attr ) {
            case 'brightness-mode':
                window
                    .matchMedia( `( prefers-color-scheme: light )` )
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
                    .matchMedia( `( prefers-contrast: more )` )
                    .addEventListener( 'change', this.update_allInputs );
                defaultValue = 'average';

                if (
                    window.matchMedia( `( prefers-contrast: less )` ).matches
                ) {
                    defaultValue = 'low';
                } else if (
                    window.matchMedia( `( prefers-contrast: more )` ).matches
                ) {
                    defaultValue = 'high';
                }

                if (
                    window.matchMedia( `( forced-colors: active )` )
                        .matches ||
                    window.matchMedia( `( prefers-contrast: custom )` )
                        .matches
                ) {
                    defaultValue = null;
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

            case 'typeface':
                defaultValue = 'body';
                break;
        }

        this.#defaults[ attr ] = defaultValue;

        if ( this.#attributeKeys.includes( attr ) || this.#cookies[ attr ] ) {
            return;
        }

        this.#attributeKeys.push( attr );

        this.#cookies[ attr ] = new JsCookie( attr, this.#path, null, null );
    }

    /**
     * Triggered by a click lisetener.
     */
    public resetButtonClicked() {
        this.#attributeKeys.forEach( ( attr: string ) => {
            this.#rootElement.removeAttribute( attr );
            this.#cookies[ attr ]?.delete();
        } );

        this.update_allInputs();
    }

    /**
     * A callback for when an input is selected.
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

    public update_allInputs(): void {
        this.#inputs?.forEach( ( input ) => {
            input.checked = false;
        } );

        // fixes issues about reselecting updated values after settings
        // reset and quick-triggered event listeners
        this.#timeout && clearTimeout( this.#timeout );
        this.#timeout = setTimeout( this._update_allInputs, 100 );
    }

    public _update_allInputs(): void {
        for ( const input of Array.from( this.#inputs ?? [] ) ) {
            const attr = input.getAttribute( 'name' );
            if ( !attr ) {
                continue;
            }

            this._setup_attr_key( attr );

            const value = input.getAttribute( 'value' );
            if ( !value ) {
                continue;
            }

            const current: string | null =
                this.#cookies[ attr ]?.get() ?? this.#defaults[ attr ] ?? null;
            if ( !current ) {
                continue;
            }

            if ( `${ value }` == `${ current }` ) {
                input.checked = true;
                this.#rootElement.setAttribute( `data-${ attr }`, current );
            } else {
                input.checked = false;
            }
        }
    }
}

/**
 * Utilities for the {@link SettingsMenu} class.
 * 
 * @since ___PKG_VERSION___
 */
export namespace SettingsMenu {

    /**
     * Initializes the given settings menu(s).
     * 
     * @since ___PKG_VERSION___
     */
    export async function init(
        settingsMenus: HTMLElement | NodeListOf<HTMLElement>,
        scrollBehaviour: ScrollBehavior = 'auto',

        selectors?: {

            /**
             * @default 
             * '[data-settings-reset]'
             */
            reset?: string | ( ( menuID?: string ) => string );

            /**
             * @default 
             * `button[data-toggle-control=${ menuID }]`
             */
            toggle?: string | ( ( menuID?: string ) => string );
        },
    ) {

        const mapper = async ( menu: HTMLElement ) => {
            new SettingsMenu( menu );

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
                [ K in keyof NonNullable<typeof selectors> ]-?: string;
            } = {

                reset: selectors?.reset
                    ? (
                        typeof selectors.reset === 'function'
                            ? selectors.reset( menuID )
                            : selectors.reset
                    )
                    : '[data-settings-reset]',

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
        };

        const menuArray =
            typeof ( settingsMenus as NodeListOf<HTMLElement> ).forEach === 'function'
                ? Array.from( settingsMenus as NodeListOf<HTMLElement> )
                : [ settingsMenus as HTMLElement ];

        return Promise.all( menuArray.map( mapper ) );
    }
}
