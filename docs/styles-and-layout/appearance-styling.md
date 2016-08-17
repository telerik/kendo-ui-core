---
title: Themes and Layout
page_title: Themes and Layout | Kendo UI Styles and Appearance
description: "Learn how to define CSS classes in the Kendo UI desktop widgets to change their appearance and customize their style further."
previous_url: /web/appearance-styling, /web/appearance-rtl, /dataviz/appearance-styling
slug: themesandappearnce_kendoui_desktopwidgets
position: 1
---

# Themes and Layout

All [Kendo UI widgets](http://demos.telerik.com/kendo-ui/) arrive with a number of predefined themes.

**Figure 1. Kendo UI themes for the Web**

![Kendo UI Web Themes](/styles-and-layout/web-themes.png)

This is how the same themes are rendered in widgets that visualize data, such as Gauges, Charts, Barcodes, Diagrams, and Maps.

**Figure 2. Kendo UI themes for widgets rendering data visualization**

![Kendo UI DataViz Themes](/styles-and-layout/dataviz-themes.png)

## Getting Started

### The Basics

Setting a Kendo UI theme for any of the Kendo UI widgets, such as [Kendo UI Grid](http://demos.telerik.com/kendo-ui/grid/index), or [Kendo UI Bar Chart](http://demos.telerik.com/kendo-ui/bar-charts/index), requires you to include the following two stylesheets to your project:

* `kendo.common.css` - This is a common (base) stylesheet. It applies styles related to element positioning and widget dimensions. It is a must for the widgets to look and function in a proper way.
* `kendo.[theme].css` - This stylesheet applies theme-specific styles such color palette, background gradients and patterns, etc.

Kendo UI Gauges, Charts, Barcodes, Diagrams, and Maps use a mix of browser technologies to attain the required precision and responsiveness. Visualization is rendered as vector graphics with computed layout. In contrast, interactive features are built using traditional HTML elements. As a result, the appearance settings of these widgets are split between declarative options and traditional CSS.

The example below demonstrates how to define a theme for a Kendo UI Chart.

###### Example

    $("#chart").kendoChart({
        theme: "[theme]"
        ...
    });

The example below demonstrates how to include the stylesheets to your project.

###### Example

    <html>
    <head>
        <link rel="stylesheet" href="[file path]/kendo.common.min.css" />
        <link rel="stylesheet" href="[file path]/kendo.default.min.css" />
    </head>

> **Important**
> * The common CSS file must be registered before the theme CSS file. This is because the theme CSS file may need to override common styles via selectors with the same CSS specificity.
> * Only one pair of common and theme CSS file should be registered on the page at any given time.

The appearance of the Kendo UI widgets entirely depends on styles defined by the applied CSS classes. No inline styles are used, except for some very specific cases, in which these styles must be set with Javascript, depending on the browser or configuration.

### Common CSS Files

Some themes require a different common (base) stylesheet that applies different dimensions. There are four `common` styleshees shipped with Kendo UI.

| CSS Files   | Contents and Application |
|:---         |:---                     |
| **`kendo.common.css`**                | This is the default base stylesheet, which is required by the majority of the Kendo UI themes. |
| **`kendo.common-bootstrap.css`**      | The base stylesheet for the Bootstrap theme. Use this file instead of `kendo.common.css` and only with `kendo.bootstrap.css` theme file to achieve Bootstrap-like widget dimensions. |
| **`kendo.common-material.css`**       | The base stylesheet for the Material and MaterialBlack themes. Use this file instead of `kendo.common.css` and only with `kendo.material.css` or `kendo.materialblack.css` theme files. |
| **`kendo.common-nova.css`**           | The base stylesheet for the Nova theme. Use this file instead of `kendo.common.css` and only with `kendo.nova.css`. |
| **`kendo.common-fiori.css`**          | The base stylesheet for the Fiori theme available in the enterprise bundles of Kendo UI. Use this file instead of `kendo.common.css` and only with `kendo.fiori.css`. |
| **`kendo.common-office365.css`**      | The base stylesheet for the Office365 theme available in the enterprise bundles of Kendo UI. Use this file instead of `kendo.common.css` and only with `kendo.office365.css`. |

### Theme-Related Folders

Apart from the common stylesheet and theme stylesheet, the following folders must be available in your application.

* `/ThemeName/`&mdash;This is the folder, which contains all images required by the used Kendo UI theme. The folder name matches the theme name, e.g. `Default`, `Bootstrap`, `Silver`, etc. The theme image folders for unused themes can be removed.
* `/fonts/`&mdash;This is where the `KendoUIGlyphs` and `DejaVu` font files reside. The `KendoUIGlyphs` font describes the Kendo UI font icons used by the web widgets. The `DejaVu` font is used by default during [PDF export]({% slug drawingofhtmlelements_drawingapi %}).
* `/images/`&mdash;This where the Kendo UI font icons for the mobile widgets reside.
* `/textures/`&mdash;This is where some fallback theme images are stored for browsers that do not support the CSS3 linear gradients.

### Browser-Specific CSS

While most of the CSS code is cross-browser compatible, some layouts require different styles for different browsers. Kendo UI targets specific browsers by adding browser-specific classes to the document root element instead of relying on CSS parsing hacks.

The example below demonstrates how to take advantage of these classes.

###### Example

    .k-ie { /* styles to be applied to all versions of Internet Explorer */ }
    .k-ie7 { /* styles to be applied to IE7 only */ }
    .k-ff { /* styles to be applied to all versions of Firefox */ }

<!--*-->
The syntax of the generated classes is `k-[browser] k-[browser][majorVersion]`.

## Primitives

Kendo UI widgets use primitives, meaning that different HTML elements in different widgets use the same CSS classes to provide a level of abstraction and allow common styling.

### Common CSS Classes

| CSS Class   | Behavior  |
|:---         |:---       |
| **`k-widget`**  | The class is applied to the widget wrapper to set a border, text and background color. In addition to `k-widget`, every widget has its own specific CSS class, such as `k-menu`, `k-panelbar`, `k-tabstrip`, etc.|
| **`k-header`**  | Applied to Grid headers, Menu top level items, PanelBar top level items, TabStrip items, and DropDownLists to set a background image and a background color. |
| **`k-link`**    | Applied to hyperlinks and clickable text items to set a text color.|
| **`k-button`**  | Applied to elements that are expected to look like push buttons. The class sets a text color, background color, background image, and hover styling. This is the recommended class for styling form buttons.|
| **`k-input`**   | Applied to textboxes inside input widgets like ComboBox and AutoComplete to set border, text and background color.|
| **`k-textbox`** | Same as `k-input`, but used for standalone (generic) `input` elements that are not part of a widget. This is the recommended class for styling form `input` elements as it provides the same look, height, and vertical alignment as the Kendo UI input widgets.|
| **`k-checkbox`**| Applied to checkboxes inside the TreeView widget, when checkboxes are enabled for it.|
| **`k-group`** and **`k-content`**| Applied to various containers to set a background and border color. |
| **`k-popup`**   | Applied to popup containers that are detached from their opener component and are placed in the `body` element. |
| **`k-icon`** and **`k-sprite`**| Applied to elements that display part of a sprite image as background to initialize their dimensions. |
| **`k-image`**   | Applied to inline images to set their dimensions. |
| **`k-item`**    | Applied to various repeating widget items, e.g. Menu, TabStrip, TreeView, PanelBar, ComboBox, DropDownList, etc. This CSS class does not apply any particular global styles and sports `display: block`.|
| **`k-first`** and **`k-last`** | Set on the first and the last `k-item` respectively, where a special type of styling is needed, e.g. rounded corners and removing borders. |

### The k-state Classes

The appearance of a component may well depend on its state, which is also tied to CSS classes.

| `k-state` Class   | Behavior  |
|:---               |:---       |
| **`k-state-default`** | This class is applied on items to set their default appearance background and colors. |
| **`k-state-hover`**   | Set to items when they are hovered to apply their hovered look. |
| **`k-state-focused`** | Applied on focused, mostly `input` elements and the DropDownList. |
| **`k-state-active`**  | Set on activated `k-link` elements. |
| **`k-state-selected`**| Set to selected items to apply their selected look like in the PanelBar and TabStrip. |
| **`k-state-disabled`** | Applied to disabled items. |
| **`k-state-error`**   | Can be used with form fields that have an invalid value. |

### Other

There are some CSS classes, which you can use to apply borders and background colors to containers, such as `k-info-colored`, `k-success-colored`, and `k-error-colored`. They are demonstrated in the [StylingPanels demo](http://demos.telerik.com/kendo-ui/styling/panels).

## Customization of Appearance

### Override Primitives

Usually, a CSS property defined by a primitive class is used by all widgets which use that class, unless overridden by a higher specificity selector as demonstrated in the example below.

###### Example

    .k-link
    {
        color: blue;
    }

is not going to affect

    .k-panelbar .k-link
    {
        color: red;
    }

because the latter uses a descendant selector and is therefore more specific (20 versus 10, to be precise).

For more information about the CSS specificity, check out [this article in the Smashing Magazine](http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/).

If you want to override the styling for a given widget type, you are able to use a CSS selector with the widget's own CSS class, as demonstrated in the example below.

###### Example

    .k-menu .k-link
    {
        color: red;
    }

When you do this, make sure to register the custom rules after the respective theme CSS files. Otherwise you need to use higher specificity and longer complex CSS selectors. To customize the appearance of a particular widget instance, you will need a custom CSS class or ID, and include it in the CSS selectors, as demonstrated in the example below.

###### Example

The following Menu:

	<ul id="menu1" class="k-widget k-menu">
		<!-- menu items here -->
	</ul>

can be styled by using its ID:

	#menu1 .k-link
	{
		color: red;
	}

The above CSS rule is not going to affect any other widget instances, which are outside `#menu1`.

### Customize Checkboxes and Radio Buttons

With the 2014 Q3 release Kendo UI provides customized presentation for checkboxes and radio buttons via the `k-checkbox` and `k-radio` classes respectively. At this time these two types of input cannot be styled with CSS only. Therefore, Kendo UI Checkboxes and Radio buttons appearance relies on the `<input>` element being immediately followed by a `<label>` element with the respective `k-checkbox-label` or `k-radio-label` class. The expected HTML is demonstrated in the example below.

###### Example

    <!-- Kendo UI Checkbox -->
	<input type="checkbox" id="checkbox" class="k-checkbox">
	<label class="k-checkbox-label" for="checkbox"></label>

	<!-- Kendo UI Radio button -->
	<input type="radio" id="radiobutton" class="k-radio">
	<label class="k-radio-label" for="radiobutton"></label>

## Custom Themes Creation

Kendo UI supports a number of `.less` files, which are only used when you want to modify the Kendo UI CSS source code and create a custom theme.

### LESS Files Overview

In the Kendo UI Q1 2014 release, the Kendo UI `web.common.less` file was split, which resulted in the construction of `.less` files for each widget. The Kendo UI mobile platform themes were also divided in parts to create files per widget.

The [`LESS` command-line compiler](http://lesscss.org/#using-less-command-line-usage) is used for building the `LESS` source files to CSS skins and themes. The `.less` files, which can be passed to the compiler, are located in the first-level folders inside `styles/folder`&mdash;`styles/web/` and `styles/mobile/`. Kendo UI files for mobile are self-explanatory. Except `meego.less`, which is deprecated, the rest of the files can be built by using the `.less` files modification and produce all platform themes. Some use CSS files, including `kendo.mobile.all.css`.

### Available LESS Files

The list below demonstrates the names of the `.less` files supported by Kendo UI.

| LESS Files  | Contents and Application  |
|:---         |:---                       |
| **`kendo.[theme-name].less`** | The file contains theme variables, but does not include styles for hybrid widgets. Building it produces a theme file. |
| **`kendo.[theme-name].mobile.less`** | Contains styling for all widgets, including hybrid ones. Building it produces a theme file for all widgets. |
| **`kendo.common.less`**| This a default sizing file for all Kendo UI widgets. Building it produces a common file for all Kendo UI widgets.|
| **`kendo.common-[theme-name].less`** | Contains sizing adjustments for [theme-name] for all Kendo UI widgets. Building it produces a common file for all Kendo UI widgets. |
| **`kendo.common.core.less`** | This is a default sizing file for Kendo UI Core widgets. Building it produces a common file for Kendo UI Core widgets. |
| **`kendo.common-[theme-name].core.less`** | Contains sizing adjustments for [theme-name] for Kendo UI Core widgets. Building it produces a common file for Kendo UI Core widgets.|
| **`kendo.rtl.css`** | Contains styles for widgets in RTL mode, CSS only. |
| **`type-[theme-name].less`** | Contains supporting files that cannot be built. Translates the colors from `kendo.[theme-name].less` to the theme colors to a usable theme. |

The Kendo UI `.less` files, including the styling of the Kendo UI hybrid widgets, can be built using the LESS 1.7.5 version.

> **Important**
>
> Kendo UI versions before 2015.2.805 inclusive had to be built with [Telerik `LESS` fork, located on GitHub](https://github.com/telerik/less.js). This is no longer a requirement.

### Customization of Themes

To create a custom theme with Kendo UI, choose either of the two possible ways:

1. Use the [Kendo UI ThemeBuilder](http://demos.telerik.com/kendo-ui/themebuilder/). For detailed information on how to configure its options, refer to the [ThemeBuilder overview article]({% slug themebuilder_overview_kendouistyling %}).
2. Modify a `.less` file to achieve a theme of your liking. To do so, choose one of the available `kendo.*.less` files depending on what you want to achieve. Copy it to your project and rename it. Change the colors and run the [`LESS` command-line compiler](http://lesscss.org/#using-less-command-line-usage) on it.   

## See Also

Other articles on styling, appearance, and rendering of Kendo UI widgets:

* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [How to Change Themes on the Client]({% slug howto_changethemes_ontheclient_styleskendoui %})
* [ThemeBuilder Overview]({% slug themebuilder_overview_kendouistyling %})
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})
* [Troubleshooting]({% slug commonissues_troubleshooting_kendouistyling %})
* [Themes and Appearance of the Kendo UI Hybrid Widgets](/controls/hybrid/styling)
