---
title: Overview
page_title: jQuery PanelBar Documentation | PanelBar Overview
description: "Get started with the jQuery PanelBar by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_panelbar_widget
position: 1
---

# PanelBar Overview

The PanelBar displays hierarchical data as a multi-level, expandable widget.

Depending on the requirements, you can define its structure by using HTML or y dynamically configuring it through the PanelBar API. The content of the PanelBar items can also be loaded through AJAX by specifying a content URL.

* [Demo page for the PanelBar](https://demos.telerik.com/kendo-ui/panelbar/index)

## Initializing the PanelBar

You can create a PanelBar by using HTML markup, a JSON `data` object, or a [dynamic data binding to a local or a remote data source]({% slug databinding_kendoui_panelbar %}).

> As the PanelBar has to be initialized after the DOM is fully loaded, create the widget within a `$(document).ready()` statement.

### From HTML

You can create a Kendo UI PanelBar by targeting the root element of an HTML list. The widget utilizes this list to define its structure and content.

    <ul id="panelbar">
        <li>
            Item 1
                <ul>
                    <li>Sub Item 1</li>
                    <li>Sub Item 2</li>
                </ul>
        <li>
        <li>Item 2</li>
    </ul>

    <script>
        $(document).ready(function() {
            $("#panelbar").kendoPanelBar();
        });
    </script>

### From JSON

The following example demonstrates how to initialize a PanelBar by using a JSON data object.

    <ul id="panelbar"></ul>

    <script>
      $("#panelbar").kendoPanelBar({
        dataSource: [
          {
            text: "Item 1",
            cssClass: "myClass",                            // (Optional) Add a custom CSS class to the item.
                                                            // Added with 2012 Q3 SP1.
            url: "https://www.telerik.com/"                  // (Optional) Link a URL if navigation is needed.
            },
          {
            text: "<b>Item 2</b>",
            encoded: false,                                 // Allow the usage of HTML for item text
            content: "text"                                 // content within an item.
          },
          {
            text: "Item 3",
            contentUrl: "partialContent.html"               // A content URL to load within an item.
          },
          {
            text: "Item 4",
            imageUrl: "https://www.telerik.com/test.jpg",    // (Optional) An item image URL.
            expanded: true,                                 // The item is rendered as expanded.
            items: [{                                       // A subitem collection.
              text: "Sub Item 1"
            }, {
              text: "Sub Item 2"
            }]
          },
          {
            text: "Item 5",
            // (Optional) An item image sprite CSS class.
            spriteCssClass: "imageClass3"
          }
        ]
      });
    </script>

## Functionality and Features

* [Data binding]({% slug databinding_kendoui_panelbar %})
* [Expand modes]({% slug expandmode_kendoui_panelbar %})
* [Animations]({% slug animations_kendoui_panelbar %})
* [Items]({% slug items_kendoui_panelbar %})
* [Content operations]({% slug content_kendoui_panelbar %})

## See Also

* [Basic Usage of the PanelBar (Demo)](https://demos.telerik.com/kendo-ui/panelbar/index)
* [Using the API of the PanelBar (Demo)](https://demos.telerik.com/kendo-ui/panelbar/api)
* [JavaScript API Reference of the PanelBar](/api/javascript/ui/panelbar)
