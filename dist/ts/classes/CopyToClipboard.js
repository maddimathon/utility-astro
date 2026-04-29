/**
 * @since 0.1.0-beta.0.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */
/**
 * A class for adding copy-to-clipboard functionality to buttons (via data
 * attribute configutation).
 *
 * @since 0.1.0-beta.0.draft
 */
export class CopyToClipboard {
    button;
    /**
     * Queries for buttons with a data-copy-to-clipboard attribute and
     * constructs an instance of each.
     */
    static run() {
        const buttons = document.querySelectorAll('button[data-copy-to-clipboard]');
        buttons.forEach((button) => new CopyToClipboard(button));
    }
    /**
     * Original HTML to restore after displaying the success message.
     */
    ogInnerHTML;
    /**
     * Success message to display when the message is copied.
     */
    successMessage;
    /**
     * The timeout ID for changing changed text back to its original content.
     */
    textChangeTimeout;
    /**
     * Timeout length to switch the button to active state, in milliseconds.
     */
    activeTimeoutLength;
    /**
     * Timeout length to display the success message, in milliseconds.
     */
    messageTimeoutLength;
    /**
     * Content to copy to clipboard.
     */
    toCopyContent;
    constructor(
    /**
     * Element to listen to to copy to clipboard.
     */
    button) {
        this.button = button;
        this.activateButton = this.activateButton.bind(this);
        this.deactivateButton = this.deactivateButton.bind(this);
        this.changeText = this.changeText.bind(this);
        this.clicked = this.clicked.bind(this);
        const _msgLength = Number(this.button.dataset['copyToClipboardMessageTimeout']);
        this.messageTimeoutLength = Number.isNaN(_msgLength)
            ? 1500
            : _msgLength;
        const _activeLength = Number(this.button.dataset['copyToClipboardActiveTimeout']);
        this.activeTimeoutLength = Math.min(this.messageTimeoutLength, Number.isNaN(_activeLength) ? 100 : _activeLength);
        this.ogInnerHTML = this.button.innerHTML;
        this.successMessage = this.button.dataset['copyToClipboardSuccess'] || null;
        this.toCopyContent = this.button?.dataset['copyToClipboard'];
        // returns
        if (!this.toCopyContent) {
            this.button.disabled = true;
            return;
        }
        button.addEventListener('click', this.clicked);
    }
    #activeTimeout;
    #activeStateHold = false;
    /**
     * Adds the active attribute to the button.
     */
    activateButton() {
        clearTimeout(this.#activeTimeout);
        this.#activeStateHold = true;
        this.button.setAttribute('data-state-active', 'true');
        this.#activeTimeout = setTimeout(() => {
            this.#activeStateHold = false;
        }, this.activeTimeoutLength);
    }
    #deactiveTimeout;
    /**
     * Removes the active attribute to the button.
     */
    deactivateButton() {
        clearTimeout(this.#deactiveTimeout);
        // sets timeout to callback and returns - waiting for the activateButton() timeout to set it back to false
        if (this.#activeStateHold) {
            this.#deactiveTimeout = setTimeout(this.deactivateButton, 50);
            return;
        }
        this.button.removeAttribute('data-state-active');
    }
    changeText(msg, timeoutMS) {
        this.ogInnerHTML = this.button.innerHTML;
        this.deactivateButton();
        if (msg) {
            this.button.innerText = msg;
        }
        this.textChangeTimeout = setTimeout(() => {
            this.deactivateButton();
            if (msg) {
                this.button.innerHTML = this.ogInnerHTML;
            }
            this.button.blur();
        }, timeoutMS);
    }
    clicked(event) {
        this.activateButton();
        if (this.textChangeTimeout) {
            this.button.innerHTML = this.ogInnerHTML;
        }
        // in case someone is clicking super-fast
        clearTimeout(this.textChangeTimeout);
        const target = event.target;
        const toCopy = target?.dataset['copyToClipboard'];
        if (toCopy) {
            navigator.clipboard.writeText(toCopy);
            this.changeText(this.successMessage, this.messageTimeoutLength);
        }
    }
}
