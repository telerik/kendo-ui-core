---
title: Overview
page_title: jQuery ContextMenu Documentation | ContextMenu Overview
description: "Get started with the jQuery ContextMenu by Kendo UI and learn how to create, initialize, and enable the widget."
previous_url: /controls/navigation/menu/contextmenu
slug: overview_kendoui_contextmenu_widget
position: 1
---

# ContextMenu Overview

The ContextMenu displays hierarchical data as a multi-level menu in a popup.

It provides rich styling for unordered lists of items, and can be used for both navigation and execution of JavaScript commands. You can define and initialize items from HTML or use the API to add and remove items. You can also specify a ContextMenu target along with a filter for multiple targets and an event for making the ContextMenu pop up.

* [Demo page for the ContextMenu](https://demos.telerik.com/kendo-ui/menu/context-menu)

## Initializing the ContextMenu

You can initialize the ContextMenu by using HTML markup or a JSON `data` object.

> Create the ContextMenu within a `$(document).ready()` statement because the widget has to be initialized after the DOM is fully loaded.

### From HTML

The following example demonstrates how to initialize the ContextMenu by using HTML markup.

    <ul id="context-menu">
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
    <script>
        $(document).ready(function() {
            $("#context-menu").kendoContextMenu();
        });
    </script>

### From JSON

The following example demonstrates how to initialize the ContextMenu by using a JSON `data` object.

    <ul id="context-menu"></ul>
    <script>
        $(document).ready(function() {
            $("#context-menu").kendoContextMenu({
                dataSource:
                    [{
                        text: "Item 1",
                        cssClass: "myClass",                         // (Optional) Add a custom CSS class to the item.
                                                                     // Added in 2012 Q3 SP1.
                        url: "https://www.telerik.com"                // (Optional) Link a URL if navigation is needed.
                    },
                    {
                        text: "<b>Item 2</b>",
                        encoded: false,                              // Allow the use of HTML for item text
                        content: "text"                              // content within an item.
                    },
                    {
                        text: "Item 3",
                        imageUrl: "https://www.telerik.com/test.jpg", // (Optional) An item image URL.
                        items: [{                                    // A sub-item collection.
                             text: "Sub Item 1"
                        },
                        {
                             text: "Sub Item 2"
                        }]
                    },
                    {
                        text: "Item 4",
                        spriteCssClass: "imageClass3"                // (Optional) An item image sprite CSS class.
                    }]
            })
        });
    </script>

## Basic Configuration

By default, the ContextMenu is created as a child of the `<body>` element.

```dojo
    <body>
         <div id="target">Target</div>
         <div id="container1">
             <ul id="context-menu">
                 <li>Item 1</li>
                 <li>Item 2</li>
             </ul>
             Container 1
         </div>
         <div id="container2">
             Container 2
         </div>

         <script>
            $("#context-menu").kendoContextMenu({
                target: "#target"
            });
        </script>
      </body>
```

The following example demonstrates how the page markup from the previous example changes after the initialization of the ContextMenu. The widget is moved to become a child of the `<body>` element and its additional markup&mdash;the wrapper and the title bar&mdash;is generated.

      <body>
        <div id="target"></div>
        <div id="container1">
            ...
        </div>
        <div id="container2">
            ...
        </div>
        <ul id="context-menu" class="k-widget k-context-menu" data-role="contextmenu">
                <li>Item 1</li>
                <li>Item 2</li>
        </ul>
      </body>

## Functionality and Features

* [Data binding]({% slug binding_kendoui_contextmenu %})
* [Animations]({% slug animations_kendoui_contextmenu %})
* [Items]({% slug items_kendoui_contextmenu %})
* [Scrolling]({% slug scrolling_kendoui_contextmenu %})

## See Also

* [Basic Usage of the ContextMenu (Demo)](https://demos.telerik.com/kendo-ui/menu/context-menu)
* [JavaScript API Reference of the Menu](/api/javascript/ui/menu)
