---
title: Index
page_title: Index
description: "Configure the initially selected index of the Telerik UI ButtonGroup component for {{ site.framework }}."
previous_url: /helpers/navigation/buttongroup/indexes
slug: index_buttongroup_aspnetcore
position: 4
---

# Index

You can configure the initially selected index of the Telerik UI ButtonGroup by using its `index` property.

You can also select an index through the `select()` method with a Integer argument.

The following example demonstrates how to select a button by its index.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-buttongroup name="player"
                    index="1">
        <buttongroup-items>
            <item text="Month"></item>
            <item text="Quarter"></item>
            <item text="Year"></item>
        </buttongroup-items>
    </kendo-buttongroup>
```
{% endif %}

## See Also

* [Server-Side API of the ButtonGroup for {{ site.framework }}](/api/buttongroup)
