/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.9
 * @license MIT
 */

import type { Props as CodeBlockProps } from './CodeBlock.d.ts';

/**
 * Input props for the VariableDump component.
 * 
 * @since 0.1.0-alpha
 */
export interface Props extends Omit<CodeBlockProps, "children" | "lang"> {

    /**
     * The variable to dump.
     */
    var: unknown;

    /**
     * Optional name to prefix the output.
     */
    name?: string;
}