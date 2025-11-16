/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.4
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
     * @param string  A CSS time value to convert to milliseconds.
     */
    static cssTimeToMilliseconds(string: string): number;
    static createCustomEvents(): void;
    /**
     * Class constructor.
     *
     * @param containerID  The unique ID for the toggle container to set up.
     */
    constructor(containerID: string);
    /**
     * Toggles the open/close state of the element.
     */
    toggle(): void;
}
//# sourceMappingURL=ElementToggle.d.ts.map