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
    protected static abortNew(
        container: HTMLElement | null | undefined,
        allButtons: NodeListOf<Element> | Element[] | null | undefined,
    ): void {

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
                    return ElementToggle.new( con as HTMLElement, opts );
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

        window.addEventListener( 'load', () => ElementToggle.run( opts ) );
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
    public static cssTimeToMilliseconds( string: string ): number {

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



    /* CONSTRUCTOR
     * ====================================================================== */

    /** 
     * Class constructor.
     */
    public constructor (

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
            closeWhenUntargetted: false,
            closingTime: 1800,
            debug: false,
            openWhenTargetted: true,
            ...partialOpts,
        };

        this.closingTime = this.opts.closingTime;

        this.container = elements.container;
        this.primaryButton = elements.primaryButton;
        this.allButtons = elements.allButtons;
        this.content = elements.content;

        // returns
        if ( !this.container || !this.primaryButton || !this.container.id || !this.content ) {
            this.abortConstructor();
            return;
        }

        ElementToggle.instances.set( this.container.id, this );

        this.toggle = this.toggle.bind( this );
        this.handleHashChange = this.handleHashChange.bind( this );

        const contentID = this.content.id;

        this.content.setAttribute( 'aria-labelledby', this.primaryButton.id );
        this.content.setAttribute( 'role', 'region' );

        if ( contentID ) {
            this.allButtons.forEach( ( button ) => {

                if (
                    button.getAttribute( 'role' ) == 'button'
                    || button.tagName.toUpperCase() == 'BUTTON'
                    || button.tagName.toUpperCase() == 'A'
                ) {
                    button.setAttribute( 'aria-controls', contentID );
                }
            } );
        }

        this.closingTime = ElementToggle.cssTimeToMilliseconds(
            getComputedStyle( this.container ).getPropertyValue( '--toggle-closing-time' )
        );

        const isCurrentAnchorTarget = this.opts.openWhenTargetted
            && this.checkUrlTarget( new URL( window.location.href ) );

        const defaultIsOpen =
            this.container.getAttribute( 'data-toggle-container' ) === 'open'
            || isCurrentAnchorTarget;

        this.allButtons.forEach( ( button ) => {
            button.addEventListener( 'click', this.toggle );

            if ( button.getAttribute( 'aria-controls' ) ) {
                button.removeAttribute( 'aria-disabled' );
                button.setAttribute( 'aria-expanded', defaultIsOpen ? 'true' : 'false' );
            }
        } );

        if ( defaultIsOpen ) {

            if ( isCurrentAnchorTarget ) {
                this.openAsTargetAnchor();
            } else {
                this.open();
            }
        } else {
            this.container.setAttribute( 'data-toggle-container', 'closed' );
        }

        if ( !isCurrentAnchorTarget ) {
            this.primaryButton.removeAttribute( 'data-toggle-is-current-target' );
        }

        if ( this.opts.openWhenTargetted ) {
            window.addEventListener( 'hashchange', this.handleHashChange );
        }
    }

    /**
     * {@inheritDoc ElementToggle.abortNew}
     * 
     * @since 0.1.0-alpha
     */
    protected abortConstructor(): void {
        ElementToggle.abortNew( this.container, this.allButtons );
    }



    /* UTILITIES
     * ====================================================================== */

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
            this.primaryButton.removeAttribute( 'data-toggle-is-current-target' );
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

        this.primaryButton.setAttribute( 'data-toggle-is-current-target', 'true' );

        this.primaryButton.addEventListener(
            'blur',
            () => this.primaryButton.removeAttribute( 'data-toggle-is-current-target' ),
            { once: true },
        );

        this.primaryButton.focus( {
            // @ts-ignore - IDE doesn't register an error but compile does - some tsconfig shenanigans, apparently.
            focusVisible: true,
        } );
    }



    /* TOGGLING
     * ====================================================================== */

    /**
     * Toggles the open/close state of the element.
     */
    public toggle(): void {
        if ( !this.container ) { return; }

        /*
         * Grab the current state and trigger an opening or closing function!
         */
        switch ( this.container.getAttribute( 'data-toggle-container' ) ) {

            case 'closed':
                this.clearTimeout();
                this.open();
                break;

            case 'closing':
                break;

            case 'open':
            default:
                this.clearTimeout();
                this.close();
                break;
        }
    }

    /**
     * Toggles the element open.
     */
    protected open(): void {
        if ( !this.allButtons ) { return; }
        if ( !this.container ) { return; }

        this.closingTime = ElementToggle.cssTimeToMilliseconds(
            getComputedStyle( this.container ).getPropertyValue( '--toggle-closing-time' )
        );

        this.container.setAttribute( 'data-toggle-container', 'open' );

        this.allButtons.forEach( ( button ) => {
            if ( button.getAttribute( 'aria-controls' ) ) {
                button.setAttribute( 'aria-expanded', 'true' );
            }
        } );

        ElementToggle.createCustomEvents();
        this.container.dispatchEvent( ElementToggle.openEvent as Event );
    }

    /**
     * Toggles the element closed.
     */
    protected close(): void {
        if ( !this.allButtons ) { return; }
        if ( !this.container ) { return; }

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
        this.closingTimeout = setTimeout( () => {
            // Sets the data-toggle-container to closed now that animations are over.
            if ( !this.container ) { return; }
            this.container.setAttribute( 'data-toggle-container', 'closed' );
        }, this.closingTime + 50 );

        ElementToggle.createCustomEvents();
        this.container.dispatchEvent( ElementToggle.closeEvent as Event );
    }
}

/**
 * Utilities for the {@link ElementToggle} class.
 * 
 * @since 0.1.0-alpha.7
 */
export namespace ElementToggle {

    /**
     * Options for the configuration of {@link ElementToggle} instances.
     * 
     * @since 0.1.0-alpha.7
     */
    export interface Opts {

        /**
         * Whether toggles should close when they are no longer the target of
         * the url's anchor.
         *
         * @default false
         */
        // TODO - create test/demo
        closeWhenUntargetted: boolean;

        /**
         * Default toggle closing time.
         * 
         * @default 1800
         */
        // TODO - create test/demo
        closingTime: number;

        /**
         * Outputs information to the console.
         * 
         * @since ___PKG_VERSION___
         */
        // TODO - create test/demo
        debug: boolean;

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