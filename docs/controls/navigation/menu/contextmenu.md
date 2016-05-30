---
title: Context Menu
page_title: Context Menu | Kendo UI Menu
description: "Learn how to initialize Kendo UI ContextMenu, configure its behaviors and customize animations."
slug: overview_kendoui_contextmenu_widget
position: 2
---

# Context Menu

[Kendo UI Context Menu](http://demos.telerik.com/kendo-ui/menu/context-menu) displays hierarchical data as a multi-level menu in a popup. It provides rich styling for unordered lists of items, and can be used for both navigation and execution of JavaScript commands. Items can be defined and initialized from HTML, or the API can be used to add and remove items. A ContextMenu target can be specified along with a filter for multiple targets and an event to which the ContextMenu will listen to so it pops up.

## Getting Started

### Initialize the ContextMenu

Kendo UI ContextMenu can be initialized in two ways:

* Through HTML markup
* Through JSON data object

> **Important**  
>
> As ContextMenu should be initialized after the DOM is fully loaded, make sure you create it within a `$(document).ready()` statement.

#### Using HTML Markup

The example below demonstrates how to initialize the ContextMenu by using HTML markup.

###### Example

    <ul id="context-menu">
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
    <script>
        $(document).ready(function() {
            $("#context-menu").kendoContextMenu();
        });
    </script>

#### Using JSON Data Object

The example below demonstrates how to initialize the ContextMenu by using a JSON data object.

###### Example

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

### HTML Structure and DOM Placement

With regard to the CSS selectors or element discovery via Javascript, take into account that, by default, the ContextMenu is created as a child of the `<body>` element. This behavior is configurable via the [`appendTo` setting](/api/javascript/ui/window#configuration-appendTo).

The example below demonstrates the possible markup before the initialization of a Kendo UI ContextMenu.

###### Example

  <body>
     <div id="container1">
         <ul id="context-menu">
             <li>Item 1</li>
             <li>Item 2</li>
         </ul>
         ...
     </div>
     <div id="container2">
         ...
     </div>
  </body>

The example below demonstrates how the above page markup changes after the initialization of the Kendo UI ContextMenu when the widget is moved to become a child of the `<body>` and its additional markup is generated&mdash;that is, the wrapper and the title bar.

###### Example

  <body>
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

## Configuration

### ContextMenu Animations

By default, the ContextMenu uses a slide animation to expand sub-items on a mouse hover event. Animations, along with the animation style and delay, can be customized by using configuration properties. You can also confgure Menu items to open on click instead of on hover, and ContextMenu can also be configured to use a different open event than the default `contextmenu` (right click).

The example below demonstrates how to change ContextMenu animation and open behavior.

###### Example

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

### Dynamic Items

[The Kendo UI ContextMenu API](/api/javascript/ui/contextmenu) provides methods for dynamically adding or removing Menu items.

To add items, provide the new item as a JSON object along with a reference item. A reference item is a target ContextMenu item HTML element that already exists in the ContextMenu. The reference item will be used to determine the placement in the hierarchy of the new item. Any valid jQuery selector can be used to obtain a reference to the target item.

For more information on configuring Menu items, see the [Menu API demos](http://demos.telerik.com/kendo-ui/web/menu/api.html).

The example below demonstrates how to add a new root ContextMenu item.

###### Example

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

## See Also

Articles and how-to examples on Kendo UI Menu:

* [Overview of the Menu Widget]({% slug overview_kendoui_menu_widget %})
* [How to Create Split Button]({% slug howto_createa_split_button_menu %})
* [How to Execute Custom Click Actions Based on Class Name]({% slug howto_execute_custom_click_actions_basedon_classnames_menu %})
* [How to Use FontAwesome Icons]({% slug howto_use_fontawesome_icons_menu %})
* [Menu JavaScript API Reference](/api/javascript/ui/menu)
