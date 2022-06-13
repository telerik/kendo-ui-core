---
title: Customization
page_title: Less Themes Customization
description: "Learn how you can customize the Telerik UI for {{ site.framework }} Less themes."
slug: less_themes_customization_aspnetmvc6_aspnetmvc
position: 2
---

# Customization

The Telerik UI for {{ site.framework }} LESS themes can be customized, through modifying the `.less` files of the themes.

To create a custom theme:

1. Download the `commercial-source.zip` bundle that contains the `.less` files from your [Telerik account](https://www.telerik.com/login/v2/telerik).
1. Find the `.less` files in the `styles` folder of the downloaded bundle. Depending on the what modifications you want to achieve, extract the respective `kendo.*.less` file, copy it to your project and rename it. 
1. Make the needed changes to the default colors and run the [Less command-line compiler](http://lesscss.org/#using-less-command-line-usage) on it.

## Modifying Themes

Telerik UI for {{ site.framework }} supports a number of `.less` files, which are only used when you want to modify the CSS source code of the themes and create a custom theme. The `.less` files can be built by using the LESS 3.0.0 version.

The [Less command-line compiler](http://lesscss.org/#using-less-command-line-usage) is used for building the `LESS` source files to CSS skins and themes. The `.less` files, which can be passed to the compiler, are located in the `styles/folder`&mdash;`styles/web/` folder. 

The following list contains more information about the different `.less` files used by the themes.

| Less Files  | Contents and Application  |
|:---         |:---                       |
| `kendo.[theme-name].less` | The file contains theme variables. Building it produces a theme file. |
| `kendo.common.less`| This a default sizing file for all components. Building it produces a common file for all components.|
| `kendo.common-[theme-name].less` | Contains sizing adjustments for [theme-name] for all components. Building it produces a common file for all components. |
| `kendo.rtl.css` | Contains styles for components in RTL mode, CSS only. |
| `type-[theme-name].less` | Contains supporting files that cannot be built. Translates the colors from `kendo.[theme-name].less` to the theme colors to a usable theme. |

## Overriding Primitives

For the full list of primitives, refer to the [Overview article]({% slug less_themes_overview_aspnetmvc6_aspnetmvc %}#primitives).

Usually, a CSS property that is defined by a primitive class is used by all components, which use that class, unless overridden by a selector with higher specificity.

    .k-link {
        color: blue;
    }

The previous code snippet will not affect the following setting because the latter uses a descendant selector and is therefore more specific (20 versus 10, to be precise).

    .k-panelbar .k-link {
        color: red;
    }

For more information about the CSS specificity, refer to [this article in the Smashing Magazine](http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/).

To override the styling for a given widget type, you can use a CSS selector with the CSS class of the component. Make sure to register the custom rules after the respective theme CSS files. Otherwise, you have to use higher specificity and longer complex CSS selectors.

    .k-menu .k-link {
        color: red;
    }

To customize the appearance of a particular component, you need a custom CSS, if you have set such, or you can use its id in the CSS selector. The Menu from the following example can be styled by adding its Name (id) to the selector. The CSS rule will apply only to the Meny with `.Name("menu1")` and will not affect any other Menu instances, because they will have different ids.

    // Style a Menu by its id.
    #menu1 .k-link {
        color: red;
    }

## See More

* [Telerik and Kendo UI LESS Themes future plans blog post](https://www.telerik.com/blogs/future-plans-telerik-kendo-ui-less-themes)
* [Styling Overview Article]({% slug components_rendering_overview %})
