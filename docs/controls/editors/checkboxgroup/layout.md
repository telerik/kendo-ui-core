---
title: Layout
page_title: Kendo UI for jQuery CheckBoxGroup Documentation | Layout
description: "Get started with the Kendo UI for jQuery CheckBoxGroup and learn about the layouts it supports."
slug: layout_checkboxgroup_widget
position: 4
---

# Layout

The CheckBoxGroup widget supports two types of [`layout`](/api/javascript/ui/checkboxgroup/configuration/layout) - "horizontal" and "vertical". By default the radio buttons are rendered vertically.

The following example shows how to set the CheckBoxGroup layout:

```dojo
    <ul id="checkboxgroup"></ul>

    <script>
        $("#checkboxgroup").kendoCheckBoxGroup({
            items: [ "Blue", "Green", "Red" ],
            layout: "horizontal"
        });
    </script>
```

## See Also

* [Layout of the CheckBoxGroup (Demo)](https://demos.telerik.com/kendo-ui/checkboxgroup/layout)
* [JavaScript API Reference of the CheckBoxGroup](/api/javascript/ui/checkboxgroup)
