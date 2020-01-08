---
title: Index
page_title: Index
description: "Configure the initially selected index of the Telerik UI ButtonGroup HtmlHelper for {{ site.framework }}."
previous_url: /helpers/navigation/buttongroup/indexes
slug: index_buttongroup_aspnetcore
position: 4
---

# Index

You can configure the initially selected index of the Telerik UI ButtonGroup by using its `index` property.

You can also select an index through the `select()` method with a Integer argument.

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

* [Server-Side API](/api/buttongroup)
