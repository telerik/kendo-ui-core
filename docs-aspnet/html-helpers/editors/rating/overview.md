---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Rating component for {{ site.framework }}."
previous_url: /helpers/editors/rating/overview
slug: htmlhelpers_rating_aspnetcore_overview
position: 1
---

# {{ site.framework }} Rating Overview

{% if site.core %}
The Telerik UI Rating TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Rating widget.
{% else %}
The Telerik UI Rating HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Rating widget.
{% endif %}

The Rating allows to intuitively rate by selecting number of items stars from a predefined maximum number of items.

* [Demo page for the Rating HtmlHelper](https://demos.telerik.com/{{ site.platform }}/rating/index)
{% if site.core %}
* [Demo page for the Rating TagHelper](https://demos.telerik.com/aspnet-core/rating/tag-helper)
{% endif %}

## Initializing the Rating

The following example demonstrates how to define the Rating.

```HtmlHelper
    @(Html.Kendo().Rating()
        .Name("rating")
    )
```
{% if site.core %}
```TagHelper
    <kendo-rating name="rating"></kendo-rating>
```
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration for the Rating.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-rating name="rating" min="1" max="6" value="3"></kendo-rating>
```
{% endif %}

## Functionality and Features

* [Selection]({% slug htmlhelpers_rating_aspnetcore_selection %})
* [Precision]({% slug htmlhelpers_rating_aspnetcore_precision %})
* [Label]({% slug htmlhelpers_rating_aspnetcore_label %})
* [Tooltip]({% slug htmlhelpers_rating_aspnetcore_tooltip %})
* [Templates]({% slug htmlhelpers_rating_aspnetcore_templates %})
* [Accessibility]({% slug accessibility_aspnetcore_rating %})

{% if site.core %}
## Events

You can subscribe to all Rating events.

```TagHelper
    <kendo-rating name="rating" on-change="onChange" on-select="onSelect"></kendo-rating>

    <script>
        function onChange(e) {
            console.log(e);
        }

        function onSelect(e) {
            console.log(e);
        }
    </script>

```
{% endif %}

## See Also

* [Basic Usage of the Rating HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/rating/index)
{% if site.core %}
* [Basic Usage of the Rating Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/rating/tag-helper)
{% endif %}
* [Using the API of the Rating HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/rating/api)
* [Server-Side API](/api/rating)
