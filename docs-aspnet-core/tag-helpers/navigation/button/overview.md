---
title: Overview
page_title: Button Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Button tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/button, /aspnet-core/helpers/tag-helpers/button
slug: taghelpers_button_aspnetcore
position: 1
---

# Button Tag Helper Overview

The [Button](http://docs.telerik.com/kendo-ui/controls/navigation/button/overview) provides a styled clickable UI functionality with arbitrary content.

Apart from consistent Kendo UI styling, the Button provides keyboard operability for elements, which natively do not have it&mdash;for example, `span`.

The Button tag helper extension is a server-side wrapper for the [Kendo UI Button](http://demos.telerik.com/kendo-ui/button/index) widget and enables you to configure the Kendo UI Button widget in ASP.NET Core applications.

## Initializing the Button

The following example demonstrates how to define the Button by using the Button tag helper.

        <kendo-button name="button1">Click here!</kendo-button>

## Basic Configuration

The Button tag helper configuration options are passed as attributes of the tag.

```cshtml

        @(Html.Kendo().Button()
            .Name("imageButton")
            .HtmlAttributes(new { type = "button" })
            .ImageUrl(Url.Content("/shared/icons/sports/snowboarding.png"))
            .Content("Image icon"))
```
```tagHelper

        <kendo-button name="button1" type="button"
            image-url="/shared/icons/sports/snowboarding.png">Image icon</kendo-button>
```

## See Also

* [Basic Usage of the Button Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/button/tag-helper)
* [JavaScript API Reference of the Button](http://docs.telerik.com/kendo-ui/api/javascript/ui/button)
