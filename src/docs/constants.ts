/**
 * @since 0.1.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@___CURRENT_VERSION___
 * @license MIT
 */

import type { MenuItem } from '../astro/components.ts';

/**
 * Docs site title.
 */
export const SITE_TITLE = 'Utility Astro @ ___CURRENT_VERSION___';

/**
 * A copy of the site's main menu.
 * 
 * @since 0.1.0-beta.4
 */
export const PRIMARY_MENU = () => [
    { label: 'Home', href: '' },
    {
        label: 'Astro',
        child: [
            {
                label: 'Components',
                child: [
                    // { label: 'Alert', href: 'components/alert' },
                    { label: 'Icon', href: 'components/icon' },
                    { label: 'LoremIpsum', href: 'components/lorem-ipsum' },
                    { label: 'Toggle', href: 'components/toggle' },
                ],
            },
            {
                label: 'Layouts',
                child: [
                    { label: 'Content Only', href: 'layouts/content-only' },
                    { label: 'Extra-Wide', href: 'layouts/extra-wide' },
                    { label: 'Full Width', href: 'layouts/full-width' },
                    { label: 'Sidebar Left', href: 'layouts/sidebar-left' },
                    { label: 'Sidebar Right', href: 'layouts/sidebar-right' },
                ],
            },
        ],
    },
    { label: 'SCSS', child: [ { label: 'Astro', href: 'scss/astro' } ] },
] as const satisfies MenuItem[];