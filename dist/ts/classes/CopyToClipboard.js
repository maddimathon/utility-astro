/**
 * @since 0.1.0-beta.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.2.2
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _CopyToClipboard_activeTimeout, _CopyToClipboard_activeStateHold, _CopyToClipboard_deactiveTimeout;
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
    static run(_a = {}) {
        var { debug = false } = _a, opts = __rest(_a, ["debug"]);
        const buttons = document.querySelectorAll('button[data-copy-to-clipboard]');
        if (debug) {
            console.log('CopyToClipboard.run()', { buttons, opts: Object.assign({ debug }, opts) });
        }
        buttons.forEach((button) => new CopyToClipboard(button, Object.assign({ debug }, opts)));
    }
    constructor(
    /**
     * Element to listen to to copy to clipboard.
     */
    button, opts = {}) {
        var _a, _b;
        this.button = button;
        _CopyToClipboard_activeTimeout.set(this, void 0);
        _CopyToClipboard_activeStateHold.set(this, false);
        _CopyToClipboard_deactiveTimeout.set(this, void 0);
        this.activateButton = this.activateButton.bind(this);
        this.deactivateButton = this.deactivateButton.bind(this);
        this.changeText = this.changeText.bind(this);
        this.clicked = this.clicked.bind(this);
        this.opts = {
            debug: (_a = opts.debug) !== null && _a !== void 0 ? _a : false,
        };
        this.messageContainer = (_b = this.button.querySelector('[data-copy-to-clipboard-message-container]')) !== null && _b !== void 0 ? _b : this.button;
        const _msgTimeoutLength = Number(this.button.dataset['copyToClipboardMessageTimeout']);
        this.messageTimeoutLength = Number.isNaN(_msgTimeoutLength)
            ? 1500
            : _msgTimeoutLength;
        const _activeLength = Number(this.button.dataset['copyToClipboardActiveTimeout']);
        this.activeTimeoutLength = Math.min(this.messageTimeoutLength, Number.isNaN(_activeLength) ? 100 : _activeLength);
        this.ogInnerHTML = this.messageContainer.innerHTML;
        this.successMessage = this.button.dataset['copyToClipboardSuccess'] || null;
        this.toCopyContent = this.button.dataset['copyToClipboard'];
        if (this.opts.debug) {
            console.log('new CopyToClipboard()', {
                button: this.button,
                messageContainer: this.messageContainer,
                toCopyContent: this.toCopyContent,
                successMessage: this.successMessage,
                messageTimeoutLength: this.messageTimeoutLength,
                activeTimeoutLength: this.activeTimeoutLength,
                ogInnerHTML: this.ogInnerHTML,
            });
        }
        // returns
        if (!this.toCopyContent) {
            this.button.disabled = true;
            return;
        }
        button.addEventListener('click', this.clicked);
    }
    /**
     * Adds the active attribute to the button.
     */
    activateButton() {
        clearTimeout(__classPrivateFieldGet(this, _CopyToClipboard_activeTimeout, "f"));
        __classPrivateFieldSet(this, _CopyToClipboard_activeStateHold, true, "f");
        this.button.setAttribute('data-state-active', 'true');
        if (this.opts.debug) {
            console.log('CopyToClipboard.activateButton()', { button: this.button });
        }
        __classPrivateFieldSet(this, _CopyToClipboard_activeTimeout, setTimeout(() => {
            __classPrivateFieldSet(this, _CopyToClipboard_activeStateHold, false, "f");
        }, this.activeTimeoutLength), "f");
    }
    /**
     * Removes the active attribute to the button.
     */
    deactivateButton() {
        clearTimeout(__classPrivateFieldGet(this, _CopyToClipboard_deactiveTimeout, "f"));
        if (this.opts.debug) {
            console.log('CopyToClipboard.deactivateButton()', { button: this.button });
        }
        // sets timeout to callback and returns - waiting for the activateButton() timeout to set it back to false
        if (__classPrivateFieldGet(this, _CopyToClipboard_activeStateHold, "f")) {
            __classPrivateFieldSet(this, _CopyToClipboard_deactiveTimeout, setTimeout(this.deactivateButton, 50), "f");
            return;
        }
        this.button.removeAttribute('data-state-active');
    }
    changeText(msg, timeoutMS) {
        this.ogInnerHTML = this.messageContainer.innerHTML;
        this.deactivateButton();
        if (msg) {
            this.messageContainer.innerText = msg;
            this.button.setAttribute('data-copy-to-clipboard-state-success', 'true');
        }
        if (this.opts.debug) {
            console.log('CopyToClipboard.changeText()', {
                button: this.button,
                msg,
                timeoutMS,
            });
        }
        this.textChangeTimeout = setTimeout(() => {
            this.deactivateButton();
            if (msg) {
                this.button.removeAttribute('data-copy-to-clipboard-state-success');
                this.messageContainer.innerHTML = this.ogInnerHTML;
            }
            this.button.blur();
        }, timeoutMS);
    }
    clicked(event) {
        var _a;
        this.activateButton();
        if (this.textChangeTimeout) {
            this.messageContainer.innerHTML = this.ogInnerHTML;
        }
        // in case someone is clicking super-fast
        clearTimeout(this.textChangeTimeout);
        const target = event.target;
        const toCopy = (_a = target === null || target === void 0 ? void 0 : target.dataset['copyToClipboard']) !== null && _a !== void 0 ? _a : this.button.dataset['copyToClipboard'];
        if (this.opts.debug) {
            console.log('CopyToClipboard.clicked()', {
                button: this.button,
                messageContainer: this.messageContainer,
                target,
                toCopy,
            });
        }
        if (toCopy) {
            navigator.clipboard.writeText(toCopy);
            this.changeText(this.successMessage, this.messageTimeoutLength);
        }
        else {
            this.deactivateButton();
        }
    }
}
_CopyToClipboard_activeTimeout = new WeakMap(), _CopyToClipboard_activeStateHold = new WeakMap(), _CopyToClipboard_deactiveTimeout = new WeakMap();
