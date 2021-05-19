---
title: Panes
page_title: jQuery Splitter Documentation | Panes
description: "Get started with the jQuery Splitter by Kendo UI and set its panes."
slug: panes_kendoui_splitter
position: 3
---

# Panes

You can configure the `collapsible` and `resizable` pane settings of the Splitter by using JavaScript after the widget has been initialized.

The `resize()` method of the Splitter recalculates the pane sizes and the split bars are rendered with the current widget settings.

    $("#SplitterID").kendoSplitter({
        panes: [
            { collapsible: false, resizable: false, size: 100 },
            { }
        ]
    });

    var splitterObject = $("#SplitterID").data("kendoSplitter");

    splitterObject.options.panes[0].collapsible = true;
    splitterObject.options.panes[0].resizable = true;
    splitterObject.resize(true);

## See Also

* [Basic Usage of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/index)
* [Using the API of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/api)
* [JavaScript API Reference of the Splitter](/api/javascript/ui/splitter)
