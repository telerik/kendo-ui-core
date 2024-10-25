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

The Kendo UI theme swatches follow the `<THEME_NAME>-<SWATCH_NAME>` convention as shown in the example below:

```html
 <!-- 
  Theme name - default
  Swatch name - ocean-blue
 -->
 <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion  }}/default/default-ocean-blue.css" />

 <!-- 
  Theme name - default
  Swatch name - purple
 -->
 <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion  }}/default/default-purple.css" />

 <!-- 
  Theme name - bootstrap
  Swatch name - vintage
 -->
 <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion  }}/bootstrap/bootstrap-vintage.css" />

 <!-- 
  Theme name - material
  Swatch name - nova
 -->
 <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion  }}/material/material-nova.css" />
```

## Using Built-in Swatches

To use the Kendo Themes infrastructure for building and creating swatches, first setup the repository:

1. Clone the [kendo-themes](https://github.com/telerik/kendo-themes) GitHub repository.
1. Install the [node-gyp](https://github.com/nodejs/node-gyp#installation) package.
1. Install the dependencies for all themes with `npm run setup`.
1. Run the `npm run sass:swatches` task from the root of the repository

        npm run sass:swatches

1. Include one of the compiled CSS swatch files(`packages/<THEME_NAME>/dist/SWATCH_NAME.css`) in your project.

## Creating New Swatches

To create a new swatch based on your custom preferences, setup the `kendo-themes` repository and then add a custom JSON file with your swatch.

1. Create a new `<THEME_NAME>-<SWATCH_NAME>.json` file in the `packages/<THEME_NAME>/lib/swatches` folder.
1. Customize the variables by following the schema in the existing `<THEME_NAME>-main.json file`. For example, to create a swatch for the Kendo UI default theme, follow the    existing schema in the `default-main.json` swatch.
1. Run the `npm run sass:swatches` task from the root of the repository.

        npm run sass:swatches

1. Include one of the compiled CSS swatch files(`packages/<THEME_NAME>/dist/SWATCH_NAME.css`) in your project.

For more information about the Kendo UI Swatches, refer to the [Progress Design System Swatches article](https://www.telerik.com/design-system/docs/themes/customization/swatches/).
