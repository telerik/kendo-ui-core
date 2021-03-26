---
title: Selection
page_title: jQuery ButtonGroup Documentation | Selection
description: "Get started with the jQuery ButtonGroup by Kendo UI and restrict the number of selectable Buttons within the ButtonGroup."
slug: selection_kendoui_buttongroup
position: 6
---

# Selection

You can restrict the number of Buttons that can be selected by using the `selection` property of each Button within the ButtonGroup.

The property can be configured for a `single` or `multiple` selection.

    <div id="buttongroup">
        <span class="k-state-active">Option 1</span>
        <span class="k-state-active">Option 2</span>
        <span>Option 3</span>
    </div>

    <script>
        $("#buttongroup").kendoButtonGroup({
            selection: "multiple"
        });
    </script>

## See Also

* [Using Selection in the ButtonGroup (Demo)](https://demos.telerik.com/kendo-ui/buttongroup/selection)
* [JavaScript API Reference of the ButtonGroup](/api/javascript/ui/buttongroup)
