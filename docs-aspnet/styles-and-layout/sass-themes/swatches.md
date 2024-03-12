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

The following table contains a list of the available SASS Theme Swatches:

| Sass Theme | Sass Theme CDN
|:---        |:---        
| `Default - Main` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css |
| `Default - Main Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main-dark.css |
| `Default - Blue` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-blue.css |
| `Default - Green` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-green.css |
| `Default - Ocean Blue` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-ocean-blue.css |
| `Default - Ocean Blue Accessibility` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-ocean-blue-a11y.css |
| `Default - Orange` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-orange.css |
| `Default - Purple` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-purple.css |
| `Default - Turquoise` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-turquoise.css |
| `Default - Urban` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-urban.css |
| `Classic - Main` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-main.css |
| `Classic - Main Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-main-dark.css |
| `Classic - Opal Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-opal-dark.css |
| `Classic - Opal` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-opal.css |
| `Classic - Silver` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-silver.css |
| `Classic - Silver Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-silver-dark.css |
| `Classic - Metro` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-metro.css |
| `Classic - Metro Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-metro-dark.css |
| `Classic - Moonlight` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-moonlight.css |
| `Classic - Lavender Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-lavender-dark.css |
| `Classic - Lavender Light` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-lavender.css |
| `Classic - Green` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-green.css |
| `Classic - Green Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-green-dark.css |
| `Classic - Uniform` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/classic/classic-uniform.css |
| `Bootstrap - Main` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css |
| `Bootstrap - Main Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main-dark.css |
| `Bootstrap - Bootstrap 3` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-3.css |
| `Bootstrap - Bootstrap 3 Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-3-dark.css |
| `Bootstrap - Bootstrap 4` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-4.css |
| `Bootstrap - Bootstrap 4 Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-4-dark.css |
| `Bootstrap - Nordic` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-nordic.css |
| `Bootstrap - Turquoise` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-turquoise.css |
| `Bootstrap - Turquoise Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-turquoise-dark.css |
| `Bootstrap - Urban` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-urban.css |
| `Bootstrap - Vintage` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-vintage.css |
| `Material - Main` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-main.css |
| `Material - Main Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-dark.css |
| `Material - Nova` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-nova.css |
| `Material - Arctic` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-arctic.css |
| `Material - Aqua Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-aqua-dark.css |
| `Material - Burnt Teal` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-burnt-teal.css |
| `Material - Eggplant` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-eggplant.css |
| `Material - Lime` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-lime.css |
| `Material - Lime Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-lime-dark.css |
| `Material - Pacific` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-pacific.css |
| `Material - Pacific Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-pacific-dark.css |
| `Material - Sky` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-sky.css |
| `Material - Sky Dark` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-sky-dark.css |
| `Material - Smoke` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/material/material-smoke.css |
| `Fluent - Main` | https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/fluent/fluent-main.css |


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