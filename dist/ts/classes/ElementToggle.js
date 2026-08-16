/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _ElementToggle_activeTimeout, _ElementToggle_activeStateHold, _ElementToggle_deactiveTimeout, _ElementToggle_focusableContainerChildren, _ElementToggle_focusableContentChildren, _ElementToggle_focusTrappers;
/**
 * Manages toggle containers made both by the Toggle component and elsewhere.
 *
 * @since 0.1.0-alpha
 */
export class ElementToggle {
    /**
     * @since 0.1.0-beta.0.draft
     */
    static isToggle(element) {
        return element.id ? _a.instances.has(element.id) : false;
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
                return _a.new(con, opts).then((instance) => {
                    var _b;
                    if (!opts.debug && opts.logResults) {
                        const msgs = [
                            `[ElementToggle] new: ${(_b = con.id) !== null && _b !== void 0 ? _b : ''}`,
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
            if (!opts.debug && opts.logResults) {
                console.info('[ElementToggle] no valid container found');
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
        window.addEventListener('load', () => _a.run(opts), { once: true });
    }
    /**
     * Initiates a single instance asynchronously.
     *
     * @since 0.1.0-alpha.7
     */
    static async new(container, opts = {}) {
        var _b;
        const containerID = container === null || container === void 0 ? void 0 : container.id;
        // returns
        if (!container || !containerID) {
            _a.abortNew(container, null);
            if (opts.debug) {
                console.debug('ElementToggle.new() - aborting; no container id', { container });
            }
            return null;
        }
        // returns
        if (_a.instances.has(containerID)) {
            return null;
        }
        const allButtons = document.querySelectorAll(`[data-toggle-primary-control=${containerID}], [data-toggle-control=${containerID}]`);
        // returns
        if (!allButtons.length) {
            _a.abortNew(container, allButtons);
            if (opts.debug) {
                console.debug('ElementToggle.new() - aborting; no buttons', { container, allButtons });
            }
            return null;
        }
        const primaryButton = (_b = document.querySelector(`[data-toggle-primary-control=${containerID}]`)) !== null && _b !== void 0 ? _b : allButtons[0];
        // returns - invalid setup that won't work
        if (!primaryButton) {
            _a.abortNew(container, allButtons);
            if (opts.debug) {
                console.debug('ElementToggle.new() - aborting; no primary button', { container, primaryButton, allButtons });
            }
            return null;
        }
        const content = container.querySelector(`[data-toggle-content=${containerID}]`);
        // returns - invalid setup that won't work
        if (!content) {
            _a.abortNew(container, allButtons);
            if (opts.debug) {
                console.debug('ElementToggle.new() - aborting; no content element', { container, primaryButton, allButtons, content });
            }
            return null;
        }
        if (opts.debug) {
            console.debug('ElementToggle.new() - constructing', { container, primaryButton, allButtons, content });
        }
        return new _a({
            container,
            primaryButton,
            allButtons: Array.from(allButtons),
            content,
        }, opts);
    }
    /**
     * @param string  A CSS time value to convert to milliseconds.
     */
    static cssTimeToMilliseconds(string) {
        // returns
        if (typeof string === 'number') {
            return string;
        }
        // returns
        if (string.includes('ms')) {
            return Number(string.replace(/\s*ms\s*$/gi, ''));
        }
        return Number(string.replace(/\s*s\s*$/gi, '')) * 1000;
    }
    static createCustomEvents() {
        if (this.openEvent === null) {
            _a.openEvent = new Event('toggle-open');
        }
        if (this.closeEvent === null) {
            _a.closeEvent = new Event('toggle-close');
        }
    }
    /**
     * Whether this container is currently open.
     *
     * @since 0.1.0-beta.0.draft
     */
    get isOpen() {
        return this.container.getAttribute('data-toggle-container') === 'open';
    }
    /* CONSTRUCTOR
     * ====================================================================== */
    /**
     * Class constructor.
     */
    constructor(elements, 
    /** Optional configuration, if any. */
    partialOpts) {
        var _b, _c, _d;
        this.closingTimeout = null;
        /* UTILITIES
         * ====================================================================== */
        /**
         * @since 0.1.0-beta.0.draft
         */
        _ElementToggle_activeTimeout.set(this, void 0);
        /**
         * @since 0.1.0-beta.0.draft
         */
        _ElementToggle_activeStateHold.set(this, false);
        /**
         * @since 0.1.0-beta.0.draft
         */
        _ElementToggle_deactiveTimeout.set(this, void 0);
        _ElementToggle_focusableContainerChildren.set(this, void 0);
        _ElementToggle_focusableContentChildren.set(this, void 0);
        _ElementToggle_focusTrappers.set(this, void 0);
        this.opts = Object.assign({ activeTimeoutLength: ((_b = partialOpts === null || partialOpts === void 0 ? void 0 : partialOpts.closingTime) !== null && _b !== void 0 ? _b : 1800) / 4, closeWhenUntargetted: false, closingTime: 1800, closingTimeProperty: '--toggle-closing-time', debug: false, openWhenTargetted: true }, partialOpts);
        this.closingTime = this.opts.closingTime;
        this.allButtons = elements.allButtons;
        this.container = elements.container;
        this.content = elements.content;
        this.primaryButton = elements.primaryButton;
        this.attr = {
            active: this.container.dataset['toggleAttrStateActive'] || 'data-state-active',
            focus: this.container.dataset['toggleAttrStateFocus'] || 'data-state-focus',
        };
        const _containerType = (_d = (_c = this.container.dataset['toggleContainerType']) === null || _c === void 0 ? void 0 : _c.split(',')) !== null && _d !== void 0 ? _d : [];
        this.isMenu = _containerType.includes('menu');
        this.asModal = this.isMenu || _containerType.includes('modal');
        this.isNav = _containerType.includes('nav')
            || (!this.isMenu && (this.container.role === 'navigation'
                || this.container.tagName.toLowerCase() === 'nav'));
        if (this.opts.debug) {
            console.debug('new ElementToggle()', {
                id: this.container.id,
                attr: this.attr,
                asModal: this.asModal,
                isMenu: this.isMenu,
                isNav: this.isNav,
            });
        }
        this.activeTimeoutLength = Math.min(this.closingTime, Number.isNaN(this.opts.activeTimeoutLength) ? (this.closingTime / 4) : this.opts.activeTimeoutLength);
        this.activateButton = this.activateButton.bind(this);
        this.deactivateButton = this.deactivateButton.bind(this);
        this.handleHashChange = this.handleHashChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.validateButton = this.validateButton.bind(this);
        const _activateButton = this.activateButton;
        const _toggle = this.toggle;
        this.toggleListener = function () {
            _activateButton(this);
            _toggle(this);
        };
        const isCurrentAnchorTarget = this.opts.openWhenTargetted
            && this.checkUrlTarget(new URL(window.location.href));
        this.defaultIsOpen = this.isOpen || isCurrentAnchorTarget;
        // returns
        if (!this.container || !this.primaryButton || !this.container.id || !this.content) {
            this.abortConstructor();
            return;
        }
        _a.instances.set(this.container.id, this);
        this.setClosingTime();
        if (!isCurrentAnchorTarget) {
            this.primaryButton.removeAttribute(this.attr.focus);
        }
        Promise.all(this.allButtons.map(this.validateButton)).then(() => {
            if (this.defaultIsOpen) {
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
        });
    }
    /**
     * Validates the markup of a button used to toggle this element.
     *
     * @since 0.1.0-beta.0.draft
     */
    async validateButton(button) {
        const contentID = this.content.id;
        button.addEventListener('click', this.toggleListener);
        if (contentID) {
            if (button.role == 'button'
                || button.tagName.toLowerCase() == 'button'
                || button.tagName.toLowerCase() == 'a') {
                button.setAttribute('aria-controls', contentID);
            }
        }
        if (button.getAttribute('aria-controls')) {
            button.removeAttribute('aria-disabled');
            button.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
            if (this.asModal) {
                button.setAttribute('aria-haspopup', 'dialog');
                this.content.role = 'dialog';
            }
        }
    }
    /**
     * {@inheritDoc ElementToggle.abortNew}
     *
     * @since 0.1.0-alpha
     */
    abortConstructor() {
        // runs async while this function continues
        _a.abortNew(this.container, this.allButtons);
        window.removeEventListener('hashchange', this.handleHashChange);
        if (this.allButtons) {
            this.allButtons.forEach(button => button.removeEventListener('click', this.toggleListener));
        }
    }
    /**
     * Adds the active attribute to the buttons.
     *
     * @since 0.1.0-beta.0.draft
     */
    activateButton(button) {
        clearTimeout(__classPrivateFieldGet(this, _ElementToggle_activeTimeout, "f"));
        __classPrivateFieldSet(this, _ElementToggle_activeStateHold, true, "f");
        button.setAttribute(this.attr.active, 'true');
        __classPrivateFieldSet(this, _ElementToggle_activeTimeout, setTimeout(() => {
            __classPrivateFieldSet(this, _ElementToggle_activeStateHold, false, "f");
        }, this.activeTimeoutLength), "f");
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
     * Removes the active attribute to the buttons.
     *
     * @since 0.1.0-beta.0.draft
     */
    deactivateButton() {
        clearTimeout(__classPrivateFieldGet(this, _ElementToggle_deactiveTimeout, "f"));
        // sets timeout to callback and returns - waiting for the activateButton() timeout to set it back to false
        if (__classPrivateFieldGet(this, _ElementToggle_activeStateHold, "f")) {
            __classPrivateFieldSet(this, _ElementToggle_deactiveTimeout, setTimeout(this.deactivateButton, 50), "f");
            return;
        }
        this.primaryButton.removeAttribute(this.attr.active);
        this.allButtons.forEach(button => button.removeAttribute(this.attr.active));
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
            this.primaryButton.removeAttribute(this.attr.focus);
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
        this.primaryButton.setAttribute(this.attr.focus, 'true');
        this.primaryButton.addEventListener('blur', () => this.primaryButton.removeAttribute(this.attr.focus), { once: true });
        this.primaryButton.focus({
            // @ts-ignore - IDE doesn't register an error but compile does - some tsconfig shenanigans, apparently.
            focusVisible: true,
        });
    }
    /**
     * The methods used as event listeners for trapping focus.
     *
     * @since 0.1.0-beta.0.draft
     */
    get focusableContainerChildren() {
        // returns
        if (__classPrivateFieldGet(this, _ElementToggle_focusableContainerChildren, "f")) {
            return __classPrivateFieldGet(this, _ElementToggle_focusableContainerChildren, "f");
        }
        __classPrivateFieldSet(this, _ElementToggle_focusableContainerChildren, _a.getFocusableChildren(this.container), "f");
        return __classPrivateFieldGet(this, _ElementToggle_focusableContainerChildren, "f");
    }
    /**
     * The methods used as event listeners for trapping focus.
     *
     * @since 0.1.0-beta.0.draft
     */
    get focusableContentChildren() {
        // returns
        if (__classPrivateFieldGet(this, _ElementToggle_focusableContentChildren, "f")) {
            return __classPrivateFieldGet(this, _ElementToggle_focusableContentChildren, "f");
        }
        __classPrivateFieldSet(this, _ElementToggle_focusableContentChildren, _a.getFocusableChildren(this.content), "f");
        return __classPrivateFieldGet(this, _ElementToggle_focusableContentChildren, "f");
    }
    /**
     * The methods used as event listeners for trapping focus.
     *
     * @since 0.1.0-beta.0.draft
     */
    get focusTrappers() {
        // returns
        if (__classPrivateFieldGet(this, _ElementToggle_focusTrappers, "f")) {
            return __classPrivateFieldGet(this, _ElementToggle_focusTrappers, "f");
        }
        const container = this.container;
        const focusableContainerChildren = this.focusableContainerChildren;
        const primaryButton = this.primaryButton;
        const toggleClose = this.close.bind(this);
        __classPrivateFieldSet(this, _ElementToggle_focusTrappers, {
            keydown: function (event) {
                // escape key should close modals
                if (event.code === 'Escape') {
                    toggleClose();
                }
            },
            first: function (event) {
                var _b;
                // if the newly-focused element is outside the container, we should redirect focus
                if (event.relatedTarget
                    && !container.contains(event.relatedTarget)) {
                    ((_b = focusableContainerChildren.last) !== null && _b !== void 0 ? _b : primaryButton).focus();
                }
            },
            last: function (event) {
                var _b;
                // if the newly-focused element is outside the container, we should redirect focus
                if (event.relatedTarget
                    && !container.contains(event.relatedTarget)) {
                    ((_b = focusableContainerChildren.first) !== null && _b !== void 0 ? _b : primaryButton).focus();
                }
            },
            any: function (event) {
                var _b;
                // if the newly-focused element is outside the container, we should redirect focus
                if (event.relatedTarget
                    && !container.contains(event.relatedTarget)) {
                    ((_b = focusableContainerChildren.first) !== null && _b !== void 0 ? _b : primaryButton).focus();
                }
            },
        }, "f");
        return __classPrivateFieldGet(this, _ElementToggle_focusTrappers, "f");
    }
    /**
     * Sets the closing time property via computed style value.
     *
     * @since 0.1.0-beta.0.draft
     */
    setClosingTime() {
        const computedClosingTime = getComputedStyle(this.container).getPropertyValue(this.opts.closingTimeProperty);
        this.closingTime = _a.cssTimeToMilliseconds((computedClosingTime === null || computedClosingTime === void 0 ? void 0 : computedClosingTime.length) ? computedClosingTime : this.opts.closingTime);
    }
    /**
     * Called when the element is toggled open.
     *
     * @since 0.1.0-beta.0.draft
     */
    trapFocus() {
        // returns - untraps focus first
        if (!this.isOpen) {
            this.untrapFocus();
            return;
        }
        const focusableContainerChildren = this.focusableContainerChildren;
        const focusTrappers = this.focusTrappers;
        document.addEventListener('keydown', focusTrappers.keydown, { capture: true });
        // add listeners to all children, but special listeners for the first and last
        focusableContainerChildren.all.forEach((element) => {
            var _b, _c;
            // returns
            if (element.isSameNode((_b = focusableContainerChildren.first) !== null && _b !== void 0 ? _b : null)) {
                element.addEventListener('blur', focusTrappers.first);
                return;
            }
            // returns
            if (element.isSameNode((_c = focusableContainerChildren.last) !== null && _c !== void 0 ? _c : null)) {
                element.addEventListener('blur', focusTrappers.last);
                return;
            }
            element.addEventListener('blur', focusTrappers.any);
        });
    }
    /**
     * Called when the element is toggled closed.
     *
     * @since 0.1.0-beta.0.draft
     */
    untrapFocus() {
        const focusableContainerChildren = this.focusableContainerChildren;
        const focusTrappers = this.focusTrappers;
        // add listeners to all children, but special listeners for the first and last
        focusableContainerChildren.all.forEach((element) => {
            // returns
            if (!focusTrappers) {
                return;
            }
            document.removeEventListener('keydown', focusTrappers.keydown, { capture: true });
            element.removeEventListener('blur', focusTrappers.first);
            element.removeEventListener('blur', focusTrappers.last);
            element.removeEventListener('blur', focusTrappers.any);
        });
    }
    /* TOGGLING
     * ====================================================================== */
    /**
     * Toggles the open/close state of the element.
     */
    toggle(button) {
        this.activateButton(button !== null && button !== void 0 ? button : this.primaryButton);
        // returns
        if (!this.container) {
            return;
        }
        /*
         * Grab the current state and trigger an opening or closing function!
         */
        switch (this.container.getAttribute('data-toggle-container')) {
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
    open() {
        // returns
        if (!this.allButtons || !this.container) {
            this.deactivateButton();
            return;
        }
        this.setClosingTime();
        this.container.setAttribute('data-toggle-container', 'open');
        this.allButtons.forEach((button) => {
            if (button.getAttribute('aria-controls')) {
                button.setAttribute('aria-expanded', 'true');
            }
        });
        // trap focus
        if (this.asModal) {
            this.trapFocus();
            this.content.focus();
        }
        _a.createCustomEvents();
        this.container.dispatchEvent(_a.openEvent);
        this.deactivateButton();
    }
    /**
     * Toggles the element closed.
     */
    close() {
        // untrap focus
        if (this.asModal) {
            this.untrapFocus();
        }
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
            this.container.setAttribute('data-toggle-container', 'closed');
            _a.createCustomEvents();
            this.container.dispatchEvent(_a.closeEvent);
        }, this.closingTime + 50);
        this.deactivateButton();
    }
}
_a = ElementToggle, _ElementToggle_activeTimeout = new WeakMap(), _ElementToggle_activeStateHold = new WeakMap(), _ElementToggle_deactiveTimeout = new WeakMap(), _ElementToggle_focusableContainerChildren = new WeakMap(), _ElementToggle_focusableContentChildren = new WeakMap(), _ElementToggle_focusTrappers = new WeakMap();
/**
 * A map of existing successfully-registered instances of this class. Helps
 * to avoid re-initializing the same element or a block with the same id
 * value.
 *
 * @since 0.1.0-beta.0.draft
 */
ElementToggle.instances = new Map();
ElementToggle.openEvent = null;
ElementToggle.closeEvent = null;
/**
 * Utilities for the {@link ElementToggle} class.
 *
 * @since 0.1.0-alpha.7
 */
(function (ElementToggle) {
    /**
     * Gets all focusable elements within a container.
     *
     * Use this with caution and when you have control over the possible
     * children and can avoid weird edge cases (like changing contenteditable or
     * weird tabindex behaviour).
     *
     * @since 0.1.0-beta.0.draft
     */
    function getFocusableChildren(container) {
        const elements = Array.from(container.querySelectorAll(`a,
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
              `));
        return {
            get all() {
                return elements;
            },
            get keyboardOnly() {
                return this.all.filter(element => {
                    // returns
                    if (element.hasAttribute('disabled') || element.hasAttribute('aria-disabled')) {
                        return false;
                    }
                    // returns
                    if (element.hasAttribute('hidden')) {
                        return false;
                    }
                    // returns
                    if (window.getComputedStyle(element).display === 'none') {
                        return false;
                    }
                    // returns
                    if (element.tabIndex <= -1) {
                        return false;
                    }
                    return true;
                });
            },
            get first() {
                return this.keyboardOnly[0];
            },
            get last() {
                return this.keyboardOnly[this.keyboardOnly.length - 1];
            },
        };
    }
    ElementToggle.getFocusableChildren = getFocusableChildren;
})(ElementToggle || (ElementToggle = {}));
