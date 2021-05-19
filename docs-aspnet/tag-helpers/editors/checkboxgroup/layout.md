---
title: Layout
page_title: Layout
description: "Learn how to configure the layout of the Telerik UI CheckBoxGroup for {{ site.framework }}."
slug: taghelpers_checkboxgroup_aspnetcore_layout
position: 4
---

# Layout

The CheckBoxGroup supports two types of [`layout`](/api/javascript/ui/checkboxgroup/configuration/layout) - "horizontal" and "vertical". By default the CheckBoxGroup is rendered vertically.

The following example shows how to set the CheckBoxGroup layout:

```tagHelper
    <kendo-checkboxgroup name="checkboxgroup"
        layout="CheckBoxGroupLayout.Horizontal">
		<kendo-checkboxgroup-item value="Green" css-class="green" label="Green"></kendo-checkboxgroup-item>
        <kendo-checkboxgroup-item value="Red" css-class="red" label="Red"></kendo-checkboxgroup-item>
        <kendo-checkboxgroup-item value="Blue" css-class="blue" label="Blue"></kendo-checkboxgroup-item>
    </kendo-checkboxgroup>
```

## See Also

* [Server-Side API](/api/checkboxgroup)
