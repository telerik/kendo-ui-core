---
title: Swatches
page_title: Swatches - Sass Themes
description: "Learn about the swatches that come with the Kendo UI Sass themes."
slug: sassbasedthemes_swatches_kendoui
position: 5
---

# Swatches

A swatch is a set of variables which customizes the appearance of the theme.

* Swatches are useful for creating multiple and persistent theme variations.
* A theme may contain multiple swatches.
* Each swatch is placed in a separate `json` configuration file.
* The `.css` output file can be shared across projects and requires no further processing.

The Kendo UI theme swatches follow the `kendo.<THEME_NAME>-<SWATCH_NAME>` convention.

The following example showcases several swatches:

```html
 <!-- 
  Theme name - default
  Swatch name - ocean-blue
 -->
 <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default-ocean-blue.min.css" />

 <!-- 
  Theme name - default
  Swatch name - purple
 -->
 <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default-purple.min.css" />

 <!-- 
  Theme name - bootstrap
  Swatch name - vintage
 -->
 <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.bootstrap-vintage.min.css" />

 <!-- 
  Theme name - material
  Swatch name - nova
 -->
 <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.material-nova.min.css" />
```

## Using Built-in Swatches

In order to utilize the Kendo Themes infrastructure for building and creating swatches, first setup the repository:

1. Clone the [kendo-themes](https://github.com/telerik/kendo-themes) GitHub repository.
1. Install the [node-gyp](https://github.com/nodejs/node-gyp#installation) package.
1. Install the dependencies for all themes with `npm run setup`.
1. Run the `sass:swatches` task from the root of the repository

        npm run sass:swatches

1. Include one of the compiled CSS swatch files(`packages/<THEME_NAME>/dist/SWATCH_NAME.css`) in your project.

## Creating New Swatches

1. Create a `<THEME_NAME>-<SWATCH_NAME>.json` file in the `packages/<THEME_NAME>/lib/swatches` folder.
1. Follow the already existing `(<THEME_NAME>-main.json` schema for customizing the variables.
1. Run the `sass:swatches` task from the root of the repository.

        npm run sass:swatches

1. Include one of the compiled CSS swatch files(`packages/<THEME_NAME>/dist/SWATCH_NAME.css`) in your project.