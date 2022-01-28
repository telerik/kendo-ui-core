---
title: Basic Operations
page_title: jQuery Dialog Documentation | Basic Operations
description: "Get started with the jQuery Dialog by Kendo UI and control its opened, closed, and destroyed state."
slug: basicoperations_kendoui_dialog
position: 2
---

# Basic Operations

You can control the opened and closed state of the Dialog as well as its destroy operation.  

## Opening and Closing

Usually, a Dialog is opened as a result of a user action rather than of the `load` event of the page. The [Dialog API](/api/javascript/ui/dialog) provides methods for handling such scenarios. Basically, the widget can be initialized as non-visible and can opened when needed.

The following example demonstrates how to open a Dialog on a button click.

    <div id="dialog">
        Content of the Dialog
    </div>
    <button id="openButton">Open Dialog</button>

The following example demonstrates how to initialize a Dialog, center, and configure the button click action.

    $(document).ready(function(){
        $("#dialog").kendoDialog({
            width: 200,
            height: 200,
            title: "Dialog Title",
            visible: false
        }).data("kendoDialog");
    });

    $("#openButton").click(function(){
        var dialog = $("#dialog").data("kendoDialog");
        dialog.open();
    });

## Destroying

Unlike most widgets, the Dialog is completely removed from the DOM when it is [destroyed]({% slug destroywidgets_kendoui_gettingstarted %}). This means that the element from which the Dialog was initialized no longer exists on the page. Therefore, you can create a new Dialog instance only from another element.

## See Also

* [Basic Usage of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/index)
* [Using the API of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/api)
* [JavaScript API Reference of the Dialog](/api/javascript/ui/dialog)
