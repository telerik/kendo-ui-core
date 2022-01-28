---
title: Selection
page_title: Rating Selection
description: "Learn how to configure the selection functionality of the Rating when working with the Telerik UI Rating tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_rating_aspnetcore_selection
position: 2
---

# Selection

The Rating allows to control the selection behavior of the items by configuring the [`Selection`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property:

* single - allows selecting a single item.

* continuous - allows selecting all items from the start to the end.

## Continuous Selection

This is the default selection behavior of the Rating. If not configured, the widget will automatically set the [`Selection`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property to `"continuous"`:

```tagHelper
    <kendo-rating name="rating" selection="continuous"></kendo-rating>
```

## Single Selection

Single selection can be configured by setting the [`Selection`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RatingBuilder#selectionsystemstring) property to `"single"`:

```tagHelper
    <kendo-rating name="rating" min="1" max="6" value="3" selection="single"></kendo-rating>
```

## See Also

* [Server-Side API](https://docs.telerik.com/aspnet-core/api/rating)
