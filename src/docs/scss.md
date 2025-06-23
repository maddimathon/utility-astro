---
title: Sass Exports
---
<!-- @since 1.3.0+tmpl -->

# Sass

This library exports some scss utilities that are not auto-documented. They are,
however, documented in the code itself.

## How to Use

It’s best to `@forward` the library’s sass into a partial that is then `@use`d in other files.

```scss
// ./_imports.scss
@forward 'pkg:@maddimathon/template-npm-library' with (
    // $example: value,
);
```

```scss
// ./main.scss
@use 'imports' as utils;

body {
    --test: #{tmpl.example-function( 'hello' )};
}
```