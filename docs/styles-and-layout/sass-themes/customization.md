---
title: Customization
page_title: Customization - Sass Themes
description: "Learn how to customize the Kendo UI Sass themes."
slug: sassbasedthemes_customization_kendoui
position: 3
---

# Customization

Each Kendo UI theme package includes the source files of the respective theme and, thus, provides options for you to modify and rebuild the theme as part of your build process.

For example, you can change the theme colors, remove the CSS of unused components, or use specific theme colors to style your application. The theme source files are located in the `scss` folder of the theme package.

For the full list of variables that can be modified in a theme, refer to the [Using Variables](#using-variables) section.

To build a custom theme by using the theme variables, apply any of the following approaches:
* [(Recommended) Use the build process of your application](#using-the-build-process-of-the-application)&mdash;This approach simplifies the upgrades to new theme package versions.
* [Use the build process of the themes](#using-the-build-process-of-the-themes)&mdash;This approach requires you to build the theme each time the theme packages are updated.
* [Use the Kendo UI ThemeBuilder](#using-the-themebuilder)

## Using the Build Process of the Application

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


## Using the Build Process of the Themes

While each Sass-based theme has a dedicated NPM package (for example, `@progress/kendo-theme-default`), the source code for all themes is located in the [kendo-themes](https://github.com/telerik/kendo-themes) repository which contains a build task that compiles the theme sources to CSS. 

To customize a theme, modify the source code of the theme and use the build task to produce a CSS file for your application. This approach avoids the need for a setting up a build configuration when you compile SCSS, but may be harder to maintain as the process has to be repeated each time a theme is updated.

### Customizing the Source Code

To create a custom theme by modifying the themes source code:

1. Clone the [kendo-themes](https://github.com/telerik/kendo-themes) GitHub repository.
1. Install the dependencies for all themes with `npm run setup`.
1. Customize the theme variables in the `packages/THEME_NAME/scss/_variables.scss` files.
1. Build the themes with the `npm run sass` or `npm run dart` command to create the customized version of the themes in the `packages/THEME_NAME/dist/all.css` file.
1. After the build completes, reference the compiled CSS in your application.

## Using the ThemeBuilder

[**Progress Sass Theme Builder**](https://themebuilder.telerik.com/kendo-ui) for Kendo UI is an Angular web application that enables you to create new or customize existing themes.

For additional information, visit the [ThemeBuilder documentation article]({% slug sassbasedthemes_themebuilder_kendoui %}) in the Sass-Themes section.

## Using Variables

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
<th>Sample value</th>
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
<td>$hover-text</td>
<td>
    <span class="color-preview" style="background-color: #656565"></span>
    #656565
</td>
<td>The text color of hovered items.
</td>
</tr>
<tr>
<td>$hover-bg</td>
<td>
    <span class="color-preview" style="background-color: #ededed"></span>
    #ededed
</td>
<td>The background of hovered items.
</td>
</tr>
<tr>
<td>$hover-border</td>
<td>

    rgba( black, .15 )
</td>
<td>The border color of hovered items.
</td>
</tr>
<tr>
<td>$hover-gradient</td>
<td>

    $hover-bg, darken( $hover-bg, 2% )
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
<th>Sample value</th>
<th>Description</th>
</tr>
<tr>
<td>$kendo-button-text</td>
<td>

    $base-text
</td>
<td>The text color of the buttons.
</td>
</tr>
<tr>
<td>$kendo-button-bg</td>
<td>

    $base-bg
</td>
<td>The background of the buttons.
</td>
</tr>
<tr>
<td>$kendo-button-border</td>
<td>

    $base-border
</td>
<td>The border color of the buttons.
</td>
</tr>
<tr>
<td>$kendo-button-gradient</td>
<td>

    $base-gradient
</td>
<td>The background gradient of the buttons.
</td>
</tr>
<tr>
<td>$kendo-button-hover-text</td>
<td>

    $hover-text
</td>
<td>The text color of hovered buttons.
</td>
</tr>
<tr>
<td>$kendo-button-hover-bg</td>
<td>

    $hover-bg
</td>
<td>The background of hovered buttons.
</td>
</tr>
<tr>
<td>$kendo-button-hover-border</td>
<td>

    $hover-border
</td>
<td>The border color of hovered buttons.
</td>
</tr>
<tr>
<td>$kendo-button-hover-gradient</td>
<td>

    $hover-gradient
</td>
<td>The background gradient of hovered buttons.
</td>
</tr>
<tr>
<td>$kendo-button-pressed-text</td>
<td>

    $selected-text
</td>
<td>The text color of pressed buttons.
</td>
</tr>
<tr>
<td>$kendo-button-pressed-bg</td>
<td>

    $selected-bg
</td>
<td>The background color of pressed buttons.
</td>
</tr>
<tr>
<td>$kendo-button-pressed-border</td>
<td>

    $selected-border
</td>
<td>The border color of pressed buttons.
</td>
</tr>
<tr>
<td>$kendo-button-pressed-gradient</td>
<td>

    none
</td>
<td>The background gradient of pressed buttons.
</td>
</tr>
<tr>
<td>$kendo-button-focus-shadow</td>
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
<th>Sample value</th>
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
<th>Sample value</th>
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

## Using Primitives

The Kendo UI components use primitives, meaning that different HTML elements in different components use the same CSS classes to provide a level of abstraction and allow common styling.

You can use some CSS classes to apply borders and background colors to containers&mdash;for example, `k-info-colored`, `k-success-colored`, and `k-error-colored`. For more examples, refer to the [Styling Panels demo](https://demos.telerik.com/kendo-ui/styling/panels).

### Common CSS Classes

| CSS Class   | Behavior  |
|:---         |:---       |
| `k-widget`  | The class is applied to the component wrapper to set a border, text and background color. In addition to `k-widget`, every component has its own specific CSS class, such as `k-menu`, `k-panelbar`, `k-tabstrip`, and so on.|
| `k-header`  | Applied to Grid headers, Menu top level items, PanelBar top level items, TabStrip items, and DropDownLists to set a background image and a background color. |
| `k-link`    | Applied to hyperlinks and clickable text items to set a text color.|
| `k-button`  | Applied to elements that are expected to look like push buttons. The class sets a text color, background color, background image, and hover styling. This is the recommended class for styling form buttons.|
| `k-input`   | Applied to textboxes inside input components like ComboBox and AutoComplete to set border, text and background color.|
| `k-textbox` | Same as `k-input`, but used for standalone (generic) `input` elements that are not part of a component. This is the recommended class for styling form `input` elements as it provides the same look, height, and vertical alignment as the Kendo UI input components.|
| `k-checkbox`| Applied to checkboxes inside the TreeView component, when checkboxes are enabled for it.|
| `k-group` and `k-content`| Applied to various containers to set a background and border color. |
| `k-popup`   | Applied to popup containers that are detached from their opener component and are placed in the `body` element. |
| `k-icon` and `k-sprite`| Applied to elements that display part of a sprite image as background to initialize their dimensions. |
| `k-image`   | Applied to inline images to set their dimensions. |
| `k-item`    | Applied to various repeating component items, for example, Menu, TabStrip, TreeView, PanelBar, ComboBox, DropDownList, and so on. This CSS class does not apply any particular global styles and sports `display: block`.|
| `k-first` and `k-last` | Set on the first and the last `k-item` respectively, where a special type of styling is needed, for example, rounded corners and removing borders. |

### The k-state Classes

The appearance of a component may well depend on its state, which is also tied to CSS classes.

| `k-state` Class   | Behavior  |
|:---               |:---       |
| `k-state-default` | This class is applied on items to set their default appearance background and colors. |
| `k-state-hover`   | Set to items when they are hovered to apply their hovered look. |
| `k-state-focused` | Applied on focused, mostly `input` elements and the DropDownList. |
| `k-state-active`  | Set on activated `k-link` elements. |
| `k-state-selected`| Set to selected items to apply their selected look like in the PanelBar and TabStrip. |
| `k-state-disabled` | Applied to disabled items. |
| `k-state-error`   | Can be used with form fields that have an invalid value. |

### Overriding Primitives

Usually, a CSS property that is defined by a primitive class is used by all components which use that class, unless overridden by a higher specificity selector.

    .k-link {
        color: blue;
    }

The previous code snippet will not affect the following setting because the latter uses a descendant selector and is therefore more specific (20 versus 10, to be precise).

    .k-panelbar .k-link {
        color: red;
    }

For more information about the CSS specificity, refer to [this article in the Smashing Magazine](http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/).

To override the styling for a given component type, you can use a CSS selector with the CSS class of the component. Make sure to register the custom rules after the respective theme CSS files. Otherwise, you have to use higher specificity and longer complex CSS selectors.

    .k-menu .k-link {
        color: red;
    }

To customize the appearance of a particular component instance, you need a custom CSS class or ID, and include it in the CSS selectors. The Menu from the following example can be styled by using its ID. The CSS rule will not affect any other component instances which are outside `#menu1`.

    <ul id="menu1" class="k-widget k-menu">
        <!-- menu items here -->
    </ul>

    // Style the Menu by its id.
    #menu1 .k-link {
        color: red;
    }
