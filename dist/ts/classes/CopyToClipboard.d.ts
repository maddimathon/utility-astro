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
export declare class CopyToClipboard {
    #private;
    /**
     * Element to listen to to copy to clipboard.
     */
    readonly button: HTMLButtonElement;
    /**
     * Queries for buttons with a data-copy-to-clipboard attribute and
     * constructs an instance of each.
     */
    static run(): void;
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
    constructor(
    /**
     * Element to listen to to copy to clipboard.
     */
    button: HTMLButtonElement);
    /**
     * Adds the active attribute to the button.
     */
    protected activateButton(): void;
    /**
     * Removes the active attribute to the button.
     */
    protected deactivateButton(): void;
    protected changeText(msg: string | null, timeoutMS: number): void;
    clicked(event: Event): void;
}
