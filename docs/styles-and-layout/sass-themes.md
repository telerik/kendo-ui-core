---
title: Sass-Based Themes
page_title: Sass-Based Themes | Kendo UI Styles and Appearance
description: "Learn how to apply CSS classes to the Kendo UI desktop widgets to change their appearance and further customize their style."
previous_url: /themebuilder_overview_kendouistyling
slug: sassbasedthemes_kendoui
position: 2
---

# Sass-Based Themes

As of the R1 2017 release, the Kendo UI distribution includes Sass-based themes.

Currently, Kendo UI delivers the following Sass themes:

* Kendo UI Default v.2&mdash;The latest update of the Kendo UI Default theme.
* Kendo UI Bootstrap v.4&mdash;To achieve similarity with the Bootstrap look and feel, the theme has linked variables to Bootstrap. This means that customizing the original Bootstrap theme will affect the Kendo UI theme as well.
* Kendo UI Material&mdash;An update of the Kendo UI Material Theme to closely implement the [Material Design Guidelines](https://material.io/design/).

## Less- vs. Sass-Based Themes

Apart from being written in a different language, the Sass-based themes are slightly different from the Less-based ones. This article outlines those differences and demonstrates how to use the Sass-based themes.

In Kendo UI, the Sass-based themes demonstrate the following differences from the Less-based ones:
- Each Sass-based theme is represented by a single CSS file that combines the layout and the themes of the components. As a result, you do not need to match a theme with its common file.
- Based on the widget you work with, the Sass-based themes can build a part of the widget theme in a similar way the Download Builder trims unused scripts.
- The Sass-based themes are available on NPM. Each theme is stored as an NPM package and can be easily upgraded.
- Each Sass-based theme is compatible with the [Kendo UI components for Angular](https://www.telerik.com/kendo-angular-ui/). This enables you to port parts of your application to Angular 2 while maintaining their styling.

## Browser Limitations

The following CSS features, which are used by the Sass-based themes, provide limited browser support:

* Flexbox layout&mdash;Not supported by Internet Explorer 10 and earlier.
* CSS gradients&mdash;Not supported by Internet Explorer 9 and earlier.
* Web Open Font Format&mdash;Not supported by Internet Explorer 8 and earlier.
* Border radius&mdash;Not supported by Internet Explorer 8 and earlier.
* Alpha transparency colors&mdash;Not supported by Internet Explorer 8 and earlier.

## Getting the Themes

To get the Sass-based Kendo UI themes, you can:

* [Use the pre-built CSS files](#using-the-pre-built-css).
* [Use the NPM packages](#using-npm-packages).

### Using Pre-Built CSS

To get a complete theme by using its pre-built CSS files, apply either of the following approaches:

- Use the CSS files that are shipped with the Kendo UI distribution. For example, the **Default v2** theme is distributed as `styles/kendo.default-v2.min.css`.
- Use the NPM package which contains a pre-built `dist/all.css` CSS file for the theme. For more information on how to obtain the NPM package, refer to the following section on using NPM packages.

### Using NPM Packages

The Kendo UI Sass-based themes are located on the Progress NPM registry:

* **Kendo UI Default Theme**&mdash;Available as @progress/kendo-theme-default.
* **Kendo UI Bootstrap v4 Theme**&mdash;Available as @progress/kendo-theme-bootstrap.
* **Kendo UI Material Theme**&mdash;Available as @progress/kendo-theme-material.

To access the Progress NPM registry, you need an active Telerik account with an active commercial license. For more information on how to access the NPM registry, refer to the [installation instructions for Kendo UI Professional]({% slug kendoui_npm_packages_kendoui_installation %}#kendo-ui-professional).

## Customizing the Themes

Each Kendo UI theme package includes the source files of the respective theme and, thus, provides options for you to modify and rebuild the theme as part of your build process.

For example, you can change the theme colors, remove the CSS of unused components, or use specific theme colors to style your application. The theme source files are located in the `scss` folder of the theme package.

For the full list of variables that can be modified in a theme, refer to the [Using Variables](#using-variables) section.

To build a custom theme by using the theme variables, apply either of the following approaches:
* [(Recommended) Use the build process of your application](#using-the-build-process-of-the-application)&mdash;This approach simplifies the upgrades to new theme package versions.
* [Use the build process of the themes](#using-the-build-process-of-the-themes)&mdash;This approach requires you to build the theme each time the theme packages are updated.

### Using the Build Process of the Application

To customize a Sass-based theme, create a `.scss` file and consume the theme package in the following way:

1. Obtain the theme source through the NPM package.

        npm install @progress/kendo-theme-default

1. Create a `.scss` file that will consume the theme. For the purposes of the example, this is `styles.scss`.

1. To build the theme files, import them into the `styles.scss` file.

        @import "node_modules/@progress/kendo-theme-default/dist/all.scss";

   The `dist/all` file adds the styles for all components that are available in the theme. To trim down the size of the generated CSS, import only the source for the components that you use in your application. Each of them could be found in `scss/` folder.

        // Import only the Grid and TreeView styles using Node Sass
        @import "~@progress/kendo-theme-default/scss/grid/_index.scss";
        @import "~@progress/kendo-theme-default/scss/treeview/_index.scss";

        // or using Dart Sass
        @import "~@progress/kendo-theme-default/scss/grid/";
        @import "~@progress/kendo-theme-default/scss/treeview/";

1. To customize the variables that are used in the theme, change the theme before you import the theme files.

        $primary: #E82C0C; // brand color

        @import "~@progress/kendo-theme-default/dist/all.scss";

1. Build the `styles.scss` file through a Sass compiler.

    To use Node Sass (which uses [LibSass](https://sass-lang.com/libsass)), install the compiler with `npm install node-sass --save` and then compile the file with the following command

        node-sass styles.scss styles.css

    To use [Dart Sass](https://sass-lang.com/dart-sass), install the compiler with `npm install node-sass@npm:sass --save` and then compile the file with the following command

        sass styles.scss styles.css


### Using the Build Process of the Themes

While each Sass-based theme has a dedicated NPM package (for example, @progress/kendo-theme-default), the source code for all themes is located in the [kendo-themes](https://github.com/telerik/kendo-themes) repository which contains a build task that compiles the theme sources to CSS. To customize a theme, modify the source code of the theme and use the build task to produce a CSS file for your application. This approach avoids the need for a setting up a build configuration when you compile SCSS, but may be harder to maintain as the process has to be repeated each time a theme is updated.

#### Customizing Themes with Swatches

A swatch is a set of variables which customizes the appearance of the theme.

* Each swatch is placed in a separate file. A theme may contain multiple swatches.
* Swatches are useful for creating multiple, persistent theme variations.
* The `.css` output file can be shared across projects and requires no further processing.

To create a swatch:

1. Clone the [kendo-themes](https://github.com/telerik/kendo-themes) GitHub repository.
1. Install the [node-gyp](https://github.com/nodejs/node-gyp#installation) package.
1. Install the dependencies for all themes with `npm install && npx lerna bootstrap`.
1. Switch the working directory to `packages/<THEME_NAME>`.
1. Create a `SWATCH_NAME.scss` swatch file in the `scss/swatches` folder.
1. To build the swatches for the theme by running `npm run sass:swatches` or `npm run dart:swatches`.
1. Include the compiled CSS swatch file in your project. It could be found under `dist/SWATCH_NAME.css`.

For example, in the Material theme create `blue-pink-dark` swatch with the following lines:

    // Variables.
    $primary-palette-name: blue;
    $secondary-palette-name: pink;
    $theme-type: dark;

    // Import the theme file for the components you use.
    @import "../panelbar/_index.scss";
    @import "../grid/_index.scss";

    // Alternatively, include all components.
    @import "../all.scss";


For the Default and Bootstrap themes, the swatch should look like:

    // Variables.
    $primary: blue;
    $secondary: pink;

    // Import the theme file for the components you use.
    @import "../panelbar/_index.scss";
    @import "../grid/_index.scss";

    // Alternatively, include all components.
    @import "../all.scss";

#### Customizing the Source Code

To create a custom theme by modifying the themes source code:

1. Clone the [kendo-themes](https://github.com/telerik/kendo-themes) GitHub repository.
1. Install the dependencies for all themes with `npm install && npx lerna bootstrap`.
1. Customize the theme variables in the `packages/THEME_NAME/scss/_variables.scss` files.
1. Build the themes with the `npm run sass` or `npm run dart` command to create the customized version of the themes in the `packages/THEME_NAME/dist/all.css` file.
1. After the build completes, reference the compiled CSS in your application.

### Using Variables

The following list describes the theme variables available for adjustment in the Kendo UI Default theme.

<style>
.theme-variables th,
.theme-variables td {
  vertical-align: top;
}

.color-preview {
  border-radius: 50%;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  display: inline-block;
  border: 1px solid rgba(0,0,0,.08);
}
</style>

The following example demonstrates how to use common variables.

<table class="theme-variables">
<colgroup>
<col style="white-space:nowrap; width: 200px" />
<col style="width: 250px" />
<col />
</colgroup>
<tr>
<th>Name</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>$font-size</td>
<td>

    14px
</td>
<td>Base font size across all components.
</td>
</tr>
<tr>
<td>$font-family</td>
<td>

    inherit
</td>
<td>Font family across all components.
</td>
</tr>
<tr>
<td>$font-family-monospace</td>
<td>

    Consolas, "Ubuntu Mono", "Lucida Console", "Courier New", monospace
</td>
<td>Font family for monospaced text. Used for styling the code.
</td>
</tr>
<tr>
<td>$line-height</td>
<td>

    (20 / 14)
</td>
<td>Line height used along with $font-size.
</td>
</tr>
<tr>
<td>$border-radius</td>
<td>

    2px
</td>
<td>Border radius for all components.
</td>
</tr>
<tr>
<td>$accent</td>
<td>
    <span class="color-preview" style="background-color: #ff6358"></span>
    #ff6358
</td>
<td>The color that focuses the user attention.<br/>
Used for primary buttons and for elements of primary importance across the theme.
</td>
</tr>
<tr>
<td>$accent-contrast</td>
<td>
    <span class="color-preview" style="background-color: #ffffff"></span>
    #ffffff
</td>
<td>The color used along with the accent color denoted by $accent.<br/>
Used to provide contrast between the background and foreground colors.
</td>
</tr>
<tr>
<td>$base-text</td>
<td>
    <span class="color-preview" style="background-color: #656565"></span>
    #656565
</td>
<td>The text color of the components' chrome area.
</td>
</tr>
<tr>
<td>$base-bg</td>
<td>
    <span class="color-preview" style="background-color: #f6f6f6"></span>
    #f6f6f6
</td>
<td>The background of the components' chrome area.
</td>
</tr>
<tr>
<td>$base-border</td>
<td>

    rgba( black, .08 )
</td>
<td>The border color of the components' chrome area.
</td>
</tr>
<tr>
<td>$base-gradient</td>
<td>

    $base-bg, darken( $base-bg, 2% )
</td>
<td>The gradient background of the components' chrome area.
</td>
</tr>
<tr>
<td>$hovered-text</td>
<td>
    <span class="color-preview" style="background-color: #656565"></span>
    #656565
</td>
<td>The text color of hovered items.
</td>
</tr>
<tr>
<td>$hovered-bg</td>
<td>
    <span class="color-preview" style="background-color: #ededed"></span>
    #ededed
</td>
<td>The background of hovered items.
</td>
</tr>
<tr>
<td>$hovered-border</td>
<td>

    rgba( black, .15 )
</td>
<td>The border color of hovered items.
</td>
</tr>
<tr>
<td>$hovered-gradient</td>
<td>

    $hovered-bg, darken( $hovered-bg, 2% )
</td>
<td>The gradient background of hovered items.
</td>
</tr>
<tr>
<td>$selected-text</td>
<td>

    $accent-contrast
</td>
<td>The text color of selected items.
</td>
</tr>
<tr>
<td>$selected-bg</td>
<td>

    $accent
</td>
<td>The background of selected items.
</td>
</tr>
<tr>
<td>$selected-border</td>
<td>

    rgba( black, .1 )
</td>
<td>The border color of selected items.
</td>
</tr>
<tr>
<td>$selected-gradient</td>
<td>

    none
</td>
<td>The gradient background of selected items.
</td>
</tr>
<tr>
<td>$error</td>
<td>
    <span class="color-preview" style="background-color: #f5503e"></span>
    #f5503e
</td>
<td>The color for error messages and states.
</td>
</tr>
<tr>
<td>$warning</td>
<td>
    <span class="color-preview" style="background-color: #fdce3e"></span>
    #fdce3e
</td>
<td>The color for warning messages and states.
</td>
</tr>
<tr>
<td>$success</td>
<td>
    <span class="color-preview" style="background-color: #5ec232"></span>
    #5ec232
</td>
<td>The color for success messages and states.
</td>
</tr>
<tr>
<td>$info</td>
<td>
    <span class="color-preview" style="background-color: #3e80ed"></span>
    #3e80ed
</td>
<td>The color for informational messages and states.
</td>
</tr>
</table>

The following example demonstrates how to configure the Buttons.

<table class="theme-variables">
<colgroup>
<col style="white-space:nowrap; width: 200px" />
<col style="width: 250px" />
<col />
</colgroup>
<tr>
<th>Name</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>$button-text</td>
<td>

    $base-text
</td>
<td>The text color of the buttons.
</td>
</tr>
<tr>
<td>$button-bg</td>
<td>

    $base-bg
</td>
<td>The background of the buttons.
</td>
</tr>
<tr>
<td>$button-border</td>
<td>

    $base-border
</td>
<td>The border color of the buttons.
</td>
</tr>
<tr>
<td>$button-gradient</td>
<td>

    $base-gradient
</td>
<td>The background gradient of the buttons.
</td>
</tr>
<tr>
<td>$button-hovered-text</td>
<td>

    $hovered-text
</td>
<td>The text color of hovered buttons.
</td>
</tr>
<tr>
<td>$button-hovered-bg</td>
<td>

    $hovered-bg
</td>
<td>The background of hovered buttons.
</td>
</tr>
<tr>
<td>$button-hovered-border</td>
<td>

    $hovered-border
</td>
<td>The border color of hovered buttons.
</td>
</tr>
<tr>
<td>$button-hovered-gradient</td>
<td>

    $hovered-gradient
</td>
<td>The background gradient of hovered buttons.
</td>
</tr>
<tr>
<td>$button-pressed-text</td>
<td>

    $selected-text
</td>
<td>The text color of pressed buttons.
</td>
</tr>
<tr>
<td>$button-pressed-bg</td>
<td>

    $selected-bg
</td>
<td>The background color of pressed buttons.
</td>
</tr>
<tr>
<td>$button-pressed-border</td>
<td>

    $selected-border
</td>
<td>The border color of pressed buttons.
</td>
</tr>
<tr>
<td>$button-pressed-gradient</td>
<td>

    none
</td>
<td>The background gradient of pressed buttons.
</td>
</tr>
<tr>
<td>$button-focused-shadow</td>
<td>

    0 3px 4px 0 rgba(0, 0, 0, .06)
</td>
<td>The shadow of focused buttons.
</td>
</tr>
</table>

The following example demonstrates how to configure the Charts.

<table class="theme-variables">
<colgroup>
<col style="white-space:nowrap; width: 200px" />
<col style="width: 250px" />
<col />
</colgroup>
<tr>
<th>Name</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>$series-a</td>
<td>
    <span class="color-preview" style="background-color: #ff6358"></span>
    #ff6358
</td>
<td>The color of the first series.
</td>
</tr>
<tr>
<td>$series-b</td>
<td>
    <span class="color-preview" style="background-color: #ffd246"></span>
    #ffd246
</td>
<td>The color of the second series.
</td>
</tr>
<tr>
<td>$series-c</td>
<td>
    <span class="color-preview" style="background-color: #78d237"></span>
    #78d237
</td>
<td>The color of the third series.
</td>
</tr>
<tr>
<td>$series-d</td>
<td>
    <span class="color-preview" style="background-color: #28b4c8"></span>
    #28b4c8
</td>
<td>The color of the fourth series.
</td>
</tr>
<tr>
<td>$series-e</td>
<td>
    <span class="color-preview" style="background-color: #2d73f5"></span>
    #2d73f5
</td>
<td>The color of the fifth series.
</td>
</tr>
<tr>
<td>$series-f</td>
<td>
    <span class="color-preview" style="background-color: #aa46be"></span>
    #aa46be
</td>
<td>The color of the sixth series.
</td>
</tr>
<tr>
<td>$chart-major-lines</td>
<td>

    rgba(0, 0, 0, .08)
</td>
<td>The color of the Chart grid lines (major).
</td>
</tr>
<tr>
<td>$chart-minor-lines</td>
<td>

    rgba(0, 0, 0, .04)
</td>
<td>The color of the Chart grid lines (minor).
</td>
</tr>
</table>

The following example demonstrates how to configure the Toolbar.

<table class="theme-variables">
<colgroup>
<col style="white-space:nowrap; width: 200px" />
<col style="width: 250px" />
<col />
</colgroup>
<tr>
<th>Name</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>$toolbar-padding-x</td>
<td>

    $padding-x
</td>
<td>The horizontal padding of the container.
</td>
</tr>
<tr>
<td>$toolbar-padding-y</td>
<td>

    $padding-x
</td>
<td>The vertical padding of the container.
</td>
</tr>
</table>

## Contribution

To contribute to the development of the Kendo UI Default Theme, refer to the [telerik/kendo-themes](https://github.com/telerik/kendo-themes) GitHub repository it is stored in.

## Using the Sass Theme Builder

[**Progress Sass Theme Builder**](https://themebuilder.telerik.com/kendo-ui) for Kendo UI is an Angular web application that enables you to create new or customize existing themes.

The tool renders the same look and feel as the look and feel of all other components in the suite. It also delivers full control over the skin elements of each component and automatically updates its composite units. After you create the skin and achieve the desired look of the theme, the Sass Theme Builder enables you to download and integrate it in your project.

**Figure 1: A preview of the Sass Theme Builder**

![Theme Builder Overview](images/theme-builder-overview.png)

### Using Newly Created Themes

To create a new theme:

1. On the initial Sass Theme Builder pane, select the **Start Theming** option.
1. Choose one of the existing themes to serve as a starting point.
1. Select the widgets which you intend to style. You can also change the selection at a later stage.

    **Figure 2: Selecting a base theme and widgets**

    ![Theme Builder Create](images/theme-builder-create.gif)

Complex widgets, such as the Grid, rely on other widgets to deliver their full set of features. If you select the Grid, then all of its widgets dependencies styles (Button, AutoComplete, DropDownList, DatePicker, etc.) will also be included in the final bundle. The Theme Builder automatically updates the styling on all required widgets so that you do not need to customize each of them separately.

### Modifying Themes

The Sass Theme Builder supports the following options for customization:

* Color pickers which customize the appearance of the components.
* The **Apply changes instantly** option which enables you to observe the changes on the fly.
* Manual updates of each component element.
* Utilization of predefined color swatches.

To customize an existing theme, use the following Sass Theme Builder features:

1. Color swatches&mdash;Contains predefined color palettes that you can apply to all widgets in your application.
1. Default&mdash;Provides the applicable color customization options.
1. Selected Widgets&mdash;List of widgets to include in the preview and the final CSS bundle.
1. Download&mdash;Downloads the archive that holds the generated style files after the customization completes. When you click the button, a dialog appears and prompts you to name your theme.

**Figure 3: Available options for customization**

![Theme Builder Create and Download 3](images/theme-builder-create-and-download-3.png)

To upload an existing theme you have previously created:

1. On the initial Sass Theme Builder pane, select **Import Theme**.
1. Upload the `variables.scss` file which contains your current modifications of the customized theme. As a result, the selected components and styling elements load.
1. Start [customizing your theme](#customizing-existing-themes).

**Figure 4: Importing themes for customization**

![Themebuilder import existing theme](images/theme-builder-import-existing-theme.png)

When you complete the modifications and the theme is ready to be used:

1. Download the theme as a compact archive by clicking the **Download** button.
1. Add the newly created `Theme` folder to your application.
1. Include the `THEME_NAME.css` file in the `head` tag of your HTML document.

> Avoid referencing the `kendo.common.min.css` and `kendo.rtl.min.css` files because the exported CSS file contains all styles you need.

## See Also

* [Less ThemeBuilder Overview]({% slug themesandappearnce_kendoui_desktopwidgets %}#less-theme-builder)
* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [How to Change Themes on the Client]({% slug howto_changethemes_ontheclient_styleskendoui %})
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})
* [Themes and Appearance of the Kendo UI Hybrid Widgets]({% slug forms_hybridkendoui %})
