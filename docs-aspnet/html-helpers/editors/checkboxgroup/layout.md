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

```Razor
    @(Html.Kendo().CheckBoxGroup()
        .Name("checkboxgroup")
        .BindTo(new[] { "English", "German", "Italian", "Russian", "Spanish" })
        .Layout("vertical")
        .Value(new string[] { "Italian" })
    )
```

## See Also

* [Server-Side API](/api/checkboxgroup)
