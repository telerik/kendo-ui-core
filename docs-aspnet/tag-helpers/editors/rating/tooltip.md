---
title: Tooltip
page_title: Rating Tooltip
description: "Learn how to configure the tooltip of the Rating when working with the Telerik UI Rating tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_rating_aspnetcore_tooltip
position: 5
---

# Tooltip

Each Rating item displays a tooltip that is enabled by default and contains text equal to the item's value.

## Default Tooltips

```tagHelper
    <kendo-rating name="rating" min="1" max="6" value="3"></kendo-rating>
```

## Disabling the Tooltips

Setting the [`Tooltip`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RatingBuilder#tooltipsystemstring) to false prevents the items to display tooltips when hovered.

```tagHelper
    <kendo-rating name="rating" min="1" max="6" value="3" tooltip="false"></kendo-rating>
```

## See Also

* [Server-Side API](https://docs.telerik.com/aspnet-core/api/rating)
