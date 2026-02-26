/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.16
 * @license MIT
 */
// import { VariableInspector } from '../../../node_modules/@maddimathon/utility-typescript/dist/classes/VariableInspector.js';
/**
 * Manages toggle containers made both by the Toggle component and elsewhere.
 *
 * @since 0.1.0-alpha
 */
export class ElementToggle {
    /**
     * Changes some properties and attributes on applicable elements since this
     * is an invalidly configured toggle element.
     *
     * @since 0.1.0-alpha.7
     */
    static abortNew(container) {
        if (container) {
            container.setAttribute('data-toggle-container', '');
        }
    }
    /**
     * Runs a standard init in an HTML document with Toggle components to set up
     * as instances of this class.
     *
     * @since 0.1.0-alpha.7
     */
    static async init(opts) {
        window.addEventListener('load', () => document.querySelectorAll('[data-toggle-container]').forEach((con) => con.id && ElementToggle.new(con, opts)));
    }
    /**
     * Initiates a single instance asynchronously.
     *
     * @since 0.1.0-alpha.7
     */
    static async new(container, opts) {
        const containerID = container?.id;
        // returns
        if (!container || !containerID) {
            ElementToggle.abortNew(container);
            return null;
        }
        const allButtons = document.querySelectorAll(`[data-toggle-primary-control=${containerID}], [data-toggle-control=${containerID}]`);
        // returns
        if (!allButtons.length) {
            ElementToggle.abortNew(container);
            return null;
        }
        const primaryButton = document.querySelector(`[data-toggle-primary-control=${containerID}]`) ?? allButtons[0];
        const content = container.querySelector(`[data-toggle-content=${containerID}]`);
        // returns - invalid setup that won't work
        if (!content) {
            ElementToggle.abortNew(container);
            return null;
        }
        return new ElementToggle({
            container,
            primaryButton,
            allButtons: Array.from(allButtons),
            content,
        }, opts);
    }
    static openEvent = null;
    static closeEvent = null;
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
        if (this.openEvent === null) {
            this.openEvent = new Event('toggle-open');
        }
        if (this.closeEvent === null) {
            this.closeEvent = new Event('toggle-close');
        }
    }
    /* LOCAL PROPS
     * ====================================================================== */
    /**
     * Optional configuration, if any.
     * @since 0.1.0-alpha.7
     */
    opts;
    /**
     * The unique ID for the toggle container to set up.
     */
    container;
    content;
    primaryButton;
    allButtons;
    /**
     * @since 0.1.0-alpha.7
     */
    containerID;
    closingTimeout = null;
    /**
     * In milliseconds.
     */
    closingTime;
    /* CONSTRUCTOR
     * ====================================================================== */
    /**
     * Class constructor.
     */
    constructor(elements, 
    /** Optional configuration, if any. */
    partialOpts) {
        this.opts = {
            closeWhenUntargetted: false,
            closingTime: 1800,
            openWhenTargetted: true,
            ...partialOpts,
        };
        this.closingTime = this.opts.closingTime;
        this.container = elements.container;
        this.primaryButton = elements.primaryButton;
        this.allButtons = elements.allButtons;
        this.content = elements.content;
        this.containerID = this.container.id;
        // returns
        if (!this.container || !this.primaryButton || !this.containerID || !this.content) {
            this.abortConstructor();
            return;
        }
        this.toggle = this.toggle.bind(this);
        this.handleHashChange = this.handleHashChange.bind(this);
        const contentID = this.content.id;
        this.content.setAttribute('aria-labelledby', this.primaryButton.id);
        this.content.setAttribute('role', 'region');
        if (contentID) {
            this.allButtons.forEach((button) => {
                if (button.getAttribute('role') == 'button'
                    || button.tagName.toUpperCase() == 'BUTTON'
                    || button.tagName.toUpperCase() == 'A') {
                    button.setAttribute('aria-controls', contentID);
                }
            });
        }
        this.closingTime = ElementToggle.cssTimeToMilliseconds(getComputedStyle(this.container).getPropertyValue('--toggle-closing-time'));
        const isCurrentAnchorTarget = this.opts.openWhenTargetted
            && this.checkUrlTarget(new URL(window.location.href));
        const defaultIsOpen = this.container.getAttribute('data-toggle-container') === 'open'
            || isCurrentAnchorTarget;
        this.allButtons.forEach((button) => {
            button.addEventListener('click', this.toggle);
            if (button.getAttribute('aria-controls')) {
                button.removeAttribute('aria-disabled');
                button.setAttribute('aria-expanded', defaultIsOpen ? 'true' : 'false');
            }
        });
        if (defaultIsOpen) {
            if (isCurrentAnchorTarget) {
                this.openAsTargetAnchor();
            }
            else {
                this.open();
            }
        }
        else {
            this.container.setAttribute('data-toggle-container', 'closed');
        }
        if (!isCurrentAnchorTarget) {
            this.primaryButton.removeAttribute('data-toggle-is-current-target');
        }
        if (this.opts.openWhenTargetted) {
            window.addEventListener('hashchange', this.handleHashChange);
        }
    }
    /**
     * {@inheritDoc ElementToggle.abortNew}
     *
     * @since 0.1.0-alpha
     */
    abortConstructor() {
        ElementToggle.abortNew(this.container);
    }
    /* UTILITIES
     * ====================================================================== */
    /**
     * Clears the related timeout, if any.
     */
    clearTimeout() {
        /*
         * Clear any timeout currently running (like if someone clicks the
         * button before it's done).
         */
        if (this.closingTimeout !== null) {
            clearTimeout(this.closingTimeout);
        }
    }
    /**
     * Checks the current url anchor target and checks if it matches the id of
     * this toggle element.
     *
     * @since 0.1.0-alpha.7
     */
    checkUrlTarget(url) {
        // returns
        if (!url.hash) {
            return false;
        }
        const hashAsId = url.hash.replace(/^#/gi, '');
        return hashAsId.toLowerCase() === this.containerID.toLowerCase();
    }
    /**
     * If applicable (by opts), checks if the current url anchor targets
     * this toggle and if so, opens it.
     *
     * @since 0.1.0-alpha.7
     */
    handleHashChange(event) {
        // returns
        if (!this.opts.openWhenTargetted) {
            return;
        }
        const isNewTarget = this.checkUrlTarget(new URL(event.newURL));
        if (!isNewTarget) {
            this.primaryButton.removeAttribute('data-toggle-is-current-target');
        }
        if (isNewTarget) {
            this.openAsTargetAnchor();
        }
        if (!isNewTarget
            && this.opts.closeWhenUntargetted
            && this.checkUrlTarget(new URL(event.oldURL))
            && this.container.getAttribute('data-toggle-container') === 'open') {
            this.close();
        }
    }
    /**
     * Opens the toggle element as if this is the current url anchor target.
     * Opens regardless of the current `this.opts.openWhenTargetted` value.
     *
     * @since 0.1.0-alpha.7
     */
    openAsTargetAnchor() {
        this.open();
        this.primaryButton.setAttribute('data-toggle-is-current-target', 'true');
        this.primaryButton.addEventListener('blur', () => this.primaryButton.removeAttribute('data-toggle-is-current-target'), { once: true });
        this.primaryButton.focus({
            // @ts-expect-error
            focusVisible: true,
        });
    }
    /* TOGGLING
     * ====================================================================== */
    /**
     * Toggles the open/close state of the element.
     */
    toggle() {
        if (!this.container) {
            return;
        }
        /*
         * Grab the current state and trigger an opening or closing function!
         */
        switch (this.container.getAttribute('data-toggle-container')) {
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
    open() {
        if (!this.allButtons) {
            return;
        }
        if (!this.container) {
            return;
        }
        this.closingTime = ElementToggle.cssTimeToMilliseconds(getComputedStyle(this.container).getPropertyValue('--toggle-closing-time'));
        this.container.setAttribute('data-toggle-container', 'open');
        this.allButtons.forEach((button) => {
            if (button.getAttribute('aria-controls')) {
                button.setAttribute('aria-expanded', 'true');
            }
        });
        ElementToggle.createCustomEvents();
        this.container.dispatchEvent(ElementToggle.openEvent);
    }
    /**
     * Toggles the element closed.
     */
    close() {
        if (!this.allButtons) {
            return;
        }
        if (!this.container) {
            return;
        }
        /*
         * Adjust the data-toggle-container on the container and the aria-expanded for
         * the button.
         */
        this.allButtons.forEach((button) => {
            if (button.getAttribute('aria-controls')) {
                button.setAttribute('aria-expanded', 'false');
            }
        });
        this.container.setAttribute('data-toggle-container', 'closing');
        /*
         * Wait for animations to finish.
         */
        this.closingTimeout = setTimeout(() => {
            // Sets the data-toggle-container to closed now that animations are over.
            if (!this.container) {
                return;
            }
            this.container.setAttribute('data-toggle-container', 'closed');
        }, this.closingTime + 50);
        ElementToggle.createCustomEvents();
        this.container.dispatchEvent(ElementToggle.closeEvent);
    }
}
//# sourceMappingURL=ElementToggle.js.map