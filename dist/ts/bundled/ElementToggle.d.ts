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
export declare class ElementToggle {
    #private;
    /**
     * A map of existing successfully-registered instances of this class. Helps
     * to avoid re-initializing the same element or a block with the same id
     * value.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected static readonly instances: Map<string, ElementToggle>;
    /**
     * @since 0.1.0-beta.0.draft
     */
    protected static isToggle<T_Element extends HTMLElement>(element: T_Element): boolean;
    /**
     * Changes some properties and attributes on applicable elements since this
     * is an invalidly configured toggle element.
     *
     * @since 0.1.0-alpha.7
     */
    protected static abortNew(container: HTMLElement | null | undefined, allButtons: NodeListOf<Element> | Element[] | null | undefined): Promise<void>;
    /**
     * Queries the document for toggle containers to set them up as instances of
     * this class.
     *
     * @since 0.1.0-beta.0.draft
     */
    static run(opts?: Partial<ElementToggle.Opts>): Promise<void>;
    /**
     * Adds a 'load' event listener that then {@link ElementToggle.run}, querying
     * the document for toggle containers to set them up as instances of this
     * class.
     *
     * @since 0.1.0-alpha.7
     * @since 0.1.0-beta.0.draft — Renamed from init to runOnLoad.
     */
    static runOnLoad(opts?: Partial<ElementToggle.Opts>): Promise<void>;
    /**
     * Initiates a single instance asynchronously.
     *
     * @since 0.1.0-alpha.7
     */
    static new(container: HTMLElement | null, opts?: Partial<ElementToggle.Opts>): Promise<null | ElementToggle>;
    static openEvent: Event | null;
    static closeEvent: Event | null;
    /**
     * @param string  A CSS time value to convert to milliseconds.
     */
    static cssTimeToMilliseconds(string: number | string): number;
    static createCustomEvents(): void;
    /**
     * Optional configuration, if any.
     * @since 0.1.0-alpha.7
     */
    protected readonly opts: ElementToggle.Opts;
    /**
     * Timeout length to switch the button to active state, in milliseconds.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected readonly activeTimeoutLength: number;
    /**
     * Whether this toggle-able element should be treated as a modal (i.e., trap focus).
     *
     * @since 0.1.0-beta.0.draft
     */
    protected readonly asModal: boolean;
    /**
     * The unique ID for the toggle container to set up.
     */
    protected readonly container: HTMLElement;
    protected readonly content: HTMLElement;
    protected readonly primaryButton: HTMLElement;
    protected readonly allButtons: HTMLElement[];
    protected closingTimeout: ReturnType<typeof setTimeout> | null;
    /**
     * In milliseconds.
     */
    protected closingTime: number;
    /**
     * Whether this toggle-able element defaults to the open state.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected readonly defaultIsOpen: boolean;
    /**
     * Attribute strings for adding custom focus & active states.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected readonly attr: {
        active: string;
        focus: string;
    };
    /**
     * Whether this container is currently open.
     *
     * @since 0.1.0-beta.0.draft
     */
    get isOpen(): boolean;
    /**
     * Whether this toggle-able element is a menu (which slightly changes
     * some behaviour/aria).
     *
     * @since 0.1.0-beta.0.draft
     */
    protected readonly isMenu: boolean;
    /**
     * Whether this toggle-able element is a nav element/region (which slightly
     * changes some behaviour/aria).
     *
     * @since 0.1.0-beta.0.draft
     */
    protected readonly isNav: boolean;
    /**
     * @since 0.1.0-beta.0.draft
     */
    readonly toggleListener: (this: HTMLElement, ev: Event) => any;
    /**
     * Class constructor.
     */
    protected constructor(elements: {
        container: HTMLElement;
        primaryButton: HTMLElement;
        allButtons: [HTMLElement] & HTMLElement[];
        content: HTMLElement;
    }, 
    /** Optional configuration, if any. */
    partialOpts?: Partial<ElementToggle.Opts>);
    /**
     * Validates the markup of a button used to toggle this element.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected validateButton(button: HTMLElement): Promise<void>;
    /**
     * {@inheritDoc ElementToggle.abortNew}
     *
     * @since 0.1.0-alpha
     */
    protected abortConstructor(): void;
    /**
     * Adds the active attribute to the buttons.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected activateButton(button: HTMLElement): void;
    /**
     * Clears the related timeout, if any.
     */
    protected clearTimeout(): void;
    /**
     * Checks the current url anchor target and checks if it matches the id of
     * this toggle element.
     *
     * @since 0.1.0-alpha.7
     */
    protected checkUrlTarget(url: URL): boolean;
    /**
     * Removes the active attribute to the buttons.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected deactivateButton(): void;
    /**
     * If applicable (by opts), checks if the current url anchor targets
     * this toggle and if so, opens it.
     *
     * @since 0.1.0-alpha.7
     */
    handleHashChange(event: HashChangeEvent): void;
    /**
     * Opens the toggle element as if this is the current url anchor target.
     * Opens regardless of the current `this.opts.openWhenTargetted` value.
     *
     * @since 0.1.0-alpha.7
     */
    protected openAsTargetAnchor(): void;
    /**
     * The methods used as event listeners for trapping focus.
     *
     * @since 0.1.0-beta.0.draft
     */
    get focusableContainerChildren(): ReturnType<typeof ElementToggle.getFocusableChildren>;
    /**
     * The methods used as event listeners for trapping focus.
     *
     * @since 0.1.0-beta.0.draft
     */
    get focusableContentChildren(): ReturnType<typeof ElementToggle.getFocusableChildren>;
    /**
     * The methods used as event listeners for trapping focus.
     *
     * @since 0.1.0-beta.0.draft
     */
    get focusTrappers(): {
        keydown: (this: Document, event: KeyboardEvent) => void;
        first: (this: HTMLElement, event: FocusEvent) => void;
        last: (this: HTMLElement, event: FocusEvent) => void;
        any: (this: HTMLElement, event: FocusEvent) => void;
    };
    /**
     * Sets the closing time property via computed style value.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected setClosingTime(): void;
    /**
     * Called when the element is toggled open.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected trapFocus(): void;
    /**
     * Called when the element is toggled closed.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected untrapFocus(): void;
    /**
     * Toggles the open/close state of the element.
     */
    toggle(button?: HTMLElement): void;
    /**
     * Toggles the element open.
     */
    protected open(): void;
    /**
     * Toggles the element closed.
     */
    protected close(): void;
}
/**
 * Utilities for the {@link ElementToggle} class.
 *
 * @since 0.1.0-alpha.7
 */
export declare namespace ElementToggle {
    /**
     * Gets all focusable elements within a container.
     *
     * Use this with caution and when you have control over the possible
     * children and can avoid weird edge cases (like changing contenteditable or
     * weird tabindex behaviour).
     *
     * @since 0.1.0-beta.0.draft
     */
    function getFocusableChildren(container: HTMLElement): {
        readonly all: HTMLElement[];
        readonly keyboardOnly: HTMLElement[];
        readonly first: undefined | HTMLElement;
        readonly last: undefined | HTMLElement;
    };
    /**
     * Options for the configuration of {@link ElementToggle} instances.
     *
     * @since 0.1.0-alpha.7
     */
    interface Opts {
        /**
         * Default toggle active state time. In milliseconds.
         *
         * @default
         * closingTime / 4
         *
         * @since 0.1.0-beta.0.draft
         */
        activeTimeoutLength: number;
        /**
         * Whether toggles should close when they are no longer the target of
         * the url's anchor.
         *
         * @default false
         */
        closeWhenUntargetted: boolean;
        /**
         * Default toggle closing time. In milliseconds.
         *
         * @default 1800
         */
        closingTime: number;
        /**
         * Name of the computed style property to use for the closing time of
         * each element.
         *
         * @since 0.1.0-beta.0.draft
         */
        closingTimeProperty: string;
        /**
         * Outputs information to the console.
         *
         * @since 0.1.0-beta.0.draft
         */
        debug: boolean;
        /**
         * Whether to output the results of constructing each toggle element as
         * it is made.
         *
         * @since 0.1.0-beta.0.draft
         */
        logResults?: boolean;
        /**
         * Whether toggles should open when they are the target of the url's
         * anchor.
         *
         * @default true
         */
        openWhenTargetted: boolean;
    }
}
