
import { defineConfig } from 'astro/config';

import partialConfig from './.scripts/build.config.js';
import pkg from './package.json';

import {
    internal as buildUtils,

    FileSystem,
    ProjectConfig,

    parseParamsCLI,
} from '@maddimathon/build-utilities';

const projectConfig = new ProjectConfig( buildUtils.internalConfig( partialConfig ) );

const fs = new FileSystem(
    new buildUtils.Stage_Console(
        'black',
        projectConfig,
        parseParamsCLI( {} ),
    ) as buildUtils.Logger,
);

export const homeURL = new URL( pkg.homepage );

const outDir = projectConfig.getDistDir( fs, 'docs' )?.replace( /\/+$/gi, '' )
    ?? projectConfig.getDistDir( fs ).replace( /\/+$/gi, '' ) + '/docs';

const srcDir = projectConfig.getSrcDir( fs, 'docs' )[ 0 ]?.replace( /\/+$/gi, '' )
    ?? projectConfig.getSrcDir( fs ).replace( /\/+$/gi, '' ) + '/docs';

export default defineConfig( {

    base: homeURL.pathname,
    site: homeURL.origin,

    compressHTML: true,

    devToolbar: { enabled: false, },

    markdown: {
        syntaxHighlight: 'prism',
    },

    outDir,
    publicDir: srcDir + '/public',
    srcDir,

    trailingSlash: 'never',

    scopedStyleStrategy: 'attribute',


    build: {
        assets: 'assets/astro',
        client: 'assets/js',
        format: 'file',
        inlineStylesheets: 'always',
    },

    server: {
        port: 8080,
        host: true,
    },
} );