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
    protected static abortNew(container: HTMLElement | null | undefined, allButtons: NodeListOf<Element> | Element[] | null | undefined): void;
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
    static cssTimeToMilliseconds(string: string): number;
    static createCustomEvents(): void;
    /**
     * Optional configuration, if any.
     * @since 0.1.0-alpha.7
     */
    protected readonly opts: ElementToggle.Opts;
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
     * Class constructor.
     */
    constructor(elements: {
        container: HTMLElement;
        primaryButton: HTMLElement;
        allButtons: [HTMLElement] & HTMLElement[];
        content: HTMLElement;
    }, 
    /** Optional configuration, if any. */
    partialOpts?: Partial<ElementToggle.Opts>);
    /**
     * {@inheritDoc ElementToggle.abortNew}
     *
     * @since 0.1.0-alpha
     */
    protected abortConstructor(): void;
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
     * Toggles the open/close state of the element.
     */
    toggle(): void;
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
     * Options for the configuration of {@link ElementToggle} instances.
     *
     * @since 0.1.0-alpha.7
     */
    interface Opts {
        /**
         * Whether toggles should close when they are no longer the target of
         * the url's anchor.
         *
         * @default false
         */
        closeWhenUntargetted: boolean;
        /**
         * Default toggle closing time.
         *
         * @default 1800
         */
        closingTime: number;
        /**
         * Outputs information to the console.
         *
         * @since 0.1.0-beta.0.draft
         */
        debug: boolean;
        /**
         * Whether toggles should open when they are the target of the url's
         * anchor.
         *
         * @default true
         */
        openWhenTargetted: boolean;
    }
}
