---
title: Overview
page_title: Button | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Button tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/button, /aspnet-core/helpers/tag-helpers/button
slug: taghelpers_button_aspnetcore
position: 1
---

# Button Tag Helper Overview

The Button tag helper helps you configure the Kendo UI Button widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Button by using the Button tag helper.

###### Example

        <kendo-button name="button1">Click here!</kendo-button>

## Configuration

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
