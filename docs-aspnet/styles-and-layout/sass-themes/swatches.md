---
title: Swatches
page_title: Swatches
description: "Learn about the swatches that come with the Telerik UI Sass themes."
slug: swatches_aspnetmvc6_aspnetmvc
position: 5
---

# Swatches

A swatch is a set of variables used to modify a Telerik UI theme.

* Swatches can be used for creating multiple and persistent theme variations.
* A theme may contain multiple swatches.
* Each swatch is placed in a separate `json` configuration file.
* The `.css` output file can be shared across projects and requires no further processing.

The Telerik UI theme swatches follow the `kendo.<THEME_NAME>-<SWATCH_NAME>` convention.

The following example showcases several swatches:

```html
 <!-- 
  Theme name - default
  Swatch name - ocean-blue
 -->
 <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-ocean-blue.css" />

 <!-- 
  Theme name - default
  Swatch name - purple
 -->
 <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-purple.css" />

 <!-- 
  Theme name - bootstrap
  Swatch name - vintage
 -->
 <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-vintage.css" />

 <!-- 
  Theme name - material
  Swatch name - nova
 -->
 <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-nova.css" />
```

## Using Built-in Swatches

To use the Telerik Themes infrastructure for building and creating swatches, first set up the Kendo Themes repository:

1. Clone the [kendo-themes](https://github.com/telerik/kendo-themes) GitHub repository.
1. Install the [node-gyp](https://github.com/nodejs/node-gyp#installation) package.
1. Install the dependencies for all themes with `npm run setup`.
1. Run the `sass:swatches` task from the root of the repository

        npm run sass:swatches

1. Add one of the compiled CSS swatch files(`packages/<THEME_NAME>/dist/SWATCH_NAME.css`) in your project.

## Creating New Swatches

1. Create a `<THEME_NAME>-<SWATCH_NAME>.json` file in the `packages/<THEME_NAME>/lib/swatches` folder.
1. Follow the already existing `(<THEME_NAME>-main.json` schema for customizing the variables.
1. Run the `sass:swatches` task from the root of the repository.

        npm run sass:swatches

1. Include one of the compiled CSS swatch files(`packages/<THEME_NAME>/dist/SWATCH_NAME.css`) in your project.