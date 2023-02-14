---
title: Selection
page_title: Selection
description: "Restrict the number of selectable Buttons within the Telerik UI ButtonGroup component for {{ site.framework }}."
previous_url: /helpers/navigation/buttongroup/selection
slug: selection_buttongroup_aspnetcore
position: 5
---

# Selection

You can restrict the number of Buttons that can be selected by using the `.Selection()` property of each Button within the ButtonGroup.

The property can be configured for a `single` or `multiple` selection.

The following example demonstrates how to use the `.Selection()` configuration.

```HtmlHelper
    @(Html.Kendo().ButtonGroup()
        .Name("select-period")
        .Selection("multiple")
        .Items(t =>
            {
                    t.Add().Text("Month");
                    t.Add().Text("Quarter");
                    t.Add().Text("Year");
            }))
```
{% if site.core %}
```TagHelper
    <kendo-buttongroup name="select-period"
                    selection="multiple">
        <buttongroup-items>
            <item text="Month"></item>
            <item text="Quarter"></item>
            <item text="Year"></item>
        </buttongroup-items>
    </kendo-buttongroup>
```
{% endif %}

## See Also

* [Selection by the Telerik UI ButtonGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/buttongroup/selection)
* [Server-Side API of the ButtonGroup for {{ site.framework }}](/api/buttongroup)
