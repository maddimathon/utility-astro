/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
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
     * @since 0.1.0-beta.0.draft
     */
    static instances = new Map();
    /**
     * @since 0.1.0-beta.0.draft
     */
    static isToggle(element) {
        return element.id ? ElementToggle.instances.has(element.id) : false;
    }
    /**
     * Changes some properties and attributes on applicable elements since this
     * is an invalidly configured toggle element.
     *
     * @since 0.1.0-alpha.7
     */
    static async abortNew(container, allButtons) {
        if (container) {
            container.setAttribute('data-toggle-container', '');
        }
        if (allButtons) {
            allButtons.forEach(button => {
                button.setAttribute('aria-disabled', 'true');
                button.removeAttribute('aria-controls');
                button.removeAttribute('aria-expanded');
            });
        }
    }
    /**
     * Queries the document for toggle containers to set them up as instances of
     * this class.
     *
     * @since 0.1.0-beta.0.draft
     */
    static async run(opts = {}) {
        document.querySelectorAll('[data-toggle-container]').forEach(async (con) => {
            if (opts.debug) {
                console.debug('ElementToggle.init()', { con });
            }
            // returns 
            if (con.id) {
                return ElementToggle.new(con, opts).then((instance) => {
                    if (!opts.debug && opts.outputResults) {
                        const msgs = [
                            `[ElementToggle] new: ${con.id ?? ''}`,
                        ];
                        if (instance) {
                            msgs.push('\ncontainer: ', instance.container, '\nopts: ', instance.opts);
                        }
                        else {
                            msgs.push('construction failed', '\ninstance: ', instance);
                        }
                        console.info(...msgs);
                    }
                });
            }
            if (!opts.debug && opts.outputResults) {
                console.info('[ElementToggle] no containers found');
            }
            return null;
        });
    }
    /**
     * Adds a 'load' event listener that then {@link ElementToggle.run}, querying
     * the document for toggle containers to set them up as instances of this
     * class.
     *
     * @since 0.1.0-alpha.7
     * @since 0.1.0-beta.0.draft — Renamed from init to runOnLoad.
     */
    static async runOnLoad(opts = {}) {
        window.addEventListener('load', () => ElementToggle.run(opts), { once: true });
    }
    /**
     * Initiates a single instance asynchronously.
     *
     * @since 0.1.0-alpha.7
     */
    static async new(container, opts = {}) {
        const containerID = container?.id;
        // returns
        if (!container || !containerID) {
            ElementToggle.abortNew(container, null);
            if (opts.debug) {
                console.debug('ElementToggle.new() - aborting; no container id', { container });
            }
            return null;
        }
        // returns
        if (ElementToggle.instances.has(containerID)) {
            return null;
        }
        const allButtons = document.querySelectorAll(`[data-toggle-primary-control=${containerID}], [data-toggle-control=${containerID}]`);
        // returns
        if (!allButtons.length) {
            ElementToggle.abortNew(container, allButtons);
            if (opts.debug) {
                console.debug('ElementToggle.new() - aborting; no buttons', { container, allButtons });
            }
            return null;
        }
        const primaryButton = document.querySelector(`[data-toggle-primary-control=${containerID}]`) ?? allButtons[0];
        // returns - invalid setup that won't work
        if (!primaryButton) {
            ElementToggle.abortNew(container, allButtons);
            if (opts.debug) {
                console.debug('ElementToggle.new() - aborting; no primary button', { container, primaryButton, allButtons });
            }
            return null;
        }
        const content = container.querySelector(`[data-toggle-content=${containerID}]`);
        // returns - invalid setup that won't work
        if (!content) {
            ElementToggle.abortNew(container, allButtons);
            if (opts.debug) {
                console.debug('ElementToggle.new() - aborting; no content element', { container, primaryButton, allButtons, content });
            }
            return null;
        }
        if (opts.debug) {
            console.debug('ElementToggle.new() - constructing', { container, primaryButton, allButtons, content });
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
            ElementToggle.openEvent = new Event('toggle-open');
        }
        if (this.closeEvent === null) {
            ElementToggle.closeEvent = new Event('toggle-close');
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
     * Timeout length to switch the button to active state, in milliseconds.
     *
     * @since 0.1.0-beta.0.draft
     */
    activeTimeoutLength;
    /**
     * The unique ID for the toggle container to set up.
     */
    container;
    content;
    primaryButton;
    allButtons;
    closingTimeout = null;
    /**
     * In milliseconds.
     */
    closingTime;
    /**
     * @since 0.1.0-beta.0.draft
     */
    toggleListener;
    /* CONSTRUCTOR
     * ====================================================================== */
    /**
     * Class constructor.
     */
    constructor(elements, 
    /** Optional configuration, if any. */
    partialOpts) {
        this.opts = {
            activeTimeoutLength: (partialOpts?.closingTime ?? 1800) / 4,
            closeWhenUntargetted: false,
            closingTime: 1800,
            debug: false,
            openWhenTargetted: true,
            ...partialOpts,
        };
        this.closingTime = this.opts.closingTime;
        this.allButtons = elements.allButtons;
        this.container = elements.container;
        this.content = elements.content;
        this.primaryButton = elements.primaryButton;
        this.activeTimeoutLength = Math.min(this.closingTime, Number.isNaN(this.opts.activeTimeoutLength) ? (this.closingTime / 4) : this.opts.activeTimeoutLength);
        this.activateButton = this.activateButton.bind(this);
        this.deactivateButton = this.deactivateButton.bind(this);
        this.handleHashChange = this.handleHashChange.bind(this);
        this.toggle = this.toggle.bind(this);
        const _activateButton = this.activateButton;
        const _toggle = this.toggle;
        this.toggleListener = function () {
            _activateButton(this);
            _toggle(this);
        };
        // returns
        if (!this.container || !this.primaryButton || !this.container.id || !this.content) {
            this.abortConstructor();
            return;
        }
        ElementToggle.instances.set(this.container.id, this);
        const contentID = this.content.id;
        this.content.setAttribute('aria-labelledby', this.primaryButton.id);
        this.content.setAttribute('role', 'region');
        this.closingTime = ElementToggle.cssTimeToMilliseconds(getComputedStyle(this.container).getPropertyValue('--toggle-closing-time'));
        const isCurrentAnchorTarget = this.opts.openWhenTargetted
            && this.checkUrlTarget(new URL(window.location.href));
        if (!isCurrentAnchorTarget) {
            this.primaryButton.removeAttribute('data-state-focus');
        }
        const defaultIsOpen = this.container.getAttribute('data-toggle-container') === 'open'
            || isCurrentAnchorTarget;
        this.allButtons.forEach((button) => {
            button.addEventListener('click', this.toggleListener);
            if (contentID) {
                if (button.getAttribute('role') == 'button'
                    || button.tagName.toLowerCase() == 'button'
                    || button.tagName.toLowerCase() == 'a') {
                    button.setAttribute('aria-controls', contentID);
                }
            }
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
        // runs async while this function continues
        ElementToggle.abortNew(this.container, this.allButtons);
        window.removeEventListener('hashchange', this.handleHashChange);
        if (this.allButtons) {
            this.allButtons.forEach(button => button.removeEventListener('click', this.toggleListener));
        }
    }
    /* UTILITIES
     * ====================================================================== */
    /**
     * @since 0.1.0-beta.0.draft
     */
    #activeTimeout;
    /**
     * @since 0.1.0-beta.0.draft
     */
    #activeStateHold = false;
    /**
     * Adds the active attribute to the buttons.
     *
     * @since 0.1.0-beta.0.draft
     */
    activateButton(button) {
        clearTimeout(this.#activeTimeout);
        this.#activeStateHold = true;
        button.setAttribute('data-state-active', 'true');
        this.#activeTimeout = setTimeout(() => {
            this.#activeStateHold = false;
        }, this.activeTimeoutLength);
    }
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
        this.deactivateButton();
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
        return hashAsId.toLowerCase() === this.container.id.toLowerCase();
    }
    /**
     * @since 0.1.0-beta.0.draft
     */
    #deactiveTimeout;
    /**
     * Removes the active attribute to the buttons.
     *
     * @since 0.1.0-beta.0.draft
     */
    deactivateButton() {
        clearTimeout(this.#deactiveTimeout);
        // sets timeout to callback and returns - waiting for the activateButton() timeout to set it back to false
        if (this.#activeStateHold) {
            this.#deactiveTimeout = setTimeout(this.deactivateButton, 50);
            return;
        }
        this.primaryButton.removeAttribute('data-state-active');
        this.allButtons.forEach(button => button.removeAttribute('data-state-active'));
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
            this.primaryButton.removeAttribute('data-state-focus');
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
        this.primaryButton.setAttribute('data-state-focus', 'true');
        this.primaryButton.addEventListener('blur', () => this.primaryButton.removeAttribute('data-state-focus'), { once: true });
        this.primaryButton.focus({
            // @ts-ignore - IDE doesn't register an error but compile does - some tsconfig shenanigans, apparently.
            focusVisible: true,
        });
    }
    /* TOGGLING
     * ====================================================================== */
    /**
     * Toggles the open/close state of the element.
     */
    toggle(button) {
        this.activateButton(button ?? this.primaryButton);
        // returns
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
    open() {
        // returns
        if (!this.allButtons || !this.container) {
            this.deactivateButton();
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
        this.deactivateButton();
    }
    /**
     * Toggles the element closed.
     */
    close() {
        // returns
        if (!this.container) {
            this.deactivateButton();
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
        this.deactivateButton();
    }
}
