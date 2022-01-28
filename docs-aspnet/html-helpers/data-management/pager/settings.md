---
title: Pager Settings and Types
page_title: Pager Settings and Types
description: "Learn how to change the settings when working with the Telerik UI Pager HtmlHelper for {{ site.framework }}."
slug: settings_pager_aspnet
---

## Types

The Pager has two types:

- `Numeric()`
- `Input()`

The Pager is `Numeric()` by default. To configure the number of buttons that will be shown in a numeric pager, use the `ButtonCount()` method. To configure the pager to accept only use input, use the `Numeric()` method, pass `false` as its parameter and the `Input()` method with `true` as its parameter.

The following example shows how to enable the `Input()` pager type

```
    @(Html.Kendo().DataSource<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("dataSource1")
        .Ajax(t=>t.Read(read => read.Action("People_Read", "Pager")).PageSize(20))
    )

    @(Html.Kendo().Pager()
        .Name("pager")
        .DataSource("dataSource1")
        .Input(true)
        .Numeric(false)
    )

```

## Settings

The following settings enable you to determine which built-in pager elements will be rendered:

- `PageSizes()` - renders the dropdown that allows the user to change the page size.
- `Refresh()` - renders a refresh button
- `PreviousNext()` - toggles the visibility of buttons for navigating to the first, last, previous and next pages
- `Info()` - toggles the visibility of the current pager information


## See Also

* [Pager Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/pager)
* [Pager Server-Side API](/api/pager)
* [Responsive Pager]({% slug responsive_pager_aspnet  %})
* [Pager Templates]({% slug templates_pager_aspnet %})
* [Globalization and Messages]({% slug globalization_pager_aspnet %})
