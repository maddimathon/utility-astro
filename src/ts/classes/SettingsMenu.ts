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
import { hasIterator } from '@maddimathon/utility-typescript';

import { JsCookie } from './JsCookie.js';

/**
 * Sets up and manages the SettingsMenu component's js.
 * 
 * @since 0.1.0-alpha
 */
export class SettingsMenu {

    /**
     * Sets up a new instance.
     */
    public static async new(
        /**
         * The element on which to update data attributes to reflect settings values.
         */
        target: HTMLHtmlElement | HTMLBodyElement,
        /**
         * The container containing all fieldsets in inputs for this menu.
         */
        menu: HTMLElement,
        {
            scrollBehaviour = 'auto',
            cookieNamer,
            ...opts
        }: Partial<SettingsMenu.Opts<SettingsMenu.Selectors.Constructor>> & {
            cookieNamer?: ( attr: string ) => string;
            scrollBehaviour?: ScrollBehavior;
        } = {},
    ): Promise<undefined | SettingsMenu> {

        const inputs = Array.from( menu.querySelectorAll<HTMLInputElement>(
            opts.selectors?.inputs || 'input[data-settings-input]'
        ) ?? [] );

        // returns
        if ( !inputs.length ) {
            if ( opts.debug ) {
                console.debug( 'SettingsMenu.new() - failed, no inputs', { inputs, menu } );
            }
            return undefined;
        }

        const optsComplete = {
            ...opts,

            cookieCacheExpireDays: opts.cookieCacheExpireDays ?? 7,
            cookiePrefix: opts.cookiePrefix ?? '',
            defaultCookieCache: opts.defaultCookieCache ?? false,

            path: menu.getAttribute(
                opts.selectors?.pathAttr || 'data-settings-path'
            ) || '/',
        } satisfies SettingsMenu.Opts<SettingsMenu.Selectors.Constructor> & {
            path: string,
        };

        const resetButton = menu.querySelector<HTMLButtonElement>(
            optsComplete.selectors?.resetButton || 'button[data-settings-reset]'
        );

        cookieNamer = cookieNamer ?? ( ( attr: string ) => optsComplete.cookiePrefix + attr );

        const instance = new SettingsMenu(
            { inputs, menu, resetButton, target },
            cookieNamer,
            optsComplete,
        );

        if ( optsComplete.debug ) {
            console.debug( 'SettingsMenu.new() - constructed', { menu, instance } );
        } else if ( optsComplete.logResults ) {
            console.info(
                `[SettingsMenu] new: ${ menu.id ?? '' }`,
                '\nmenu: ', instance?.menu,
                '\nopts: ', instance?.opts,
            );
        }

        return Promise.all(
            instance.#inputs.map(
                async ( input: HTMLInputElement ) => {
                    const attr = input.getAttribute( 'name' );

                    // returns
                    if ( !attr ) {
                        if ( instance.opts.debug ) {
                            console.debug( 'SettingsMenu.new() setupInput - returning early', {
                                input,
                                attr,
                                menu: instance.menu.id,
                            } );
                        }
                        return;
                    }

                    return instance._setup_attr_key( attr );
                }
            )
        ).then(
            () => {
                /*
                 * Adding change event listener and collecting attribute names.
                 */
                instance.update_allInputs();

                instance.#inputs?.forEach(
                    input => input.addEventListener( 'change', () =>
                        instance.settingSelected( input )
                    )
                );

                /*
                 * Add reset button listener.
                 */
                instance.#resetButton?.addEventListener(
                    'click',
                    instance.resetButtonClicked,
                );

                const scrollToMenu = () => menu.scrollIntoView( {
                    behavior: scrollBehaviour ?? 'auto',
                    block: 'start',
                    inline: 'nearest',
                } );

                menu.addEventListener( 'toggle-open', scrollToMenu );
                menu.addEventListener( 'toggle-close', scrollToMenu );

                return instance;
            }
        );
    }

    /**
     * @since 0.1.0-alpha
     */
    #attributeKeys: string[] = [];

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
    readonly #inputs: HTMLInputElement[];

    /**
     * @since 0.1.0-alpha
     */
    public readonly menu: HTMLElement;

    /**
     * @since 0.1.0-alpha
     */
    readonly #resetButton: HTMLButtonElement | null;

    /**
     * @since 0.1.0-alpha
     */
    readonly #targetElement: HTMLHtmlElement | HTMLBodyElement;

    /**
     * Not to be used directly. Use {@link SettingsMenu.new} instead.
     */
    protected constructor (
        /**
         * @since 0.1.0-alpha
         * @since ___PKG_VERSION___ — Is now an object accepting many elements.
         */
        elements: {
            inputs: HTMLInputElement[];
            menu: HTMLElement;
            resetButton: HTMLButtonElement | null;
            target: HTMLHtmlElement | HTMLBodyElement;
        },

        public readonly cookieNamer: ( attr: string ) => string,

        /**
         * @since ___PKG_VERSION___
         */
        public readonly opts: SettingsMenu.Opts<SettingsMenu.Selectors.Constructor> & {
            path: string;
        },
    ) {
        this.#inputs = elements.inputs;
        this.menu = elements.menu;
        this.#resetButton = elements.resetButton;
        this.#targetElement = elements.target;

        this.resetButtonClicked = this.resetButtonClicked.bind( this );
        this.settingSelected = this.settingSelected.bind( this );
        this.update_allInputs = this.update_allInputs.bind( this );
        this._update_input = this._update_input.bind( this );
    }

    /**
     * Caches attr keys that have been succesfully set up.
     * 
     * @since ___PKG_VERSION___
     */
    #set_default_listeners: { [ key: string ]: boolean; } = {};

    /**
     * @since ___PKG_VERSION___
     */
    private async _set_default( attr: string ): Promise<string | null> {

        const _defaultCookie = this.#cookies[ attr + '-default' ];
        const _update_allInputs = this.update_allInputs.bind( this );

        let defaultValue = null;

        switch ( attr ) {

            case 'brightness-mode':
                const getBrightnessMode = () => {
                    // returns on success
                    for ( const value of [ 'light', 'dark' ] as const ) {
                        if (
                            window.matchMedia( `( prefers-color-scheme: ${ value } )` ).matches
                        ) {
                            return value;
                        }
                    }

                    return null;
                };

                if ( !this.#set_default_listeners[ attr ] ) {
                    window
                        .matchMedia( `( prefers-color-scheme: no-preference )` )
                        .addEventListener( 'change', () => {
                            const value = getBrightnessMode();
                            value && _defaultCookie?.set( value );
                            _update_allInputs();
                        } );

                    this.#set_default_listeners[ attr ] = true;
                }

                defaultValue = getBrightnessMode();
                break;

            case 'contrast-mode':
                const getContrastMode = () => {
                    // returns
                    if (
                        window.matchMedia( `( forced-colors: active )` ).matches
                        || window.matchMedia( `( prefers-contrast: custom )` ).matches
                    ) {
                        return 'forced-colors';
                    }

                    // returns
                    if ( window.matchMedia( `( prefers-contrast: less )` ).matches ) {
                        return 'low';
                    }

                    // returns
                    if ( window.matchMedia( `( prefers-contrast: more )` ).matches ) {
                        return 'high';
                    }

                    return 'average';
                };

                if ( !this.#set_default_listeners[ attr ] ) {
                    window
                        .matchMedia( `( prefers-contrast: no-preference )` )
                        .addEventListener( 'change', () => {
                            const value = getContrastMode();
                            value && _defaultCookie?.set( value );
                            _update_allInputs();
                        } );

                    this.#set_default_listeners[ attr ] = true;
                }

                defaultValue = getContrastMode();
                break;

            case 'motion':
                const getMotion = () => {
                    // returns
                    if (
                        window.matchMedia( '( prefers-reduced-motion: reduce )' ).matches
                    ) {
                        defaultValue = 'reduce';
                    }

                    return 'no-preference';
                };

                if ( !this.#set_default_listeners[ attr ] ) {
                    window
                        .matchMedia( `( prefers-reduced-motion: no-preference )` )
                        .addEventListener( 'change', () => {
                            const value = getMotion();
                            value && _defaultCookie?.set( value );
                            _update_allInputs();
                        } );

                    this.#set_default_listeners[ attr ] = true;
                }

                defaultValue = getMotion();
                break;

            default:
                this.opts.defaultCookieCache = false;
                const fieldset = this.menu.querySelector( `[data-settings-menu-custom-setting=${ attr }]` );

                // breaks
                if ( !fieldset ) {
                    break;
                }

                defaultValue = fieldset.getAttribute( 'data-settings-menu-custom-setting-default' );
                break;
        }

        if ( this.opts.defaultCookieCache && !this.#cookies[ attr + '-default' ] ) {
            this.#cookies[ attr + '-default' ] = new JsCookie(
                this.cookieNamer( attr + '-default' ),
                this.opts.path,
                {
                    copyToLocalStorage: true,
                },
            );
        }

        this.#defaults[ attr ] = defaultValue;

        if ( this.#defaults[ attr ] ) {
            this.#cookies[ attr + '-default' ]?.set( this.#defaults[ attr ], this.opts.cookieCacheExpireDays );
        }

        if ( this.opts.debug ) {
            console.debug( 'SettingsMenu._set_default()', {
                attr,
                defaultValue,
                menu: this.menu.id,
            } );
        }

        return this.#defaults[ attr ];
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
    private async _setup_attr_key( attr: string, alwaysSetDefault: boolean = false ): Promise<void> {
        // returns
        if ( this.#setup_attr_keys[ attr ] === true ) {
            // returns
            if ( alwaysSetDefault ) {
                return this._set_default( attr ).then( () => { } );
            }
            return;
        }

        this.#setup_attr_keys[ attr ] = true;

        if ( !this.#attributeKeys.includes( attr ) ) {
            this.#attributeKeys.push( attr );
        }

        if ( !this.#cookies[ attr ] ) {
            this.#cookies[ attr ] = new JsCookie(
                this.cookieNamer( attr ),
                this.opts.path,
                {
                    copyToLocalStorage: true,
                },
            );
        }

        const defaultValue = await this._set_default( attr );

        if ( this.opts.debug ) {
            console.debug( 'SettingsMenu._setup_attr_key()', {
                attr,
                defaultValue,
                menu: this.menu.id,
            } );
        }
    }

    /**
     * Triggered by a click lisetener.
     * 
     * @since 0.1.0-alpha
     */
    public resetButtonClicked(): void {
        this.#attributeKeys.forEach( ( attr: string ) => {

            const startingCookie = document.cookie;

            this.#cookies[ attr ]?.delete();
            this.#cookies[ attr + '-default' ]?.delete();

            if ( this.opts.debug ) {
                console.debug( 'SettingsMenu.resetButtonClicked() - forEach', {
                    attr,
                    cookie_get: this.#cookies[ attr ]?.get(),
                    defaultCookieCache_get: this.#cookies[ attr + '-default' ]?.get(),
                    cookie: this.#cookies[ attr ],
                    defaultCookieCache: this.#cookies[ attr + '-default' ],
                    'START - document.cookie': startingCookie,
                    'END - document.cookie': document.cookie,
                } );
            }
        } );

        if ( this.opts.debug ) {
            console.debug( 'SettingsMenu.resetButtonClicked() - before update_allInputs', {
                attributeKeys: this.#attributeKeys.map(
                    attr => ( {
                        attr,
                        cookie: this.#cookies[ attr ]?.get(),
                        defaultCookieCache: this.#cookies[ attr + '-default' ]?.get(),
                    } )
                )
            } );
        }

        this.update_allInputs().then(
            () => this.opts.debug && console.debug( 'SettingsMenu.resetButtonClicked() - after update_allInputs' )
        );
    }

    /**
     * A callback for when an input is selected.
     * 
     * @since 0.1.0-alpha
     */
    public settingSelected( input: HTMLInputElement ): void {
        const attr = input.getAttribute( 'name' );

        // returns
        if ( !attr ) {
            return;
        }

        const value = input.getAttribute( 'value' );

        // returns
        if ( !value ) {
            return;
        }

        this.#targetElement.setAttribute( `data-${ attr }`, value );
        this.#cookies[ attr ]?.set( value );

        if ( this.opts.debug ) {
            console.debug( 'SettingsMenu.settingSelected()', {
                input,
                attr,
                value,
                attribute: this.#targetElement.getAttribute( `data-${ attr }` ),
                cookie_get: this.#cookies[ attr ]?.get(),
                defaultCookieCache_get: this.#cookies[ attr + '-default' ]?.get(),
                menu: this.menu.id,
            } );
        }
    }

    /**
     * @since ___PKG_VERSION___
     */
    #update_allInputs_running: boolean = false;

    /**
     * @since 0.1.0-alpha
     */
    #update_allInputs_timeout: ReturnType<typeof setTimeout> | null = null;

    /**
     * @since 0.1.0-alpha
     */
    public async update_allInputs(): Promise<void> {
        // returns
        if ( this.#update_allInputs_running ) {
            this.opts.debug && console.debug( 'SettingsMenu.update_allInputs() already running' );
            return;
        }

        this.#update_allInputs_running = true;

        return new Promise<void>(
            ( resolve ) => {
                this.#inputs?.forEach( ( input ) => {
                    input.checked = false;
                } );

                // we can start this before the timeout
                const setDefaults = Promise.all(
                    this.#attributeKeys.map( key => this._set_default( key ) )
                );

                // the timeout/delay fixes issues about reselecting updated values
                // quickly after reset and quick-triggered event listeners
                this.#update_allInputs_timeout && clearTimeout( this.#update_allInputs_timeout );
                this.#update_allInputs_timeout = setTimeout(
                    () => setDefaults.then(
                        () => Promise.all(
                            this.#inputs?.map( i => this._update_input( i ) )
                        ).then( () => resolve() )
                    ),
                    80,
                );
            }
        ).then( () => {
            this.#update_allInputs_running = false;
        } );
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
            if ( this.opts.debug ) {
                console.debug( 'SettingsMenu._update_input()', {
                    input,
                    attr,
                    menu: this.menu.id,
                } );
            }
            return;
        }

        return this._setup_attr_key( attr ).then(
            () => {
                const value = input.getAttribute( 'value' );

                // returns
                if ( !value ) {
                    if ( this.opts.debug ) {
                        console.debug( 'SettingsMenu._update_input()', {
                            input,
                            attr,
                            value,
                            menu: this.menu.id,
                        } );
                    }
                    return;
                }

                const current = this.#cookies[ attr ]?.get()
                    ?? this.#defaults[ attr ]
                    ?? null;

                if ( this.opts.debug ) {
                    console.debug( 'SettingsMenu._update_input()', {
                        input,
                        attr,
                        value,
                        current,
                        checked: `${ value }` == `${ current }`,
                        localStorage: window.localStorage.getItem( this.cookieNamer( attr ) ),
                        cookie: this.#cookies[ attr ]?.get(),
                        default: this.#defaults[ attr ],
                        menu: this.menu.id,
                    } );
                }

                // returns
                if ( !current ) {
                    return;
                }

                input.checked = `${ value }` == `${ current }`;

                if ( input.checked ) {
                    this.#targetElement.setAttribute( `data-${ attr }`, current );
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
    async function run_mapper(
        target: HTMLHtmlElement | HTMLBodyElement,
        menu: HTMLElement,
        {
            selectors = {},
            ...opts
        }: Partial<SettingsMenu.Opts<SettingsMenu.Selectors.Mapper>> & {
            scrollBehaviour: ScrollBehavior,
        },
    ): Promise<undefined | SettingsMenu> {

        const resetSelector = typeof selectors?.reset === 'function'
            ? menu.id ? selectors.reset( menu.id ) : '[data-settings-reset]'
            : selectors.reset ?? '[data-settings-reset]';

        return SettingsMenu.new( target, menu, {
            ...opts,
            selectors: {
                inputs: selectors.inputs,
                pathAttr: selectors.pathAttr,
                resetButton: resetSelector,
            } satisfies Classify<Selectors.Constructor>,
        } );
    }

    /**
     * Initializes the given settings menu(s).
     * 
     * @since 0.1.0-alpha
     * @since ___PKG_VERSION___ — Renamed from init to run. Changed third param from selector to opts (which contains selectors).
     */
    export async function run(
        settingsMenus: HTMLElement | NodeListOf<HTMLElement>,
        scrollBehaviour: ScrollBehavior = 'auto',
        {
            targetElement,
            ...opts
        }: Partial<SettingsMenu.Opts<SettingsMenu.Selectors.Mapper>> & {
            cookieNamer?: ( attr: string ) => string;
            targetElement?: HTMLHtmlElement | HTMLBodyElement | null;
        } = {},
    ): Promise<SettingsMenu[]> {

        targetElement = targetElement ?? document.querySelector<HTMLHtmlElement | HTMLBodyElement>( opts.selectors?.target || ':root' ) ?? undefined;

        // returns
        if ( !targetElement ) {
            return [];
        }

        const menuArray = hasIterator( settingsMenus )
            ? Array.from( settingsMenus )
            : [ settingsMenus ];

        return Promise.all( menuArray.map(
            menu => run_mapper( targetElement, menu, {
                ...opts,
                scrollBehaviour,
            } )
        ) ).then(
            arr => arr.filter( i => !!i )
        );
    }

    /**
     * Adds a 'load' event listener that then {@link SettingsMenu.run}, querying
     * the document for settings menu containers to set them up as instances of
     * this class.
     *
     * @since ___PKG_VERSION___
     */
    export async function runOnLoad(
        opts: Partial<SettingsMenu.Opts<SettingsMenu.Selectors.Mapper>> = {},
        attrsToSet: string[] = [],
    ): Promise<void> {
        const cookieNamer = ( attr: string ) => ( opts.cookiePrefix ?? '' ) + attr;
        const targetElement = document.querySelector<HTMLHtmlElement | HTMLBodyElement>( opts.selectors?.target || ':root' );

        window.addEventListener( 'load', async () => {

            const settingsMenus = document.querySelectorAll<HTMLElement>( '[data-settings-menu]' );

            const scrollBehaviour =
                ( window.getComputedStyle( document.documentElement ).scrollBehavior as
                    | ScrollBehavior
                    | undefined ) || undefined;

            /*
             * Setting up each found menu.
             */
            await SettingsMenu.run( settingsMenus, scrollBehaviour, {
                ...opts,
                cookieNamer,
                targetElement,
            } );
        }, { once: true } );

        if ( opts.debug ) {
            console.debug( 'SettingsMenu.runOnLoad()', {
                attrsToSet,
                targetElement,
            } );
        }

        if ( attrsToSet.length && targetElement ) {

            attrsToSet.forEach(
                attr => {
                    let value = window.localStorage.getItem( cookieNamer( attr ) );

                    if ( !value && opts.defaultCookieCache ) {
                        value = window.localStorage.getItem( cookieNamer( attr + '-default' ) );
                    }

                    if ( value ) {
                        targetElement.setAttribute( `data-${ attr }`, value );
                    }

                    if ( opts.debug ) {
                        console.debug( 'SettingsMenu.runOnLoad() attrsToSet', {
                            attr,
                            value,
                            [ `data-${ attr }` ]: targetElement.getAttribute( `data-${ attr }` ),
                        } );
                    }
                }
            );
        }
    }

    /**
     * Options for the configuration of {@link SettingsMenu} instances.
     * 
     * @since ___PKG_VERSION___
     */
    export interface Opts<T_Selectors extends SettingsMenu.Selectors.Constructor | SettingsMenu.Selectors.Mapper> {

        /**
         * Whether to create a cookie that caches the detected default value.
         * 
         * @default 7
         * 
         * @since ___PKG_VERSION___
         */
        cookieCacheExpireDays: number;

        /**
         * A prefix to use before cookie names when storing the settings values.
         * 
         * @since ___PKG_VERSION___
         */
        cookiePrefix: string;

        /**
         * Outputs information to the console.
         * 
         * @since ___PKG_VERSION___
         */
        debug?: undefined | boolean;

        /**
         * Whether to create a cookie that caches the detected default value.
         * 
         * @since ___PKG_VERSION___
         */
        defaultCookieCache: boolean;

        /**
         * Whether to output the results of constructing each toggle element as
         * it is made.
         *
         * @since ___PKG_VERSION___
         */
        logResults?: undefined | boolean;

        selectors?: undefined | T_Selectors;
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
             * @default 
             * '[data-settings-reset]'
             * 
             * @since 0.1.0-alpha
             */
            reset?: undefined | string | ( ( menuID?: string ) => string );

            /**
             * The element on which to set settings attributes. Probably ':root' or 'body'.
             * 
             * @default ':root'
             * 
             * @since ___PKG_VERSION___
             */
            target?: undefined | string;

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
