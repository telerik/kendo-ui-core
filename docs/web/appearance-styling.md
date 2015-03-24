---
title: Kendo Widget CSS Styles
page_title: Appearance and Styling of Kendo UI HTML5 widgets
description: Define CSS classes of Kendo UI Widgets to change their appearance. Learn how to easily customize Kendo components by overriding the styling of a given widget.
---

# Appearance and Styling

Kendo UI widgets arrive with a number of predefined themes:

![Kendo UI DataViz Themes](/web/web-themes.png)


Setting a Kendo UI **Web** theme (i.e. excluding Mobile and DataViz) requires the inclusion of two stylesheets to your project:

* **kendo.common.css** - This common (base) stylesheet applies styles related to element positioning and widget dimensions. It is a mandatory stylesheet for the widgets to look correct and function properly.

* **kendo.[theme].css** - This stylesheet applies theme-specific styles like color palette, background gradients and patterns, etc.

#### Example:
    <html>
    <head>
        <link rel="stylesheet" href="[file path]/kendo.common.min.css" />
        <link rel="stylesheet" href="[file path]/kendo.default.min.css" />
    </head>

> Be sure to include the common CSS file before the theme CSS file. In some cases, the theme CSS file may override base styles as it uses selectors with the same specificity.

The appearance of the **Kendo UI** widgets depends entirely on styles defined by the applied CSS classes.
No inline styles are used, except for some very specific cases in which these styles must be set with Javascript, depending on the browser or configuration.

Some themes require a different "common" stylesheet that applies different dimensions. There are four "common" styleshees shipped with Kendo UI:

* **kendo.common.css** - The default base stylesheet.

* **kendo.common-bootstrap.css** - The base stylesheet for the Bootstrap theme. Use this file instead of kendo.common.css and only with kendo.bootstrap.css theme file to achieve Bootstrap like widget dimensions.

* **kendo.common-material.css** - The base stylesheet for the Material and MaterialBlack themes. Use this file instead of kendo.common.css and only with kendo.material.css or kendo.materialblack.css theme files.

* **kendo.common-fiori.css** - The base stylesheet for the Fiori theme available in Kendo UI Professional. Use this file instead of kendo.common.css and only with kendo.fiori.css.

## Primitives

Kendo UI widgets use primitives, meaning that different HTML elements in different widgets use the same CSS classes to provide a level of abstraction and allow common styling.

Commonly-used CSS classes include:

*   **k-widget** - applied to the widget wrapper to set a border, text and background color. In addition to `k-widget`, every widget has its own specific CSS class, for example `k-menu`, `k-panelbar`, `k-tabstrip`, etc.
*   **k-header** - applied to Grid headers, Menu top level items, PanelBar top level items, TabStrip items, DropDownLists, to set a background image and a background color
*   **k-link** - applied to hyperlinks and clickable text items to set a text color
*   **k-button** - applied to elements that should look like push buttons. The class sets a text color, background color, background image and hover styling. This is the recommended class for styling **form buttons**
*   **k-input** - applied to textboxes inside input widgets like ComboBox and AutoComplete to set border, text and background color
*   **k-textbox** - same as k-input, but used for standalone (generic) input elements that are not part of widget. This is the recommended class for styling **form input elements** as it provides the same look, height and vertical alignment as the Kendo UI input widgets
*   **k-checkbox** - applied to checkboxes inside the treeview widget, when checkboxes are enabled for it.
*   **k-group** and **k-content** - applied to various containers to set a background and border color
*   **k-popup** - applied to popup containers that are detached from their opener component and are placed in the `body` element
*   **k-icon** and **k-sprite** - applied to elements that display part of a sprite image as background to init their dimensions
*   **k-image** - applied to inline images to set their dimensions
*   **k-item** - applied to various repeating widget items, e.g. in the Menu, TabStrip, TreeView, PanelBar, ComboBox, DropDownList, etc. This CSS class does not apply any particular global styles and sports display: block.
*   **k-first** and **k-last** - set on first and last `k-item` respectively, where special styling is needed - rounded corners, removing borders

The appearance of a component may also depend on its state, which is also tied to CSS classes:

*   **k-state-default** - this class is applied on items to set their default appearance background and colors
*   **k-state-hover** - this class is set to items when they are hovered to apply their hovered look
*   **k-state-focused** - this class is applied on focused mostly input elements (plus DropDownList)
*   **k-state-active** - a class set on activated **k-link** elements
*   **k-state-selected** - selected items receive this class to apply their selected look, like in PanelBar and TabStrip
*   **k-state-disabled** - this class is set on disabled items
*   **k-state-error** - this class can be used with form fields that have an invalid value

In addition, there are some CSS classes, which you can use to apply borders and background colors to containers - `k-info-colored`, `k-success-colored` and `k-error-colored`.
They are shown in the [StylingPanels demo](http://demos.telerik.com/kendo-ui/styling/panels).

## LESS structure

**The following LESS-related information is applicable only to the case when you want to modify the Kendo UI CSS source code.**

In Q1 2014 we split the Kendo UI Web common LESS file to separate LESS files for each widget. We also split all Kendo UI Mobile platform themes to file per widget.
The LESS command-line compiler can be used to build source LESS files to CSS skins and themes. The LESS files that can be passed to the compiler are located in the first level folders inside styles/ folder -
styles/web/ and styles/mobile/. Kendo UI Mobile files are self explanatory - except meego.less, which is deprecated, the rest of the files can be built with [our fork of LESS, located in GitHub](https://github.com/telerik/less.js)
and produce all platform themes and several special use CSS files (including kendo.mobile.all.css).
The Kendo UI Web LESS files' naming is listed below:

*   **kendo.[skin-name].less** - skin variables file, builds with compiler - produces the skin;
*   **kendo.[skin-name].mobile.less** - mobile widgets styling for the corresponding skin, references the variables file above, builds - produces the mobile skin;
*   **kendo.common.core.less** - core Common LESS file, references only the common core, builds - produces the common core CSS;
*   **kendo.common.less** - full Common LESS file, builds - produces the common Web CSS;
*   **kendo.common-bootstrap.core.less** - core Bootstrap common, builds - produces the core common Bootstrap CSS;
*   **kendo.common-bootstrap.less** - full Bootstrap common, builds - produces the common Bootstrap CSS;
*   **kendo.rtl.css** - RTL styles, CSS only;
*   **kendo.winjs.less** - WinJS specific styles, builds;
*   **theme-template.less** - common skin template, referenced by all skins, doesn't build;
*   **type-metro.less** - common metro skin template, referenced by all metro skins, doesn't build;

The Kendo UI Web LESS files (including the Kendo UI Web mobile widgets styling) can be built using the upstream LESS, version 1.5.0 or newer.

## Customizing Appearance

Usually, a CSS property defined by a primitive class is used by all widgets that use that class, unless overridden by a higher specificity selector. For example:

    .k-link
    {
        color: blue;
    }


will not affect

    .k-panelbar .k-link
    {
        color: red;
    }


because the latter uses a descendant selector and thus, is more specific (20 versus 10, to be precise).

For more information about CSS specificity, check out [this excellent article in Smashing Magazine](http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/).

If you want to override the styling for a given **widget type**, you can use a CSS selector with the widget's own CSS class:

    .k-menu .k-link
    {
        color: red;
    }

When you do this, make sure to register the custom rules after the respective theme CSS files. Otherwise you will need to use higher specificity and longer complex CSS selectors.

In order to customize the appearance of a **particular widget instance**, you will need a custom CSS class or ID, and include it in the CSS selectors. For example the following Menu...

	<ul id="menu1" class="k-widget k-menu">
		<!-- menu items here -->
	</ul>

can be styled by using its ID:

	#menu1 .k-link
	{
		color: red;
	}

The above CSS rule will not affect any other widget instances, which are outside `#menu1`.

## Browser-specific CSS

While most of the CSS code is cross-browser compatible, some layouts require different styles for different browsers. Kendo UI targets specific browsers by adding browser-specific classes to the document root element instead of relying on CSS parsing hacks. You can take advantage of these classes in the following manner:

    .k-ie { /* styles to be applied to all versions of Internet Explorer */ }
    .k-ie7 { /* styles to be applied to IE7 only */ }
    .k-ff { /* styles to be applied to all versions of Firefox */ }

The syntax of the generated classes is `k-[browser] k-[browser][majorVersion]`.

## Checkboxes and Radio buttons

With Q3 2014 release Kendo UI provides customized presentation for checkboxes / radio buttons via the **k-checkbox** / **k-radio** classes. At this time these two types of input cannot be styled with CSS only - therefore Kendo UI Checkboxes / Radio buttons appearance relies that the `<input>` element is **immediately followed** by a `<label>` element with respectively **k-checkbox-label** / **k-radio-label** classes. I.e. the expected HTML is as follows:

    <!-- Kendo UI Checkbox -->
	<input type="checkbox" id="checkbox" class="k-checkbox">
	<label class="k-checkbox-label" for="checkbox"></label>

	<!-- Kendo UI Radio button -->
	<input type="radio" id="radiobutton" class="k-radio">
	<label class="k-radio-label" for="radiobutton"></label>

