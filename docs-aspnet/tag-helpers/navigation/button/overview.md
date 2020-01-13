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

* [Basic Usage of the Button TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/button/tag-helper)
* [Server-Side API](/api/button)
