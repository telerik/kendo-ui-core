---
title: Overview
page_title: ProgressBar | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI ProgressBar tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/progressbar, /aspnet-core/helpers/tag-helpers/progressbar
slug: taghelpers_progressbar_aspnetcore
position: 1
---

# ProgressBar Tag Helper Overview

The ProgressBar tag helper helps you configure the Kendo UI ProgressBar widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the ProgressBar by using the ProgressBar tag helper.

###### Example

        <kendo-progressbar name="fastAndFurious" type="ProgressBarType.Percent" />

## Configuration

The ProgressBar tag helper configuration options are passed as attributes of the tag.

```cshtml

        @(Html.Kendo().ProgressBar()
                .Name("fastAndFurious")
                .Type(ProgressBarType.Percent)
                .Animation(a => a.Duration(600))
        )
```
```tagHelper

        <kendo-progressbar name="fastAndFurious"
            type="ProgressBarType.Percent" animation-duration="600" />
```

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
