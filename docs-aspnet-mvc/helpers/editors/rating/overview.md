---
title: Overview
page_title: Rating Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Rating HtmlHelper for ASP.NET MVC."
slug: overview_ratinghelper_aspnetmvc
position: 1
---

# Rating HtmlHelper Overview

The Telerik UI Rating HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Rating widget.

The Rating allows to intuitively rate by selecting number of items stars from a predefined maximum number of items.

* [Demo page for the Rating](https://demos.telerik.com/aspnet-mvc/rating/index)

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

* [Selection]({% slug selection_ratinghelper_aspnetmvc %})
* [Precision]({% slug precision_ratinghelper_aspnetmvc %})
* [Label]({% slug label_ratinghelper_aspnetmvc %})
* [Tooltip]({% slug tooltip_ratinghelper_aspnetmvc %})
* [Templates]({% slug templates_ratinghelper_aspnetmvc %})

## See Also

* [Basic Usage of the Rating HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/rating/index)
* [Using the API of the Rating HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/rating/api)
* [Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/Rating)
