/**
 * @since ___PKG_VERSION___
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
 * @since ___PKG_VERSION___
 */
export class CopyToClipboard {
    /**
     * Queries for buttons with a data-copy-to-clipboard attribute and
     * constructs an instance of each.
     */
    public static run(): void {

        const buttons = document.querySelectorAll( 'button[data-copy-to-clipboard]' );

        buttons.forEach(
            ( button ) => new CopyToClipboard( button as HTMLButtonElement ),
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
     * Timeout length to display the success message, in milliseconds.
     */
    protected readonly messageTimeoutLength: number;

    /**
     * Content to copy to clipboard.
     */
    protected readonly toCopyContent: string | undefined;

    public constructor (
        /**
         * Element to listen to to copy to clipboard.
         */
        public readonly button: HTMLButtonElement,
    ) {
        this.activateButton = this.activateButton.bind( this );
        this.deactivateButton = this.deactivateButton.bind( this );
        this.changeText = this.changeText.bind( this );
        this.clicked = this.clicked.bind( this );

        const _msgLength = Number(
            this.button.dataset[ 'copyToClipboardMessageTimeout' ]
        );

        this.messageTimeoutLength = Number.isNaN( _msgLength )
            ? 1500
            : _msgLength;

        const _activeLength = Number(
            this.button.dataset[ 'copyToClipboardActiveTimeout' ],
        );

        this.activeTimeoutLength = Math.min(
            this.messageTimeoutLength,
            Number.isNaN( _activeLength ) ? 100 : _activeLength,
        );

        this.ogInnerHTML = this.button.innerHTML;
        this.successMessage = this.button.dataset[ 'copyToClipboardSuccess' ] || null;

        this.toCopyContent = this.button?.dataset[ 'copyToClipboard' ];

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

        // sets timeout to callback and returns - waiting for the activateButton() timeout to set it back to false
        if ( this.#activeStateHold ) {
            this.#deactiveTimeout = setTimeout( this.deactivateButton, 50 );
            return;
        }

        this.button.removeAttribute( 'data-state-active' );
    }

    protected changeText( msg: string | null, timeoutMS: number ): void {
        this.ogInnerHTML = this.button.innerHTML;

        this.deactivateButton();

        if ( msg ) {
            this.button.innerText = msg;
        }

        this.textChangeTimeout = setTimeout( () => {
            this.deactivateButton();

            if ( msg ) {
                this.button.innerHTML = this.ogInnerHTML;
            }

            this.button.blur();
        }, timeoutMS );
    }

    public clicked( event: Event ): void {
        this.activateButton();

        if ( this.textChangeTimeout ) {
            this.button.innerHTML = this.ogInnerHTML;
        }

        // in case someone is clicking super-fast
        clearTimeout( this.textChangeTimeout );

        const target = event.target as undefined | HTMLButtonElement;

        const toCopy = target?.dataset[ 'copyToClipboard' ];

        if ( toCopy ) {
            navigator.clipboard.writeText( toCopy );
            this.changeText( this.successMessage, this.messageTimeoutLength );
        }
    }
}