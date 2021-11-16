---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Button TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/button, /helpers/tag-helpers/button
slug: taghelpers_button_aspnetcore
position: 1
---

# Button TagHelper Overview

The Telerik UI Button TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Button widget.

The Button provides a styled clickable UI functionality with arbitrary content. Apart from consistent Kendo UI for jQuery styling, the Button provides keyboard operability for elements, which natively do not have it&mdash;for example, `span`.

* [Demo page for the Button](https://demos.telerik.com/aspnet-core/button/tag-helper)

## Initializing the Button

The following example demonstrates how to define the Button by using the Button TagHelper.

        <kendo-button name="button1">Click here!</kendo-button>

## Basic Configuration

The Button TagHelper configuration options are passed as attributes of the tag.

* The `name` attribute is mandatory as its value will be used for the `id` attribute of the Button element. Moreover, the `id` is used to properly initialize the Button widget. The `id` attribute value is also used to retrieve its client-side instance.
* The `enable` attribute determines whether the widget will be initially enabled (by default) or disabled.
* The `tag` attribute allows you to determine whether the widget will be initialized from a `<button>` element (by default), or an `<a>` element.
* The `image-url` attribute defines a URL (it can be relative or absolute), which will be used for an `img` element inside the Button. The `img` element is added automatically by the widget.
* The `icon` attribute applies an icon that exists in the Kendo UI theme sprite as a background image of a generated `span` element inside the Button. For a list of available icons, refer to the [Web Font Icons document](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web). 
To add a custom icon, use the `icon-class` attribute. It accepts CSS classes.
* The `sprite-css-class` attribute defines a CSS class (or multiple classes separated by spaces), which will be used for applying a background image to a generated `span` element inside the Button.
* The `badge` tag accommodates a [Badge]({% slug taghelpers_badge_aspnetcore %}) within the Button to enhance the meaning of the text content.


```tagHelper

        <kendo-button name="imageButton" enable="true" tag="a" image-url="/shared/icons/sports/snowboarding.png">
                <badge text="+1" 
                shape="@BadgeShape.Circle" 
                size="@BadgeSize.Medium" 
                theme-color="@BadgeColor.Success"
                position="@BadgePosition.Edge"
                align="@BadgeAlign.TopEnd" />
        Image button
        </kendo-button>

```
```cshtml

        @(Html.Kendo().Button()
            .Name("imageButton")
            .ImageUrl(Url.Content("/shared/icons/sports/snowboarding.png"))
            .Content("Image button"))
            .Enable(true)
            .Tag("a")
            .Badge(b => b
                .Text("+1")
                .Shape(BadgeShape.Circle)
                .Size(BadgeSize.Medium)
                .ThemeColor(BadgeColor.Success)
                .Position(BadgePosition.Edge)
                .Align(BadgeAlign.TopEnd)
            )
        )

```

## Functionality and Features

* [Disabled Button]({% slug taghelpers_button_disabled %})
* [Icon Button]({% slug taghelpers_button_icons %})
* [Badge Button]({% slug taghelpers_button_badges %})

## See Also

* [Basic Usage of the Button TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/button/tag-helper)
* [Button Server-Side API](/api/button)
* [Button Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/button)
