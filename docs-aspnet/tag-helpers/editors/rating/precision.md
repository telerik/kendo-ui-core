---
title: Precision
page_title: Rating Precision
description: "Learn how to configure the precision functionality of the Rating when working with the Telerik UI Rating tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_rating_aspnetcore_precision
position: 3
---

# Precision

The widget allows to control the precision with which an item is selected by configuring the [`Precision`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RatingBuilder#precisionsystemstring) property:

* item - selecting the whole item.

* half - selecting half of the item.

## Item Precision

This is the default precision of the Rating. If not configured, the widget will automatically set the [`Precision`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RatingBuilder#precisionsystemstring) property to `"item"`:

```tagHelper
    <kendo-rating name="rating" precision="item"></kendo-rating>
```

## Half Precision

Half precision can be configured by setting the [`Precision`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RatingBuilder#precisionsystemstring) property to `"half"`:

With half precision the Rating widget allows to set decimal values. The passed value is rounded during the rendering phase for the purpose of displaying full or half item based on the value:

* Value which is less than or equal to .5 displays a half item.
* Value which is greater than .5 displays a full item.

```tagHelper
    <kendo-rating name="rating"
                  min="1"
                  max="6"
                  value="3.2"
                  precision="half">
    </kendo-rating>
    <br>
    <kendo-rating name="rating2"
                  min="1"
                  max="6"
                  value="3.5"
                  precision="half">
    </kendo-rating>
    <br>
    <kendo-rating name="rating3"
                  min="1"
                  max="6"
                  value="3.7"
                  precision="half">
    </kendo-rating>
```

## See Also

* [Server-Side API](https://docs.telerik.com/aspnet-core/api/rating)
