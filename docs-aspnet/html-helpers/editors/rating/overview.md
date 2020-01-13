---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Rating HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/rating/overview
slug: htmlhelpers_rating_aspnetcore_overview
position: 1
---

# Rating HtmlHelper Overview

The Telerik UI Rating HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Rating widget.

The Rating allows to intuitively rate by selecting number of items stars from a predefined maximum number of items.

* [Demo page for the Rating](https://demos.telerik.com/{{ site.platform }}/rating/index)

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
* [Accessibility]({% slug accessibility_aspnetcore_rating %})

## See Also

* [Basic Usage of the Rating HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/rating/index)
* [Using the API of the Rating HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/rating/api)
* [Server-Side API](/api/rating)
