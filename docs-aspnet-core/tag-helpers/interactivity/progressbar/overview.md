---
title: Overview
page_title: ProgressBar Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI ProgressBar tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/progressbar, /aspnet-core/helpers/tag-helpers/progressbar
slug: taghelpers_progressbar_aspnetcore
position: 1
---

# ProgressBar Tag Helper Overview

The [ProgressBar](http://docs.telerik.com/kendo-ui/controls/interactivity/progressbar/overview) offers rich functionalities for displaying and tracking the progress of a task.

It supports multiple types, horizontal and vertical orientation, and also different directions.

The ProgressBar tag helper extension is a server-side wrapper for the [Kendo UI ProgressBar](http://demos.telerik.com/kendo-ui/progressbar/index) widget and enables you to configure the Kendo UI ProgressBar widget in ASP.NET Core applications.

## Initializing the ProgressBar

The following example demonstrates how to define the ProgressBar by using the ProgressBar tag helper.

        <kendo-progressbar name="fastAndFurious" type="ProgressBarType.Percent" />

## Basic Configuration

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

* [Basic Usage of the ProgressBar Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/progressbar/tag-helper)
* [JavaScript API Reference of the ProgressBar](http://docs.telerik.com/kendo-ui/api/javascript/ui/progressbar)
