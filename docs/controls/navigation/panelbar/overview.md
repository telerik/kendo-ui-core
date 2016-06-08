---
title: Overview
page_title: Overview | Kendo UI PanelBar
description: "Learn how to initialize the Kendo UI PanelBar widget and configure its behaviors."
slug: overview_kendoui_panelbar_widget
position: 1
---

# PanelBar Overview

The [Kendo UI PanelBar widget](http://demos.telerik.com/kendo-ui/panelbar/index) displays hierarchical data as a multi-level, expandable widget. Its structure may be defined in HTML or configured dynamically through its API. The content of the items can also be loaded via AJAX by specifying a content URL.

## Getting Started

### Initialize the PanelBar

You can create a PanelBar in the following ways:

* Through HTML markup
* Through JSON data object

> **Important**
>
> As PanelBar should be initialized after the DOM is fully loaded, make sure you create it within a `$(document).ready()` statement.

#### Using HTML Markup

You can create a Kendo UI PanelBar by targeting the root element of an HTML list. The widget utilizes this list to define its structure and content.

###### Example

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

#### Using JSON Data Object

The example below demonstrates how to initialize a PanelBar by using a JSON data object.

###### Example

    <ul id="panelbar"></ul>

    <script>
      $("#panelbar").kendoPanelBar({
        dataSource: [
          {
            text: "Item 1",
            cssClass: "myClass",                            // (Optional) Add custom CSS class to the item, added 2012 Q3 SP1.
            url: "http://www.telerik.com/"                  // (Optional) Link URL if navigation is needed
            },
          {
            text: "<b>Item 2</b>",
            encoded: false,                                 // Allows the use of HTML for item text
            content: "text"                                 // Content within an item
          },
          {
            text: "Item 3",
            contentUrl: "partialContent.html"               // Content URL to load within an item
          },
          {
            text: "Item 4",
            imageUrl: "http://www.telerik.com/test.jpg",    // (Optional) Item image URL
            expanded: true,                                 // Item is rendered expanded
            items: [{                                       // Sub-item collection
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

## Configuration

### Item Lists with Nested Content

PanelBar items may contain nested content, including markup, within a `<div>` element. The text content located outside the nested content is used as a title of the item.

###### Example

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


### Content with AJAX

The PanelBar provides built-in support for asynchronously loading content from remote URLs. These URLs should return HTML content that can be loaded in the PanelBar item content area. Content `<div>` elements should be empty for AJAX loading to work.

The example below demonstrates how to load a PanelBar item content asynchronously via AJAX.

###### Example

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

When the PanelBar loads remote content via AJAX, the server response is cached in-memory so that subsequent expand/collapse actions do not trigger subsequent AJAX requests.

### PanelBar Animations

By default, a PanelBar uses animations to expand and reveal sub-items when an item header is clicked. These animations can be modified in configuration via the open and close animation properties. A
PanelBar can also be configured to only allow one panel be opened at a time.

The example below demonstrates how to change the PanelBar animation and `expandMode` behavior.

###### Example

    <ul id="panelbar"></ul>

    <script>
        $("#panelBar").kendoPanelBar({
            animation: {
                open : { effects: "fadeIn" }
            },
            expandMode: "single"
        });
    </script>


### Dynamic Items

[The PanelBar API](/api/javascript/ui/panelbar) provides methods for dynamically adding or removing PanelBar items.

To add items, provide the new item as a JSON object along with a reference item. A reference item is a target PanelBar item HTML element that already exists in the PanelBar. The reference item will be used to determine the placement in the hierarchy of the new item. Any valid jQuery selector can be used to obtain a reference to the target item.

For more information on configuring PanelBar items, see the [PanelBar API demos](http://demos.telerik.com/kendo-ui/panelbar/api).

The example below demonstrates how to add a new root PanelBar item.

###### Example

    <ul id="panelbar"></ul>

    <script>
        var panelBar = $("#panelbar").kendoPanelBar().data("kendoPanelBar");

        panelBar.insertAfter(
            { text: "New PanelBar Item" },
            panelBar.element.children("li:last")
        );
    </script>

## See Also

Other articles on the Kendo UI PanelBar:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the PanelBar Widget](/aspnet-mvc/helpers/panelbar/overview)
* [Overview of the PanelBar JSP Tag]({% slug overview_panelbar_uiforjsp %})
* [Overview of the PanelBar PHP Class](/php/widgets/panelbar/overview)
* [PanelBar JavaScript API Reference](/api/javascript/ui/panelbar)

For how-to examples on the Kendo UI PanelBar widget, browse its [**How To** documentation folder]({% slug initialize_thegrid_panelbar_widget %}).
