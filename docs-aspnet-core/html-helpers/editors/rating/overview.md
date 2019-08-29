---
title: Overview
page_title: Rating Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Telerik UI Rating HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_rating_aspnetcore_overview
position: 1
---

# Rating HtmlHelper Overview

The Telerik UI Rating HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Rating widget.

The Rating allows to intuitively rate by selecting number of items stars from a predefined maximum number of items.

* [Demo page for the Rating](https://demos.telerik.com/aspnet-core/rating/index)

## Initializing the Rating

The following example demonstrates how to define the Rating by using the Rating HtmlHelper.

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
    )
```

## Basic Configuration

The following example demonstrates the basic configuration for the Rating HtmlHelper.

```Razor
    @(Html.Kendo().Rating()
        .Name("rating")
        .Min(1)
        .Max(6)
        .Value(3)
    )

    <script>
    $(function() {
        // The Name() of the Rating is used to get its client-side instance.
        var rating = $("#rating").data("kendoRating");
    });
    </script>
```

## Functionality and Features

* [Selection]({% slug htmlhelpers_rating_aspnetcore_selection %})
* [Precision]({% slug htmlhelpers_rating_aspnetcore_precision %})
* [Label]({% slug htmlhelpers_rating_aspnetcore_label %})
* [Tooltip]({% slug htmlhelpers_rating_aspnetcore_tooltip %})
* [Templates]({% slug htmlhelpers_rating_aspnetcore_templates %})

## See Also

* [Basic Usage of the Rating HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/rating/index)
* [Using the API of the Rating HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/rating/api)
* [Server-Side API](/api/rating)
