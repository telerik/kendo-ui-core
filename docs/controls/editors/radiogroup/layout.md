---
title: Layout
page_title: Kendo UI for jQuery RadioGroup Documentation | Layout
description: "Get started with the Kendo UI for jQuery RadioGroup and learn about the layouts it supports."
slug: layout_radiogroup_widget
position: 4
---

# Layout

The RadioGroup widget supports two types of [`layout`](/api/javascript/ui/radiogroup/configuration/layout) - "horizontal" and "vertical". By default the radio buttons are rendered vertically.

The following example shows how to set the RadioGroup layout:

```dojo
    <ul id="radiogroup"></ul>

    <script>
        $("#radiogroup").kendoRadioGroup({
            items: [ "Blue", "Green", "Red" ],
            layout: "horizontal"
        });
    </script>
```

## See Also

* [Layout of the RadioGroup (Demo)](https://demos.telerik.com/kendo-ui/radiogroup/layout)
* [JavaScript API Reference of the RadioGroup](/api/javascript/ui/radiogroup)
