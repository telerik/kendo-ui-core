---
title: Index
page_title: Index | Kendo UI ButtonGroup HtmlHelper for ASP.NET Core
description: "Configure the initially selected index of the Kendo UI ButtonGroup HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: index_buttongroup_aspnetcore
position: 4
---

# Index

You can configure the initially selected index of the Kendo UI ButtonGroup by using its `index` property.

You can also select an index through the `select()` method with a Integer argument. For more information on the [`index` setting of the ButtonGroup](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup#configuration-index), refer to the [API of the ButtonGroup control](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup).

The following example demonstrates how to select a button by its index.

```
    @(Html.Kendo().ButtonGroup()
        .Name("select-period")
        .Index(1)
        .Items(t =>
            {
                    t.Add().Text("Month");
                    t.Add().Text("Quarter");
                    t.Add().Text("Year");
            }))
```

## See Also

* [JavaScript API Reference of the ButtonGroup](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup)
