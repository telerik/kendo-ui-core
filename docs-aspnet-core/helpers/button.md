---
title: Button
page_title: Button | UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Button tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_button_aspnetcore
---

# Button Tag Helper

The Button tag helper helps you configure the Kendo UI Button widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Button by using the Button tag helper.

###### Example

        <kendo-button name="button1">Click here!</kendo-button>

## Configuration

The Button tag helper configuration options are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().Button()
            .Name("imageButton")
            .HtmlAttributes(new { type = "button" })
            .ImageUrl(Url.Content("/shared/icons/sports/snowboarding.png"))
            .Content("Image icon"))
```
```tab-tagHelper

        <kendo-button name="button1" type="button"
            image-url="/shared/icons/sports/snowboarding.png">Image icon</kendo-button>
```

## See Also

* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
