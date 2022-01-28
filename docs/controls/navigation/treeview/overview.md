---
title: Overview
page_title: jQuery TreeView Documentation | TreeView Overview
description: "Get started with the jQuery TreeView by Kendo UI and learn how to initialize the widget and use its events."
slug: overview_kendoui_treeview_widget
position: 1
---

# TreeView Overview

The Kendo UI TreeView widget displays hierarchical data in a traditional tree structure.

It supports user interaction through mouse or touch events to perform re-ordering operations by using the drag-and-drop functionality.

* [Demo page for the TreeView](https://demos.telerik.com/kendo-ui/treeview/index)

## Initializing the TreeView

To create a TreeView, you can use either of th efollowing approaches:
* Define a hierarchical list by using static HTML. This approach is suitable for small hierarchies and for data that does not frequently change.
* Use dynamic [data binding either to a local or a remote data source]({% slug databinding_kendoui_treeview %}). This approach is suitable for larger data sets and for data that frequently changes.

> Create the TreeView within a `$(document).ready()` statement because it has to be initialized after the DOM is fully loaded.

The following example demonstrates how to initialize the TreeView through a hierarchical list in HTML.

    <ul id="treeView">
        <li>Item 1
            <ul>
                <li>Item 1.1</li>
                <li>Item 1.2</li>
            </ul>
        </li>
        <li>Item 2</li>
    </ul>

    <script>
    $(document).ready(function() {
        $("#treeView").kendoTreeView();
    });
    </script>

## Functionality and Features

* [Data binding]({% slug databinding_kendoui_treeview %})
* [Dragging and dropping]({% slug dragdrop_kendoui_treeview %})
* [Items]({% slug items_kendoui_treeview %})

## Referencing Existing Instances

To refer to an existing TreeView instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once you establish a reference, use the [TreeView API](/api/javascript/ui/treeview) to control its behavior.

The following example demonstrates how to access an existing TreeView instance.

    var treeView = $("#treeView").data("kendoTreeView");

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
