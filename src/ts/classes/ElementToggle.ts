/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Manages toggle containers made both by the Toggle component and elsewhere.
 * 
 * @since 0.1.0-alpha
 */
export class ElementToggle {

    /**
     * A map of existing successfully-registered instances of this class. Helps
     * to avoid re-initializing the same element or a block with the same id
     * value.
     * 
     * @since ___PKG_VERSION___
     */
    protected static readonly instances: Map<string, ElementToggle> = new Map();

    /**
     * @since ___PKG_VERSION___
     */
    protected static isToggle<T_Element extends HTMLElement>(
        element: T_Element,
    ): boolean {
        return element.id ? ElementToggle.instances.has( element.id ) : false;
    }

    /**
     * Changes some properties and attributes on applicable elements since this
     * is an invalidly configured toggle element.
     * 
     * @since 0.1.0-alpha.7
     */
    protected static async abortNew(
        container: HTMLElement | null | undefined,
        allButtons: NodeListOf<Element> | Element[] | null | undefined,
    ): Promise<void> {

        if ( container ) {
            container.setAttribute( 'data-toggle-container', '' );
        }

        if ( allButtons ) {
            allButtons.forEach(
                button => {
                    button.setAttribute( 'aria-disabled', 'true' );
                    button.removeAttribute( 'aria-controls' );
                    button.removeAttribute( 'aria-expanded' );
                }
            );
        }
    }

    /**
     * Queries the document for toggle containers to set them up as instances of
     * this class.
     *
     * @since ___PKG_VERSION___
     */
    public static async run( opts: Partial<ElementToggle.Opts> = {} ): Promise<void> {

        document.querySelectorAll( '[data-toggle-container]' ).forEach(
            async ( con ) => {

                if ( opts.debug ) {
                    console.debug( 'ElementToggle.init()', { con } );
                }

                // returns 
                if ( con.id ) {
                    return ElementToggle.new( con as HTMLElement, opts ).then(
                        ( instance ) => {
                            if ( !opts.debug && opts.logResults ) {

                                const msgs: any[] = [
                                    `[ElementToggle] new: ${ con.id ?? '' }`,
                                ];

                                if ( instance ) {
                                    msgs.push(
                                        '\ncontainer: ', instance.container,
                                        '\nopts: ', instance.opts,
                                    );
                                } else {
                                    msgs.push( 'construction failed', '\ninstance: ', instance );
                                }

                                console.info( ...msgs );
                            }
                        }
                    );
                }

                if ( !opts.debug && opts.logResults ) {
                    console.info( '[ElementToggle] no valid container found' );
                }

                return null;
            }
        );
    }

    /**
     * Adds a 'load' event listener that then {@link ElementToggle.run}, querying
     * the document for toggle containers to set them up as instances of this
     * class.
     *
     * @since 0.1.0-alpha.7
     * @since ___PKG_VERSION___ — Renamed from init to runOnLoad.
     */
    public static async runOnLoad( opts: Partial<ElementToggle.Opts> = {} ): Promise<void> {
        window.addEventListener( 'load', () => ElementToggle.run( opts ), { once: true } );
    }

    /**
     * Initiates a single instance asynchronously.
     * 
     * @since 0.1.0-alpha.7
     */
    public static async new(
        container: HTMLElement | null,
        opts: Partial<ElementToggle.Opts> = {},
    ): Promise<null | ElementToggle> {
        const containerID = container?.id;

        // returns
        if ( !container || !containerID ) {
            ElementToggle.abortNew( container, null );

            if ( opts.debug ) {
                console.debug( 'ElementToggle.new() - aborting; no container id', { container } );
            }

            return null;
        }

        // returns
        if ( ElementToggle.instances.has( containerID ) ) {
            return null;
        }

        const allButtons = document.querySelectorAll(
            `[data-toggle-primary-control=${ containerID }], [data-toggle-control=${ containerID }]`
        );

        // returns
        if ( !allButtons.length ) {
            ElementToggle.abortNew( container, allButtons );

            if ( opts.debug ) {
                console.debug( 'ElementToggle.new() - aborting; no buttons', { container, allButtons } );
            }

            return null;
        }

        const primaryButton = document.querySelector(
            `[data-toggle-primary-control=${ containerID }]`
        ) as HTMLElement ?? allButtons[ 0 ];

        // returns - invalid setup that won't work
        if ( !primaryButton ) {
            ElementToggle.abortNew( container, allButtons );

            if ( opts.debug ) {
                console.debug( 'ElementToggle.new() - aborting; no primary button', { container, primaryButton, allButtons } );
            }

            return null;
        }

        const content: HTMLElement | null = container.querySelector(
            `[data-toggle-content=${ containerID }]`
        );

        // returns - invalid setup that won't work
        if ( !content ) {
            ElementToggle.abortNew( container, allButtons );

            if ( opts.debug ) {
                console.debug( 'ElementToggle.new() - aborting; no content element', { container, primaryButton, allButtons, content } );
            }

            return null;
        }

        if ( opts.debug ) {
            console.debug( 'ElementToggle.new() - constructing', { container, primaryButton, allButtons, content } );
        }

        return new ElementToggle(
            {
                container,
                primaryButton,
                allButtons: Array.from( allButtons ) as [ HTMLElement ] & HTMLElement[],
                content,
            },
            opts,
        );
    }


    public static openEvent: Event | null = null;
    public static closeEvent: Event | null = null;


    /** 
     * @param string  A CSS time value to convert to milliseconds.
     */
    public static cssTimeToMilliseconds( string: number | string ): number {
        // returns
        if ( typeof string === 'number' ) {
            return string;
        }

        // returns
        if ( string.includes( 'ms' ) ) {
            return Number( string.replace( /\s*ms\s*$/gi, '' ) );
        }

        return Number( string.replace( /\s*s\s*$/gi, '' ) ) * 1000;
    }

    public static createCustomEvents(): void {

        if ( this.openEvent === null ) {
            ElementToggle.openEvent = new Event( 'toggle-open' );
        }

        if ( this.closeEvent === null ) {
            ElementToggle.closeEvent = new Event( 'toggle-close' );
        }
    }



    /* LOCAL PROPS
     * ====================================================================== */

    /** 
     * Optional configuration, if any.
     * @since 0.1.0-alpha.7
     */
    protected readonly opts: ElementToggle.Opts;

    /**
     * Timeout length to switch the button to active state, in milliseconds.
     * 
     * @since ___PKG_VERSION___
     */
    protected readonly activeTimeoutLength: number;

    /**
     * Whether this toggle-able element should be treated as a modal (i.e., trap focus).
     *
     * @since ___PKG_VERSION___
     */
    protected readonly asModal: boolean;

    /** 
     * The unique ID for the toggle container to set up.
     */
    protected readonly container: HTMLElement;

    protected readonly content: HTMLElement;
    protected readonly primaryButton: HTMLElement;
    protected readonly allButtons: HTMLElement[];

    protected closingTimeout: ReturnType<typeof setTimeout> | null = null;

    /** 
     * In milliseconds.
     */
    protected closingTime: number;

    /**
     * Whether this toggle-able element defaults to the open state.
     *
     * @since ___PKG_VERSION___
     */
    protected readonly defaultIsOpen: boolean;

    /**
     * Attribute strings for adding custom focus & active states.
     *
     * @since ___PKG_VERSION___
     */
    protected readonly attr: {
        active: string;
        focus: string;
    };

    /**
     * Whether this container is currently open.
     * 
     * @since ___PKG_VERSION___
     */
    public get isOpen(): boolean {
        return this.container.getAttribute( 'data-toggle-container' ) === 'open';
    }

    /**
     * Whether this toggle-able element is a menu (which slightly changes
     * some behaviour/aria).
     *
     * @since ___PKG_VERSION___
     */
    protected readonly isMenu: boolean;

    /**
     * Whether this toggle-able element is a nav element/region (which slightly
     * changes some behaviour/aria).
     *
     * @since ___PKG_VERSION___
     */
    protected readonly isNav: boolean;

    /**
     * @since ___PKG_VERSION___
     */
    public readonly toggleListener: ( this: HTMLElement, ev: Event ) => any;



    /* CONSTRUCTOR
     * ====================================================================== */

    /** 
     * Class constructor.
     */
    protected constructor (

        elements: {
            container: HTMLElement,
            primaryButton: HTMLElement,
            allButtons: [ HTMLElement ] & HTMLElement[],
            content: HTMLElement,
        },

        /** Optional configuration, if any. */
        partialOpts?: Partial<ElementToggle.Opts>,
    ) {
        this.opts = {
            activeTimeoutLength: ( partialOpts?.closingTime ?? 1800 ) / 4,
            closeWhenUntargetted: false,
            closingTime: 1800,
            closingTimeProperty: '--toggle-closing-time',
            debug: false,
            openWhenTargetted: true,
            ...partialOpts,
        };

        this.closingTime = this.opts.closingTime;

        this.allButtons = elements.allButtons;
        this.container = elements.container;
        this.content = elements.content;
        this.primaryButton = elements.primaryButton;

        this.attr = {
            active: this.container.dataset[ 'toggleAttrStateActive' ] || 'data-state-active',
            focus: this.container.dataset[ 'toggleAttrStateFocus' ] || 'data-state-focus',
        };

        const _containerType = this.container.dataset[ 'toggleContainerType' ]?.split( ',' ) ?? [];

        this.isMenu = _containerType.includes( 'menu' );

        this.asModal = this.isMenu || _containerType.includes( 'modal' );

        this.isNav = _containerType.includes( 'nav' )
            || (
                !this.isMenu && (
                    this.container.role === 'navigation'
                    || this.container.tagName.toLowerCase() === 'nav'
                )
            );

        if ( this.opts.debug ) {
            console.debug( 'new ElementToggle()', {
                id: this.container.id,
                attr: this.attr,
                asModal: this.asModal,
                isMenu: this.isMenu,
                isNav: this.isNav,
            } );
        }

        this.activeTimeoutLength = Math.min(
            this.closingTime,
            Number.isNaN( this.opts.activeTimeoutLength ) ? ( this.closingTime / 4 ) : this.opts.activeTimeoutLength,
        );

        this.activateButton = this.activateButton.bind( this );
        this.deactivateButton = this.deactivateButton.bind( this );
        this.handleHashChange = this.handleHashChange.bind( this );
        this.toggle = this.toggle.bind( this );
        this.validateButton = this.validateButton.bind( this );

        const _activateButton = this.activateButton;
        const _toggle = this.toggle;

        this.toggleListener = function ( this: HTMLElement ) {
            _activateButton( this );
            _toggle( this );
        };

        const isCurrentAnchorTarget = this.opts.openWhenTargetted
            && this.checkUrlTarget( new URL( window.location.href ) );

        this.defaultIsOpen = this.isOpen || isCurrentAnchorTarget;

        // returns
        if ( !this.container || !this.primaryButton || !this.container.id || !this.content ) {
            this.abortConstructor();
            return;
        }

        ElementToggle.instances.set( this.container.id, this );

        this.setClosingTime();

        if ( !isCurrentAnchorTarget ) {
            this.primaryButton.removeAttribute( this.attr.focus );
        }

        Promise.all( this.allButtons.map( this.validateButton ) ).then(
            () => {
                if ( this.defaultIsOpen ) {
                    if ( isCurrentAnchorTarget ) {
                        this.openAsTargetAnchor();
                    } else {
                        this.open();
                    }
                } else {
                    this.container.setAttribute( 'data-toggle-container', 'closed' );
                }

                if ( this.opts.openWhenTargetted ) {
                    window.addEventListener( 'hashchange', this.handleHashChange );
                }
            }
        );
    }

    /**
     * Validates the markup of a button used to toggle this element.
     * 
     * @since ___PKG_VERSION___
     */
    protected async validateButton( button: HTMLElement ): Promise<void> {
        const contentID = this.content.id;

        button.addEventListener( 'click', this.toggleListener );

        if ( contentID ) {
            if (
                button.role == 'button'
                || button.tagName.toLowerCase() == 'button'
                || button.tagName.toLowerCase() == 'a'
            ) {
                button.setAttribute( 'aria-controls', contentID );
            }
        }

        if ( button.getAttribute( 'aria-controls' ) ) {
            button.removeAttribute( 'aria-disabled' );
            button.setAttribute( 'aria-expanded', this.isOpen ? 'true' : 'false' );

            if ( this.asModal ) {
                button.setAttribute( 'aria-haspopup', 'dialog' );
                this.content.role = 'dialog';
            }
        }
    }

    /**
     * {@inheritDoc ElementToggle.abortNew}
     * 
     * @since 0.1.0-alpha
     */
    protected abortConstructor(): void {
        // runs async while this function continues
        ElementToggle.abortNew( this.container, this.allButtons );

        window.removeEventListener( 'hashchange', this.handleHashChange );

        if ( this.allButtons ) {
            this.allButtons.forEach(
                button => button.removeEventListener( 'click', this.toggleListener )
            );
        }
    }



    /* UTILITIES
     * ====================================================================== */

    /**
     * @since ___PKG_VERSION___
     */
    #activeTimeout: ReturnType<typeof setTimeout> | undefined;

    /**
     * @since ___PKG_VERSION___
     */
    #activeStateHold: boolean = false;

    /**
     * Adds the active attribute to the buttons.
     * 
     * @since ___PKG_VERSION___
     */
    protected activateButton( button: HTMLElement ): void {
        clearTimeout( this.#activeTimeout );
        this.#activeStateHold = true;

        button.setAttribute( this.attr.active, 'true' );

        this.#activeTimeout = setTimeout( () => {
            this.#activeStateHold = false;
        }, this.activeTimeoutLength );
    }

    /**
     * Clears the related timeout, if any.
     */
    protected clearTimeout(): void {
        /*
         * Clear any timeout currently running (like if someone clicks the
         * button before it's done).
         */
        if ( this.closingTimeout !== null ) {
            clearTimeout( this.closingTimeout );
        }

        this.deactivateButton();
    }

    /**
     * Checks the current url anchor target and checks if it matches the id of
     * this toggle element.
     *
     * @since 0.1.0-alpha.7
     */
    protected checkUrlTarget( url: URL ): boolean {
        // returns
        if ( !url.hash ) {
            return false;
        }

        const hashAsId = url.hash.replace( /^#/gi, '' );

        return hashAsId.toLowerCase() === this.container.id.toLowerCase();
    }

    /**
     * @since ___PKG_VERSION___
     */
    #deactiveTimeout: ReturnType<typeof setTimeout> | undefined;

    /**
     * Removes the active attribute to the buttons.
     * 
     * @since ___PKG_VERSION___
     */
    protected deactivateButton(): void {
        clearTimeout( this.#deactiveTimeout );

        // sets timeout to callback and returns - waiting for the activateButton() timeout to set it back to false
        if ( this.#activeStateHold ) {
            this.#deactiveTimeout = setTimeout( this.deactivateButton, 50 );
            return;
        }

        this.primaryButton.removeAttribute( this.attr.active );

        this.allButtons.forEach( button => button.removeAttribute( this.attr.active ) );
    }

    /**
     * If applicable (by opts), checks if the current url anchor targets
     * this toggle and if so, opens it.
     *
     * @since 0.1.0-alpha.7
     */
    public handleHashChange( event: HashChangeEvent ): void {
        // returns
        if ( !this.opts.openWhenTargetted ) {
            return;
        }

        const isNewTarget = this.checkUrlTarget( new URL( event.newURL ) );

        if ( !isNewTarget ) {
            this.primaryButton.removeAttribute( this.attr.focus );
        }

        if ( isNewTarget ) {
            this.openAsTargetAnchor();
        }

        if (
            !isNewTarget
            && this.opts.closeWhenUntargetted
            && this.checkUrlTarget( new URL( event.oldURL ) )
            && this.container.getAttribute( 'data-toggle-container' ) === 'open'
        ) {
            this.close();
        }
    }

    /**
     * Opens the toggle element as if this is the current url anchor target. 
     * Opens regardless of the current `this.opts.openWhenTargetted` value.
     *
     * @since 0.1.0-alpha.7
     */
    protected openAsTargetAnchor(): void {
        this.open();

        this.primaryButton.setAttribute( this.attr.focus, 'true' );

        this.primaryButton.addEventListener(
            'blur',
            () => this.primaryButton.removeAttribute( this.attr.focus ),
            { once: true },
        );

        this.primaryButton.focus( {
            // @ts-ignore - IDE doesn't register an error but compile does - some tsconfig shenanigans, apparently.
            focusVisible: true,
        } );
    }

    #focusableContainerChildren?: ReturnType<typeof ElementToggle.getFocusableChildren>;

    /**
     * The methods used as event listeners for trapping focus.
     * 
     * @since ___PKG_VERSION___
     */
    get focusableContainerChildren(): ReturnType<typeof ElementToggle.getFocusableChildren> {
        // returns
        if ( this.#focusableContainerChildren ) {
            return this.#focusableContainerChildren;
        }

        this.#focusableContainerChildren = ElementToggle.getFocusableChildren( this.container );
        return this.#focusableContainerChildren;
    }

    #focusableContentChildren?: ReturnType<typeof ElementToggle.getFocusableChildren>;

    /**
     * The methods used as event listeners for trapping focus.
     * 
     * @since ___PKG_VERSION___
     */
    get focusableContentChildren(): ReturnType<typeof ElementToggle.getFocusableChildren> {
        // returns
        if ( this.#focusableContentChildren ) {
            return this.#focusableContentChildren;
        }

        this.#focusableContentChildren = ElementToggle.getFocusableChildren( this.content );
        return this.#focusableContentChildren;
    }

    #focusTrappers?: {
        keydown: ( this: Document, event: KeyboardEvent ) => void,
        first: ( this: HTMLElement, event: FocusEvent ) => void,
        last: ( this: HTMLElement, event: FocusEvent ) => void,
        any: ( this: HTMLElement, event: FocusEvent ) => void,
    };

    /**
     * The methods used as event listeners for trapping focus.
     * 
     * @since ___PKG_VERSION___
     */
    get focusTrappers(): {
        keydown: ( this: Document, event: KeyboardEvent ) => void,
        first: ( this: HTMLElement, event: FocusEvent ) => void,
        last: ( this: HTMLElement, event: FocusEvent ) => void,
        any: ( this: HTMLElement, event: FocusEvent ) => void,
    } {
        // returns
        if ( this.#focusTrappers ) {
            return this.#focusTrappers;
        }

        const container = this.container;
        const focusableContainerChildren = this.focusableContainerChildren;
        const primaryButton = this.primaryButton;
        const toggleClose = this.close.bind( this );

        this.#focusTrappers = {

            keydown: function ( this: Document, event: KeyboardEvent ) {
                // escape key should close modals
                if ( event.code === 'Escape' ) {
                    toggleClose();
                }
            },

            first: function ( this: HTMLElement, event: FocusEvent ) {
                // if the newly-focused element is outside the container, we should redirect focus
                if (
                    event.relatedTarget
                    && !container.contains( event.relatedTarget as Node )
                ) {
                    ( focusableContainerChildren.last ?? primaryButton ).focus();
                }
            },

            last: function ( this: HTMLElement, event: FocusEvent ) {
                // if the newly-focused element is outside the container, we should redirect focus
                if (
                    event.relatedTarget
                    && !container.contains( event.relatedTarget as Node )
                ) {
                    ( focusableContainerChildren.first ?? primaryButton ).focus();
                }
            },

            any: function ( this: HTMLElement, event: FocusEvent ) {
                // if the newly-focused element is outside the container, we should redirect focus
                if (
                    event.relatedTarget
                    && !container.contains( event.relatedTarget as Node )
                ) {
                    ( focusableContainerChildren.first ?? primaryButton ).focus();
                }
            },
        };

        return this.#focusTrappers;
    }

    /**
     * Sets the closing time property via computed style value.
     * 
     * @since ___PKG_VERSION___
     */
    protected setClosingTime(): void {
        const computedClosingTime = getComputedStyle( this.container ).getPropertyValue( this.opts.closingTimeProperty );

        this.closingTime = ElementToggle.cssTimeToMilliseconds(
            computedClosingTime?.length ? computedClosingTime : this.opts.closingTime
        );
    }

    /**
     * Called when the element is toggled open.
     * 
     * @since ___PKG_VERSION___
     */
    protected trapFocus(): void {
        // returns - untraps focus first
        if ( !this.isOpen ) {
            this.untrapFocus();
            return;
        }

        const focusableContainerChildren = this.focusableContainerChildren;
        const focusTrappers = this.focusTrappers;

        document.addEventListener( 'keydown', focusTrappers.keydown, { capture: true } );

        // add listeners to all children, but special listeners for the first and last
        focusableContainerChildren.all.forEach(
            ( element ) => {

                // returns
                if ( element.isSameNode( focusableContainerChildren.first ?? null ) ) {
                    element.addEventListener( 'blur', focusTrappers.first );
                    return;
                }

                // returns
                if ( element.isSameNode( focusableContainerChildren.last ?? null ) ) {
                    element.addEventListener( 'blur', focusTrappers.last );
                    return;
                }

                element.addEventListener( 'blur', focusTrappers.any );
            }
        );
    }

    /**
     * Called when the element is toggled closed.
     * 
     * @since ___PKG_VERSION___
     */
    protected untrapFocus(): void {
        const focusableContainerChildren = this.focusableContainerChildren;
        const focusTrappers = this.focusTrappers;

        // add listeners to all children, but special listeners for the first and last
        focusableContainerChildren.all.forEach(
            ( element ) => {
                // returns
                if ( !focusTrappers ) {
                    return;
                }

                document.removeEventListener( 'keydown', focusTrappers.keydown, { capture: true } );

                element.removeEventListener( 'blur', focusTrappers.first );
                element.removeEventListener( 'blur', focusTrappers.last );
                element.removeEventListener( 'blur', focusTrappers.any );
            }
        );
    }



    /* TOGGLING
     * ====================================================================== */

    /**
     * Toggles the open/close state of the element.
     */
    public toggle( button?: HTMLElement ): void {
        this.activateButton( button ?? this.primaryButton );

        // returns
        if ( !this.container ) { return; }

        /*
         * Grab the current state and trigger an opening or closing function!
         */
        switch ( this.container.getAttribute( 'data-toggle-container' ) ) {

            case 'closed':
            case 'closing':
                this.clearTimeout();
                this.open();
                break;

            case 'open':
            default:
                this.clearTimeout();
                this.close();
                break;
        }

        this.deactivateButton();
    }

    /**
     * Toggles the element open.
     */
    protected open(): void {
        // returns
        if ( !this.allButtons || !this.container ) {
            this.deactivateButton();
            return;
        }

        this.setClosingTime();

        this.container.setAttribute( 'data-toggle-container', 'open' );

        this.allButtons.forEach( ( button ) => {
            if ( button.getAttribute( 'aria-controls' ) ) {
                button.setAttribute( 'aria-expanded', 'true' );
            }
        } );

        // trap focus
        if ( this.asModal ) {
            this.trapFocus();
            this.content.focus();
        }

        ElementToggle.createCustomEvents();
        this.container.dispatchEvent( ElementToggle.openEvent as Event );

        this.deactivateButton();
    }

    /**
     * Toggles the element closed.
     */
    protected close(): void {
        // untrap focus
        if ( this.asModal ) {
            this.untrapFocus();
        }

        // returns
        if ( !this.container ) {
            this.deactivateButton();
            return;
        }

        /*
         * Adjust the data-toggle-container on the container and the aria-expanded for
         * the button.
         */
        this.allButtons.forEach( ( button ) => {
            if ( button.getAttribute( 'aria-controls' ) ) {
                button.setAttribute( 'aria-expanded', 'false' );
            }
        } );

        this.container.setAttribute( 'data-toggle-container', 'closing' );

        /*
         * Wait for animations to finish.
         */
        this.closingTimeout = setTimeout(
            () => {
                this.container.setAttribute( 'data-toggle-container', 'closed' );

                ElementToggle.createCustomEvents();
                this.container.dispatchEvent( ElementToggle.closeEvent as Event );
            },
            this.closingTime + 50,
        );

        this.deactivateButton();
    }
}

/**
 * Utilities for the {@link ElementToggle} class.
 * 
 * @since 0.1.0-alpha.7
 */
export namespace ElementToggle {

    /**
     * Gets all focusable elements within a container.
     *
     * Use this with caution and when you have control over the possible
     * children and can avoid weird edge cases (like changing contenteditable or
     * weird tabindex behaviour).
     *
     * @since ___PKG_VERSION___
     */
    export function getFocusableChildren( container: HTMLElement ) {

        const elements = Array.from(
            container.querySelectorAll<HTMLElement>(
                `a,
                button,
                input,
                textarea,
                select,
                details,
                iframe,
                embed,
                object,
                summary,
                dialog,
                audio[controls],
                video[controls],
                [contenteditable],
                [tabindex]
              `,
            )
        );

        return {
            get all(): HTMLElement[] {
                return elements;
            },

            get keyboardOnly(): HTMLElement[] {
                return this.all.filter(
                    element => {
                        // returns
                        if ( element.hasAttribute( 'disabled' ) || element.hasAttribute( 'aria-disabled' ) ) {
                            return false;
                        }

                        // returns
                        if ( element.hasAttribute( 'hidden' ) ) {
                            return false;
                        }

                        // returns
                        if ( window.getComputedStyle( element ).display === 'none' ) {
                            return false;
                        }

                        // returns
                        if ( element.tabIndex <= -1 ) {
                            return false;
                        }

                        return true;
                    }
                );
            },

            get first(): undefined | HTMLElement {
                return this.keyboardOnly[ 0 ];
            },

            get last(): undefined | HTMLElement {
                return this.keyboardOnly[ this.keyboardOnly.length - 1 ];
            },
        };
    }

    /**
     * Options for the configuration of {@link ElementToggle} instances.
     * 
     * @since 0.1.0-alpha.7
     */
    export interface Opts {

        /**
         * Default toggle active state time. In milliseconds.
         *
         * @default 
         * closingTime / 4
         * 
         * @since ___PKG_VERSION___
         */
        // TODO - create test/demo
        activeTimeoutLength: number;

        /**
         * Whether toggles should close when they are no longer the target of
         * the url's anchor.
         *
         * @default false
         */
        // TODO - create test/demo
        closeWhenUntargetted: boolean;

        /**
         * Default toggle closing time. In milliseconds.
         * 
         * @default 1800
         */
        // TODO - create test/demo
        closingTime: number;

        /**
         * Name of the computed style property to use for the closing time of
         * each element.
         *
         * @since ___PKG_VERSION___
         */
        closingTimeProperty: string;

        /**
         * Outputs information to the console.
         * 
         * @since ___PKG_VERSION___
         */
        // TODO - create test/demo
        debug: boolean;

        /**
         * Whether to output the results of constructing each toggle element as
         * it is made.
         *
         * @since ___PKG_VERSION___
         */
        logResults?: boolean;

        /**
         * Whether toggles should open when they are the target of the url's
         * anchor.
         * 
         * @default true
         */
        // TODO - create test/demo
        openWhenTargetted: boolean;
    }
}