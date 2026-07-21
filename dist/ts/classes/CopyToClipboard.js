/**
 * @since 0.1.0-beta.0.draft
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
var _CopyToClipboard_activeTimeout, _CopyToClipboard_activeStateHold, _CopyToClipboard_deactiveTimeout;
/**
 * A class for adding copy-to-clipboard functionality to buttons (via data
 * attribute configutation).
 *
 * @since 0.1.0-beta.0.draft
 */
export class CopyToClipboard {
    /**
     * Queries for buttons with a data-copy-to-clipboard attribute and
     * constructs an instance of each.
     */
    static run() {
        const buttons = document.querySelectorAll('button[data-copy-to-clipboard]');
        buttons.forEach((button) => new CopyToClipboard(button));
    }
    constructor(
    /**
     * Element to listen to to copy to clipboard.
     */
    button) {
        var _a;
        this.button = button;
        _CopyToClipboard_activeTimeout.set(this, void 0);
        _CopyToClipboard_activeStateHold.set(this, false);
        _CopyToClipboard_deactiveTimeout.set(this, void 0);
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
        this.toCopyContent = (_a = this.button) === null || _a === void 0 ? void 0 : _a.dataset['copyToClipboard'];
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
        __classPrivateFieldSet(this, _CopyToClipboard_activeTimeout, setTimeout(() => {
            __classPrivateFieldSet(this, _CopyToClipboard_activeStateHold, false, "f");
        }, this.activeTimeoutLength), "f");
    }
    /**
     * Removes the active attribute to the button.
     */
    deactivateButton() {
        clearTimeout(__classPrivateFieldGet(this, _CopyToClipboard_deactiveTimeout, "f"));
        // sets timeout to callback and returns - waiting for the activateButton() timeout to set it back to false
        if (__classPrivateFieldGet(this, _CopyToClipboard_activeStateHold, "f")) {
            __classPrivateFieldSet(this, _CopyToClipboard_deactiveTimeout, setTimeout(this.deactivateButton, 50), "f");
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
        const toCopy = target === null || target === void 0 ? void 0 : target.dataset['copyToClipboard'];
        if (toCopy) {
            navigator.clipboard.writeText(toCopy);
            this.changeText(this.successMessage, this.messageTimeoutLength);
        }
    }
}
_CopyToClipboard_activeTimeout = new WeakMap(), _CopyToClipboard_activeStateHold = new WeakMap(), _CopyToClipboard_deactiveTimeout = new WeakMap();
