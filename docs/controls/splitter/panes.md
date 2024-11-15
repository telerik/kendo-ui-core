---
title: Panes
page_title: jQuery Splitter Documentation - Panes
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


## Resizing Panes

Prior to Kendo UI Q4 2024, the Splitter would render a "ghost" element to indicate where the new position of the dragging indicator would be. The resizing would complete once you let go of the mouse, or you press the corresponding keyboard key. After Kendo UI Q4 2024, the Splitter uses live resizing, meaning that once you start moving the dragging indicator, the pane would immediately be resized.

## Resize Panes Using Click-Move-Click 

As of Kendo UI R2 SP1 2023, users can resize the Splitter's panes by using the click-move-click functionality provided by the [`clickMoveClick`](/api/javascript/ui/splitter/configuration/clickmoveclick) option. To start resizing the pane, users can click it, and then click again to fix the pane size.

## Panes Positioning

Prior to Kendo UI Q4 2024, the Splitter's panes were absolutely positioned which involved a lot of calculations. This old approach has been replaced with the flexbox approach.

## See Also

* [Basic Usage of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/index)
* [Using the API of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/api)
* [JavaScript API Reference of the Splitter](/api/javascript/ui/splitter)
