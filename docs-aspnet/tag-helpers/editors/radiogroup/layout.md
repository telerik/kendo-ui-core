---
title: Layout
page_title: Layout
description: "Learn how to configure the layout of the Telerik UI RadioGroup for {{ site.framework }}."
slug: taghelpers_radiogroup_aspnetcore_layout
position: 4
---

# Layout

The RadioGroup supports two types of [`layout`](/api/javascript/ui/radiogroup/configuration/layout) - "horizontal" and "vertical". By default the radio buttons are rendered vertically.

The following example shows how to set the RadioGroup layout:

```tagHelper
    <kendo-radiogroup name="radiogroup"
        radio-name="radiogroup"        
        layout="RadioGroupLayout.Horizontal"
        bind-to="Model.Items">
    </kendo-radiogroup>
```

## See Also

* [Server-Side API](/api/radiogroup)
