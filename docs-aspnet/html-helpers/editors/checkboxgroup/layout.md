---
title: Layout
page_title: Layout
description: "Learn how to configure the layout of the Telerik UI CheckBoxGroup for {{ site.framework }}."
slug: htmlhelpers_checkboxgroup_aspnetcore_layout
position: 3
---

# Layout

The CheckBoxGroup supports two types of [`layout`](/api/javascript/ui/checkboxgroup/configuration/layout) - "horizontal" and "vertical". By default the checkboxes are rendered vertically.

The following example shows how to set the CheckBoxGroup layout:

```HtmlHelper
    @(Html.Kendo().CheckBoxGroup()
        .Name("checkboxgroup")
        .BindTo(new[] { "English", "German", "Italian", "Russian", "Spanish" })
        .Layout("vertical")
        .Value(new string[] { "Italian" })
    )
```
{% if site.core %}
```TagHelper
    @{
        var data = new InputGroupItemModel[]
        {
            new InputGroupItemModel(){ Value = "English"},
            new InputGroupItemModel(){ Value = "German"},
            new InputGroupItemModel(){ Value = "Italian"},
            new InputGroupItemModel(){ Value = "Russian"},
            new InputGroupItemModel(){ Value = "Spanish"},
        };
        var value = new string[] { "Spanish" };
    }
    <kendo-checkboxgroup name="checkboxgroup"
                        bind-to="data"
                        layout= "@CheckBoxGroupLayout.Vertical"
                        value="value">
    </kendo-checkboxgroup>
```
{% endif %}


## See Also

* [Server-Side API](/api/checkboxgroup)
