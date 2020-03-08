---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Rating tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_rating_aspnetcore
position: 1
---

# Rating Tag Helper Overview

The Telerik UI Rating tag helper for ASP.NET Core is a server-side wrapper for the Kendo UI Rating widget.

The Rating allows to intuitively rate by selecting number of items stars from a predefined maximum number of items.

* [Demo page for the Rating](https://demos.telerik.com/aspnet-core/rating/tag-helper)

## Initializing the Rating

The following example demonstrates how to define the Rating by using the Rating tag helper.

      <kendo-rating name="rating"></kendo-rating>

## Basic Configuration

The Rating tag helper configuration options are passed as attributes of the tag.

```tagHelper
<kendo-rating name="rating" min="1" max="6" value="3"></kendo-rating>
```

## Functionality and Features

* [Selection]({% slug taghelpers_rating_aspnetcore_selection %})
* [Precision]({% slug taghelpers_rating_aspnetcore_precision %})
* [Label]({% slug taghelpers_rating_aspnetcore_label %})
* [Tooltip]({% slug taghelpers_rating_aspnetcore_tooltip %})
* [Templates]({% slug taghelpers_rating_aspnetcore_templates %})

## Events

You can subscribe to all Rating events.

```tagHelper
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

## See Also

* [Basic Usage of the Rating Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/rating/tag-helper)
* [Server-Side API](/api/rating)
