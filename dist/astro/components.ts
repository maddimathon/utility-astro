/**
 * Exports all the astro components and their types.
 * 
 * @module components
 * 
 * @since 0.1.0-beta.0.draft
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */

import Alert_Icon from './components/Alert_Icon.astro';
export type * from './components/Alert_Icon.astro';

import Alert from './components/Alert.astro';
export type * from './components/Alert.astro';

import CodeBlock from './components/CodeBlock.astro';
export type * from './components/CodeBlock.astro';

import CopyToClipboardButton from './components/CopyToClipboardButton.astro';
export type * from './components/CopyToClipboardButton.astro';

import Heading from './components/Heading.astro';
export type * from './components/Heading.astro';

import Icon from './components/Icon.astro';
export type * from './components/Icon.astro';

import LoremIpsum from './components/LoremIpsum.astro';
export {
    getLoremIpsumIds,
    getLoremIpsumMode,
    getLoremIpsumToc,
} from './components/LoremIpsum.astro';
export type * from './components/LoremIpsum.astro';

import MenuList from './components/MenuList.astro';
export { parseItemAttributes } from './components/MenuList.astro';
export type * from './components/MenuList.astro';

import NavMenu from './components/NavMenu.astro';
export { parseMenuItem } from './components/NavMenu.astro';
export type * from './components/NavMenu.astro';

import NestedList from './components/NestedList.astro';
export type * from './components/NestedList.astro';

import Page_Meta from './components/Page_Meta.astro';
export type * from './components/Page_Meta.astro';

import SettingsMenu from './components/SettingsMenu.astro';
export type * from './components/SettingsMenu.astro';

import SkipLinks from './components/SkipLinks.astro';
export type * from './components/SkipLinks.astro';

import Table from './components/Table.astro';
export type * from './components/Table.astro';

import TableOfContents from './components/TableOfContents.astro';
export { parseTableOfContents } from './components/TableOfContents.astro';
export type * from './components/TableOfContents.astro';

import Toggle from './components/Toggle.astro';
export type * from './components/Toggle.astro';

import ToggleNavMenu from './components/ToggleNavMenu.astro';
export type * from './components/ToggleNavMenu.astro';

import VariableDump from './components/VariableDump.astro';
export type * from './components/VariableDump.astro';

export {
    Alert_Icon,
    Alert,
    CodeBlock,
    CopyToClipboardButton,
    Heading,
    Icon,
    LoremIpsum,
    MenuList,
    NavMenu,
    NestedList,
    Page_Meta,
    SettingsMenu,
    SkipLinks,
    Table,
    TableOfContents,
    Toggle,
    ToggleNavMenu,
    VariableDump,
};