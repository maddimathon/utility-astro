/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { Props as CodeBlockProps } from './CodeBlock.d.ts';

/**
 * Input props for the VariableDump component.
 * 
 * @since ___PKG_VERSION___
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