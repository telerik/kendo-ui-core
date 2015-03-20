---
title: Context Menu
page_title: Overview of Kendo UI ContextMenu widget
description: Steps that help you initialize the ContextMenu widget using JSON data object.
---

# ContextMenu Overview

The Kendo UI ContextMenu displays hierarchical data as a multi-level menu in a popup. It provides rich styling for unordered lists
of items, and can be used for both navigation and executing JavaScript commands. Items can be defined and
initialized from HTML, or the API can be used to add and remove items. A ContextMenu target can be specified along with filter
for multiple targets and an event to which the ContextMenu will listen in order to pop up.

## Getting Started

### Initialize a Kendo UI ContextMenu using HTML markup

    <ul id="context-menu">
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
    <script>
        $(document).ready(function() {
            $("#context-menu").kendoContextMenu();
        });
    </script>

### Initialize a Kendo UI ContextMenu using JSON data object

    <ul id="context-menu"></ul>
    <script>
        $(document).ready(function() {
            $("#context-menu").kendoContextMenu({
                dataSource:
                    [{
                        text: "Item 1",
                        cssClass: "myClass",                         // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
                        url: "http://www.telerik.com"                // Link URL if navigation is needed, optional.
                    },
                    {
                        text: "<b>Item 2</b>",
                        encoded: false,                              // Allows use of HTML for item text
                        content: "text"                              // content within an item
                    },
                    {
                        text: "Item 3",
                        imageUrl: "http://www.telerik.com/test.jpg", // Item image URL, optional.
                        items: [{                                    // Sub item collection
                             text: "Sub Item 1"
                        },
                        {
                             text: "Sub Item 2"
                        }]
                    },
                    {
                        text: "Item 4",
                        spriteCssClass: "imageClass3"                // Item image sprite CSS class, optional.
                    }]
            })
        });
    </script>

Initialization of a ContextMenu should occur after the DOM is fully loaded. It is recommended that initialization the Menu is done within a $(document).ready() statement.

## Customize ContextMenu Animations

By default, the ContextMenu uses a slide animation to expand sub-items on mouse hover event. Animations can be changed using configuration properties, along with the animation style and delay. Menu items can also be configured to open on click instead of on hover. ContextMenu can also be configured to use a different
open event than the default "contextmenu" (right click).

### Change ContextMenu animation and open event

    <ul id="context-menu">
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            animation: {
                open: { effects: "fadeIn" },
                duration: 500
            },
            showOn: "click"
        });
    </script>

## Dynamic configuration of ContextMenu items

The ContextMenu API provides methods for dynamic adding
or removing ContextMenu items. To add items, you need to provide the new item as a JSON
object along with a reference item.


A reference item is a target ContextMenu item HTML element that
already exists in the ContextMenu. The reference item will be used to determine the
placement in the hierarchy of the new item. Any valid jQuery selector can be used to
obtain a reference to the target item.

### How to add a new root ContextMenu item

    <ul id="context-menu">
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
    <script>
        var contextMenu = $("#context-menu").kendoContextMenu().data("kendoContextMenu");
        contextMenu.insertAfter(
            { text: "New ContextMenu Item" },
            contextMenu.element.children("li:last")
        );
    </script>