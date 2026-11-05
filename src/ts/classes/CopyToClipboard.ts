/**
 * @since 0.1.0-beta.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * A class for adding copy-to-clipboard functionality to buttons (via data
 * attribute configutation).
 * 
 * @since 0.1.0-beta.0
 */
export class CopyToClipboard {
    /**
     * Queries for buttons with a data-copy-to-clipboard attribute and
     * constructs an instance of each.
     */
    public static run(
        { debug = false, ...opts }: Partial<CopyToClipboard.Opts> = {},
    ): void {

        const buttons = document.querySelectorAll( 'button[data-copy-to-clipboard]' );

        if ( debug ) {
            console.log( 'CopyToClipboard.run()', { buttons, opts: { debug, ...opts } } );
        }

        buttons.forEach(
            ( button ) => new CopyToClipboard(
                button as HTMLButtonElement,
                { debug, ...opts },
            ),
        );
    }

    /**
     * Original HTML to restore after displaying the success message. 
     */
    protected ogInnerHTML: string;

    /**
     * Success message to display when the message is copied.
     */
    protected readonly successMessage: string | null;

    /**
     * The timeout ID for changing changed text back to its original content.
     */
    protected textChangeTimeout?: ReturnType<typeof setTimeout>;

    /**
     * Timeout length to switch the button to active state, in milliseconds.
     */
    protected readonly activeTimeoutLength: number;

    /**
     * Element whose contents should be changed when the button is clicked.
     * 
     * @since 0.1.0-beta.6
     */
    public readonly messageContainer: HTMLElement;

    /**
     * Timeout length to display the success message, in milliseconds.
     */
    protected readonly messageTimeoutLength: number;

    /**
     * Additional options.
     */
    protected readonly opts: CopyToClipboard.Opts;

    /**
     * Content to copy to clipboard.
     */
    protected readonly toCopyContent: string | undefined;

    public constructor (
        /**
         * Element to listen to to copy to clipboard.
         */
        public readonly button: HTMLButtonElement,

        opts: Partial<CopyToClipboard.Opts> = {},
    ) {
        this.activateButton = this.activateButton.bind( this );
        this.deactivateButton = this.deactivateButton.bind( this );
        this.changeText = this.changeText.bind( this );
        this.clicked = this.clicked.bind( this );

        this.opts = {
            debug: opts.debug ?? false,
        };

        this.messageContainer = this.button.querySelector( '[data-copy-to-clipboard-message-container]' ) ?? this.button;

        const _msgTimeoutLength = Number(
            this.button.dataset[ 'copyToClipboardMessageTimeout' ]
        );

        this.messageTimeoutLength = Number.isNaN( _msgTimeoutLength )
            ? 1500
            : _msgTimeoutLength;

        const _activeLength = Number(
            this.button.dataset[ 'copyToClipboardActiveTimeout' ],
        );

        this.activeTimeoutLength = Math.min(
            this.messageTimeoutLength,
            Number.isNaN( _activeLength ) ? 100 : _activeLength,
        );

        this.ogInnerHTML = this.messageContainer.innerHTML;
        this.successMessage = this.button.dataset[ 'copyToClipboardSuccess' ] || null;

        this.toCopyContent = this.button.dataset[ 'copyToClipboard' ];

        if ( this.opts.debug ) {
            console.log( 'new CopyToClipboard()', {
                button: this.button,
                messageContainer: this.messageContainer,
                toCopyContent: this.toCopyContent,
                successMessage: this.successMessage,
                messageTimeoutLength: this.messageTimeoutLength,
                activeTimeoutLength: this.activeTimeoutLength,
                ogInnerHTML: this.ogInnerHTML,
            } );
        }

        // returns
        if ( !this.toCopyContent ) {
            this.button.disabled = true;
            return;
        }

        button.addEventListener( 'click', this.clicked );
    }

    #activeTimeout: ReturnType<typeof setTimeout> | undefined;
    #activeStateHold: boolean = false;

    /**
     * Adds the active attribute to the button.
     */
    protected activateButton(): void {
        clearTimeout( this.#activeTimeout );
        this.#activeStateHold = true;

        this.button.setAttribute( 'data-state-active', 'true' );

        if ( this.opts.debug ) {
            console.log( 'CopyToClipboard.activateButton()', { button: this.button } );
        }

        this.#activeTimeout = setTimeout( () => {
            this.#activeStateHold = false;
        }, this.activeTimeoutLength );
    }

    #deactiveTimeout: ReturnType<typeof setTimeout> | undefined;

    /**
     * Removes the active attribute to the button.
     */
    protected deactivateButton(): void {
        clearTimeout( this.#deactiveTimeout );

        if ( this.opts.debug ) {
            console.log( 'CopyToClipboard.deactivateButton()', { button: this.button } );
        }

        // sets timeout to callback and returns - waiting for the activateButton() timeout to set it back to false
        if ( this.#activeStateHold ) {
            this.#deactiveTimeout = setTimeout( this.deactivateButton, 50 );
            return;
        }

        this.button.removeAttribute( 'data-state-active' );
    }

    protected changeText( msg: string | null, timeoutMS: number ): void {
        this.ogInnerHTML = this.messageContainer.innerHTML;

        this.deactivateButton();

        if ( msg ) {
            this.messageContainer.innerText = msg;
            this.button.setAttribute( 'data-copy-to-clipboard-state-success', 'true' );
        }

        if ( this.opts.debug ) {
            console.log( 'CopyToClipboard.changeText()', {
                button: this.button,
                msg,
                timeoutMS,
            } );
        }

        this.textChangeTimeout = setTimeout( () => {
            this.deactivateButton();

            if ( msg ) {
                this.button.removeAttribute( 'data-copy-to-clipboard-state-success' );
                this.messageContainer.innerHTML = this.ogInnerHTML;
            }

            this.button.blur();
        }, timeoutMS );
    }

    public clicked( event: Event ): void {
        this.activateButton();

        if ( this.textChangeTimeout ) {
            this.messageContainer.innerHTML = this.ogInnerHTML;
        }

        // in case someone is clicking super-fast
        clearTimeout( this.textChangeTimeout );

        const target = event.target as null | HTMLButtonElement;

        const toCopy = target?.dataset[ 'copyToClipboard' ] ?? this.button.dataset[ 'copyToClipboard' ];

        if ( this.opts.debug ) {
            console.log( 'CopyToClipboard.clicked()', {
                button: this.button,
                messageContainer: this.messageContainer,
                target,
                toCopy,
            } );
        }

        if ( toCopy ) {
            navigator.clipboard.writeText( toCopy );
            this.changeText( this.successMessage, this.messageTimeoutLength );
        } else {
            this.deactivateButton();
        }
    }
}

/**
 * Utilities for the {@link CopyToClipboard}.
 * 
 * @since 0.1.0-beta.6
 */
export namespace CopyToClipboard {

    export interface Opts {
        debug: boolean;
    }
}