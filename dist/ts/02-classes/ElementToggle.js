/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.2.draft
 * @license MIT
 */
/**
 * Manages toggle containers made both by the Toggle component and elsewhere.
 *
 * @since 0.1.0-alpha
 */
export class ElementToggle {
    static #openEvent = null;
    static #closeEvent = null;
    /**
     * @param string  A CSS time value to convert to milliseconds.
     */
    static cssTimeToMilliseconds(string) {
        if (string.includes('ms')) {
            return Number(string.replace(/\s*ms\s*$/gi, ''));
        }
        return Number(string.replace(/\s*s\s*$/gi, '')) * 1000;
    }
    static createCustomEvents() {
        if (this.#openEvent === null) {
            this.#openEvent = new Event('toggle-open');
        }
        if (this.#closeEvent === null) {
            this.#closeEvent = new Event('toggle-close');
        }
    }
    #primaryButton = null;
    #allButtons = null;
    #container = null;
    /** @type {NodeJS.Timeout|null} */
    #closingTimeout = null;
    /** in milliseconds @type {number} */
    #closingTime = 1800;
    /**
     * Class constructor.
     *
     * @param containerID  The unique ID for the toggle container to set up.
     */
    constructor(containerID) {
        this.#container = document.querySelector(`[data-toggle-container]#${containerID}`);
        // returns
        if (!this.#container) {
            this.#abortConstructor();
            return;
        }
        const allButtons = this.#container.querySelectorAll(`[data-toggle-primary-control=${containerID}], [data-toggle-control=${containerID}]`);
        // returns
        if (!allButtons.length) {
            this.#abortConstructor();
            return;
        }
        this.#allButtons = Array.from(allButtons);
        const primaryButton = this.#container.querySelector(`[data-toggle-primary-control=${containerID}]`);
        this.#primaryButton = primaryButton ?? this.#allButtons[0];
        const content = this.#container.querySelector(`[data-toggle-content=${containerID}]`);
        // returns - invalid setup that won't work
        if (!content || !this.#allButtons.length) {
            this.#abortConstructor();
            return;
        }
        const contentID = content.id;
        content.setAttribute('aria-labelledby', this.#primaryButton.id);
        content.setAttribute('role', 'region');
        if (contentID) {
            this.#allButtons.forEach((button) => {
                if (button.getAttribute('role') == 'button'
                    || button.tagName.toUpperCase() == 'BUTTON'
                    || button.tagName.toUpperCase() == 'A') {
                    button.setAttribute('aria-controls', contentID);
                }
            });
        }
        this.#closingTime = ElementToggle.cssTimeToMilliseconds(getComputedStyle(this.#container).getPropertyValue('--toggle-closing-time'));
        const defaultIsOpen = this.#container.hasAttribute('data-toggle-container')
            && this.#container.getAttribute('data-toggle-container') === 'open';
        this.toggle = this.toggle.bind(this);
        this.#allButtons.forEach((button) => {
            button.addEventListener('click', this.toggle);
            if (button.getAttribute('aria-controls')) {
                button.removeAttribute('aria-disabled');
                button.setAttribute('aria-expanded', 'false');
            }
        });
        if (defaultIsOpen) {
            this.#open();
        }
        else {
            this.#container.setAttribute('data-toggle-container', 'closed');
        }
    }
    /**
     * Changes some properties and attributes on applicable elements since this
     * is an invalidly configured toggle element.
     */
    #abortConstructor() {
        if (this.#container) {
            this.#container.setAttribute('data-toggle-container', '');
        }
    }
    /**
     * Clears the related timeout, if any.
     */
    #clearTimeout() {
        /*
         * Clear any timeout currently running (like if someone clicks the
         * button before it's done).
         */
        if (this.#closingTimeout !== null) {
            clearTimeout(this.#closingTimeout);
        }
    }
    /**
     * Toggles the open/close state of the element.
     */
    toggle() {
        if (!this.#container) {
            return;
        }
        /*
         * Grab the current state and trigger an opening or closing function!
         */
        switch (this.#container.getAttribute('data-toggle-container')) {
            case 'closed':
                this.#clearTimeout();
                this.#open();
                break;
            case 'closing':
                break;
            case 'open':
            default:
                this.#clearTimeout();
                this.#close();
                break;
        }
    }
    /**
     * Toggles the element open.
     */
    #open() {
        if (!this.#allButtons) {
            return;
        }
        if (!this.#container) {
            return;
        }
        this.#closingTime = ElementToggle.cssTimeToMilliseconds(getComputedStyle(this.#container).getPropertyValue('--toggle-closing-time'));
        this.#container.setAttribute('data-toggle-container', 'open');
        this.#allButtons.forEach((button) => {
            if (button.getAttribute('aria-controls')) {
                button.setAttribute('aria-expanded', 'true');
            }
        });
        ElementToggle.createCustomEvents();
        this.#container.dispatchEvent(ElementToggle.#openEvent);
    }
    /**
     * Toggles the element closed.
     */
    #close() {
        if (!this.#allButtons) {
            return;
        }
        if (!this.#container) {
            return;
        }
        /*
         * Adjust the data-toggle-container on the container and the aria-expanded for
         * the button.
         */
        this.#allButtons.forEach((button) => {
            if (button.getAttribute('aria-controls')) {
                button.setAttribute('aria-expanded', 'false');
            }
        });
        this.#container.setAttribute('data-toggle-container', 'closing');
        /*
         * Wait for animations to finish.
         */
        this.#closingTimeout = setTimeout(() => {
            // Sets the data-toggle-container to closed now that animations are over.
            if (!this.#container) {
                return;
            }
            this.#container.setAttribute('data-toggle-container', 'closed');
        }, this.#closingTime + 50);
        ElementToggle.createCustomEvents();
        this.#container.dispatchEvent(ElementToggle.#closeEvent);
    }
}
//# sourceMappingURL=ElementToggle.js.map