/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.draft
 * @license MIT
 */
/**
 * Manages toggle containers made both by the Toggle component and elsewhere.
 *
 * @since 0.1.0-alpha.draft
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
    #button = null;
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
        const buttons = this.#container.querySelectorAll(`[data-toggle-control=${containerID}]`);
        // returns
        if (!buttons) {
            this.#abortConstructor();
            return;
        }
        this.#button = Array.from(buttons);
        const content = this.#container.querySelector(`[data-toggle-content=${containerID}]`);
        if (content) {
            const contentID = content.id;
            if (contentID) {
                this.#button.forEach((button) => {
                    if (button.getAttribute('role') == 'button'
                        || button.tagName == 'BUTTON'
                        || button.tagName == 'A') {
                        button.setAttribute('aria-controls', contentID);
                    }
                });
            }
        }
        this.#closingTime = ElementToggle.cssTimeToMilliseconds(getComputedStyle(this.#container).getPropertyValue('--toggle-closing-time'));
        const defaultIsOpen = this.#container.hasAttribute('data-toggle-container')
            && this.#container.getAttribute('data-toggle-container') === 'open';
        this.toggle = this.toggle.bind(this);
        this.#button.forEach((button) => {
            button.addEventListener('click', this.toggle);
            if (button.getAttribute('aria-controls')) {
                button.removeAttribute('aria-disabled');
                button.removeAttribute('aria-expanded');
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
        if (!this.#button) {
            return;
        }
        if (!this.#container) {
            return;
        }
        this.#container.setAttribute('data-toggle-container', 'open');
        this.#button.forEach((button) => {
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
        if (!this.#button) {
            return;
        }
        if (!this.#container) {
            return;
        }
        /*
         * Adjust the data-toggle-container on the container and the aria-expanded for
         * the button.
         */
        this.#button.forEach((button) => {
            if (button.getAttribute('aria-controls')) {
                button.removeAttribute('aria-expanded');
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