---
title: Customization
page_title: Customization - Less Themes
description: "Learn how to customize the Kendo UI Less themes."
slug: less_themes_customization_kendoui
position: 2
---

# Customization

Kendo UI provides options for creating custom themes. 

To implement the desired customization, modify a `.less` file to achieve a theme of your liking. 

To do so, choose one of the available `kendo.*.less` files depending on what you want to achieve. Copy it to your project and rename it. Change the colors and run the [Less command-line compiler](http://lesscss.org/#using-less-command-line-usage) on it.

## Modifying Themes

Kendo UI supports a number of `.less` files, which are only used when you want to modify the Kendo UI CSS source code and create a custom theme. In the Kendo UI Q1 2014 release, the Kendo UI `web.common.less` file was split, which resulted in the construction of `.less` files for each widget. The Kendo UI mobile platform themes were also divided in parts to create files per widget. The Kendo UI `.less` files, including the styling of the Kendo UI hybrid widgets, can be built by using the Less 3.0.0 version.

> * As of 2019.1 versions and onwards Kendo UI for jQuery distributes a single and identical set of themes for both Kendo UI Professional and Kendo UI Core.
> * Kendo UI versions earlier than and including 2015.2.805 had to be built with [Telerik Less fork](https://github.com/telerik/less.js) located on GitHub. This is no longer a requirement.

The [Less command-line compiler](http://lesscss.org/#using-less-command-line-usage) is used for building the `LESS` source files to CSS skins and themes. The `.less` files, which can be passed to the compiler, are located in the first-level folders inside `styles/folder`&mdash;`styles/web/` and `styles/mobile/`. Kendo UI files for mobile are self-explanatory. Except `meego.less`, which is deprecated, the rest of the files can be built by using the `.less` files modification and produce all platform themes. Some use CSS files, including `kendo.mobile.all.css`.

The following list demonstrates the names of the `.less` files that are supported by Kendo UI.

| Less Files  | Contents and Application  |
|:---         |:---                       |
| `kendo.[theme-name].less` | The file contains theme variables, but does not include styles for hybrid widgets. Building it produces a theme file. |
| `kendo.[theme-name].mobile.less` | Contains styling for all widgets, including hybrid ones. Building it produces a theme file for all widgets. |
| `kendo.common.less`| This a default sizing file for all Kendo UI widgets. Building it produces a common file for all Kendo UI widgets.|
| `kendo.common-[theme-name].less` | Contains sizing adjustments for [theme-name] for all Kendo UI widgets. Building it produces a common file for all Kendo UI widgets. |
| `kendo.rtl.css` | Contains styles for widgets in RTL mode, CSS only. |
| `type-[theme-name].less` | Contains supporting files that cannot be built. Translates the colors from `kendo.[theme-name].less` to the theme colors to a usable theme. |

## Overriding Primitives

For the full list of primitives, refer to the [Overview article]({% slug themesandappearnce_kendoui_desktopwidgets %}#primitives).

Usually, a CSS property that is defined by a primitive class is used by all widgets which use that class, unless overridden by a higher specificity selector.

    .k-link {
        color: blue;
    }

The previous code snippet will not affect the following setting because the latter uses a descendant selector and is therefore more specific (20 versus 10, to be precise).

    .k-panelbar .k-link {
        color: red;
    }

For more information about the CSS specificity, refer to [this article in the Smashing Magazine](http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/).

To override the styling for a given widget type, you can use a CSS selector with the CSS class of the widget. Make sure to register the custom rules after the respective theme CSS files. Otherwise, you have to use higher specificity and longer complex CSS selectors.

    .k-menu .k-link {
        color: red;
    }

To customize the appearance of a particular widget instance, you need a custom CSS class or ID, and include it in the CSS selectors. The Menu from the following example can be styled by using its ID. The CSS rule will not affect any other widget instances which are outside `#menu1`.

    <ul id="menu1" class="k-widget k-menu">
        <!-- menu items here -->
    </ul>

    // Style the Menu by its id.
    #menu1 .k-link {
        color: red;
    }