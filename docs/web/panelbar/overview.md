---
title: Overview
page_title: Overview of PanelBar UI widget documentation
description: Read when the initialization of PanelBar UI widget should occur and how to load the content with AJAX.
---

# PanelBar Overview

The Kendo UI PanelBar displays hierarchical data as a multi-level, expandable widget. Its structure may be defined in HTML or configured dynamically through its API. The content for items can also be loaded via AJAX by specifying a content URL.


## Getting Started

A PanelBar can be created by targeting the root element of a HTML list. A
PanelBar will utilize this list to define its structure and content.

### Initialize a Kendo UI PanelBar using HTML markup

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

PanelBar items may contain nested content (including markup) within a div
element. Text content located outside nested content will be used as the title of the item.

### Create a list of items in HTML with nested content

    <ul id="panelbar">
        <li>Item with no content</li>
        <li>Item with content
            <div>This is nested content of a PanelBar item.</div>
        </li>
    </ul>
    
    <script>
        $(document).ready(function() {
            $("#panelbar").kendoPanelBar();
        });
    </script>

### Initialize a Kendo UI PanelBar using JSON data object

    <ul id="panelbar"></ul>

    <script>
      $("#panelbar").kendoPanelBar({
        dataSource: [
          {
            text: "Item 1",
            cssClass: "myClass",                            // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
            url: "http://www.telerik.com/"                  // link URL if navigation is needed (optional)
          },
          {
            text: "<b>Item 2</b>",
            encoded: false,                                 // Allows use of HTML for item text
            content: "text"                                 // content within an item
          },
          {
            text: "Item 3",
            contentUrl: "partialContent.html"               // content URL to load within an item
          },
          {
            text: "Item 4",
            imageUrl: "http://www.telerik.com/test.jpg",    // item image URL, optional
            expanded: true,                                 // item is rendered expanded
            items: [{                                       // Sub item collection.
              text: "Sub Item 1"
            },
                    {
                      text: "Sub Item 2"
                    }]
          },
          {
            text: "Item 5",
            // item image sprite CSS class, optional
            spriteCssClass: "imageClass3"
          }
        ]
      });
    </script>
    
Initialization of a PanelBar should occur after the DOM is fully loaded. It is recommended that initialization the PanelBar is done within a $(document).ready() statement.

## Load Content with AJAX

The PanelBar provides built-in support for asynchronously loading content from remote URLs. These URLs should return HTML content that can be
loaded in the PanelBar item content area. Content DIVs should be empty for AJAX loading to work.

### Load a PanelBar item content asynchronously via AJAX

    <ul id="panelbar">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
            </ul>
        </li>
        <li>Item 2</li>
        <li>
            Item with Dynamic Content
            <div></div>
        </li>
    </ul>

    <script>
        $("#panelbar").kendoPanelBar({
            contentUrls:[
                null,
                null,
                "html-content-snippet.html"
            ]
        });
    </script>

When the PanelBar loads remote content via AJAX, the server response is cached in-memory so
that subsequent expand/collapse actions do not trigger subsequent AJAX requests.


## Customize PanelBar Animations


By default, a PanelBar uses animations to expand and reveal sub-items when an item header is
clicked. These animations can be modified in configuration via the open and close animation properties. A
PanelBar can also be configured to only allow one panel be opened at a time.

### Change PanelBar animation and expandMode behavior
    <ul id="panelbar"></ul>
    
    <script>
        $("#panelBar").kendoPanelBar({
            animation: {
                open : { effects: "fadeIn" }
            },
            expandMode: "single"
        });
    </script>

## Configure dynamic PanelBar items


The PanelBar API provides methods for dynamic adding or removing PanelBar items. To add items, you need to provide the new item as a JSON
object along with a reference item.

A reference item is a target PanelBar item HTML element that already exists in the PanelBar. The reference item will be used to determine the
placement in the hierarchy of the new item. Any valid jQuery selector can be used to obtain a reference to the target item.

### How to add new root PanelBar item
    <ul id="panelbar"></ul>
    
    <script>
        var panelBar = $("#panelbar").kendoPanelBar().data("kendoPanelBar");

        panelBar.insertAfter(
            { text: "New PanelBar Item" },
            panelBar.element.children("li:last")
        );
    </script>