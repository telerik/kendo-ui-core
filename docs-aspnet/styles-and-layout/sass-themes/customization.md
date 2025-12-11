---
title: Customization
page_title: Customization
description: "Learn how to create a custom theme for you application and alter the default appearance of the {{ site.product }} components."
components: ["general"]
slug: sassbasedthemes_customization_telerikui
position: 2
---

# Customization

You can customize the appearance of Telerik UI components using different approaches. Each is suitable for specific scenarios and business requirements. This article describes the pros and cons, and compares all CSS customization alternatives.

* [Create custom themes with the Progress ThemeBuilder](#using-themebuilder)
* [Override theme variables](#setting-theme-variables)
* [Override theme styles](#overriding-theme-styles)
* [Use CSS Utilities](#using-css-utilities)
* [Build custom themes manually](#building-themes-from-source-code)
* [Load a custom theme in your app](#loading-custom-themes)

> When you use custom themes for the components, you must recreate the custom theme every time you update the {{ site.product }} version in your application. This ensures compatibility and allows you to get the theme updates and fixes.

## Using ThemeBuilder

[ThemeBuilder](https://docs.telerik.com/themebuilder) is a web application that enables you to create new custom themes by changing the styles of existing built-in themes. Every change that you make is visualized instantly. Once you are done styling the UI components, you can export a ZIP file with the desired styles and [add the custom theme to your app](#loading-custom-themes).

The ThemeBuilder allows [different customization capabilities, depending on the used tier](https://docs.telerik.com/themebuilder/introduction#themebuilder-tiers).

## Setting Theme Variables

Each theme defines the same collection of variables, but with different values. For example, here are the <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/theme-variables/" target="_blank">Default theme variables</a>. You can override the theme variable values outside the theme CSS file. In this way, you can customize the appearance of the Telerik UI components without the need to create and maintain a full custom theme.

This approach is supported starting with theme version `8.0.0` and {{ site.product }} version `2024.2.514 (2024 Q2)`. Upgrading the Telerik UI components does not require any additional steps with regard to the CSS code, unless the CSS variable names contains breaking changes in the CSS variable names.

The example below shows how to customize some of the theme variables.

>caption Override theme variables

````HtmlHelper
<style>
    :root {
        --kendo-color-base: #ddf;
        --kendo-color-base-hover: #eef;
        --kendo-color-base-active: #ccf;
        --kendo-color-on-base: #00c;

        --kendo-color-primary: #c00;
        --kendo-color-primary-hover: #c66;
        --kendo-color-primary-active: #900;
        --kendo-color-on-primary: #fee;

        --kendo-border-radius-md: 1rem;

        --kendo-font-size: 18px;
    }
</style>

<p><label>Apply Custom Theme Variables</label></p>

@(Html.Kendo().CheckBox().Name("checkBox1").Checked(true).Label("Is Active"))

@(Html.Kendo().Button()
    .Name("baseTextButton")
    .Content("Base Button")
)

@(Html.Kendo().Button()
    .Name("primaryTextButton")
    .ThemeColor(ThemeColor.Primary)
    .Content("Primary Button")
)
````
{% if site.core %}
````TagHelper
@addTagHelper *, Kendo.Mvc

<style>
    :root {
        --kendo-color-base: #ddf;
        --kendo-color-base-hover: #eef;
        --kendo-color-base-active: #ccf;
        --kendo-color-on-base: #00c;

        --kendo-color-primary: #c00;
        --kendo-color-primary-hover: #c66;
        --kendo-color-primary-active: #900;
        --kendo-color-on-primary: #fee;

        --kendo-border-radius-md: 1rem;

        --kendo-font-size: 18px;
    }
</style>

<p><label>Apply Custom Theme Variables</label></p>

<kendo-checkbox name="checkBox1" checked="true" label="Is Active"> </kendo-checkbox>

<kendo-button name="baseTextButton">
    Base Button
</kendo-button>

<kendo-button name="primaryTextButton" theme-color="ThemeColor.Primary">
    Primary Button
</kendo-button>
````
{% endif %}

## Overriding Theme Styles

You can [override theme styles with custom CSS]({%slug themes-override%}), no matter if the app is using a built-in or custom theme. This approach makes sense only for a relatively small number of customizations. Beyond that, choose some of the other alternatives on this page.

Upgrading may require changes to the additional custom CSS code, but only if there are breaking changes in the HTML output and styling.

## Using CSS Utilities

The CSS Utilities allows you to create the desired layout using a collection of CSS classes. Each utility class changes the appearance of the target element by applying a specific CSS rule. For more information on the Telerik UI CSS Utilities and how to install the package, <a href="https://www.telerik.com/design-system/docs/utils/get-started/introduction/" target="_blank">refer to the CSS Utilities documentation</a>.

## Building Themes From Source Code

The most complex and flexible way to use Telerik themes is to build them from the SASS source code in your development environment.

Each <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/customization/" target="_blank">Theme Customization page in the Progress Design System documentation</a> and the [kendo-themes repository wiki](https://github.com/telerik/kendo-themes/wiki/Compiling-themes) provide more information about this process.

## Loading Custom Themes

Custom themes are used in a [similar way as the built-in themes]({%slug sassbasedthemes_overview%}#using-a-theme). The notable differences are:

* The custom theme must reside in the `wwwroot` folder of the {{ site.framework }} app or on a CDN provider.
* You must recreate custom themes every time you [update the {{ site.product }} version]({%slug upgrade_aspnetcore%}).

Make sure that the application is loading only one Telerik theme at a time. If you are replacing a built-in theme with a custom theme, you must remove the `<link>` element of the built-in theme.

## See Also

* [ThemeBuilder Online Tool](https://themebuilderapp.telerik.com)
* [ThemeBuilder Documentation](https://docs.telerik.com/themebuilder)