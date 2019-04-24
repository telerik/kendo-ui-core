---
title: ContextMenu
page_title: ContextMenu | Kendo UI Menu
description: "Learn how to initialize Kendo UI ContextMenu, configure its behaviors and customize animations."
slug: overview_kendoui_contextmenu_widget
position: 2
---

# ContextMenu

The [Kendo UI ContextMenu](http://demos.telerik.com/kendo-ui/menu/context-menu) displays hierarchical data as a multi-level menu in a popup.

It provides rich styling for unordered lists of items, and can be used for both navigation and execution of JavaScript commands. Items can be defined and initialized from HTML, or the API can be used to add and remove items. A ContextMenu target can be specified along with a filter for multiple targets and an event to which the ContextMenu will listen to so it pops up.

## Getting Started

### Initialize the ContextMenu

Kendo UI ContextMenu can be initialized in two ways:

* Through HTML markup
* Through JSON data object

> **Important**
>
> Make sure you create the ContextMenu within a `$(document).ready()` statement because the widget has to be initialized after the DOM is fully loaded.

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

### Data Binding

Using [`Kendo HierarchicalDataSource`](/api/framework/hierarchicaldatasource) is available as of the R2 2019 release.

#### To Local Arrays

The following example demonstrates how to create a ContextMenu and bind it to a local data source.

###### Example
    <div id="target">target</div>
    <ul id="contextmenu"></ul>

    <script>
    $(document).ready(function() {
        $("#contextmenu").kendoContextMenu({
            target: "#target",
            dataSource: [
                {
                    text: "Item 1",
                    expanded: true,
                    items: [
                        { text: "Item 1.1" },
                        { text: "Item 1.2" }
                    ]
                },
                { text: "Item 2" }
            ]
        })
    });
    </script>

#### To Remote Services

The following example demonstrates how to create a Menu and bind it to a remote HierarchicalDataSource.

###### Example
    <div id="target">target</div>
    <ul id="contextmenu"></ul>

    <script>
    $(document).ready(function() {
        $("#contextmenu").kendoContextMenu({
            target: "#target",
            dataTextField: "FullName",
            dataSource: {
                transport: {
                    read: {
                        url: "https://demos.telerik.com/kendo-ui/service/Employees",
                        dataType: "jsonp"
                    }
                },
                 schema: {
                    model: {
                        id: "EmployeeId",
                        hasChildren: "HasEmployees"
                    }
                }
            }
        })
    });
    </script>

### HTML Structure and DOM Placement

By default, the ContextMenu is created as a child of the `<body>` element.

###### Example

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

The following example demonstrates how the page markup from the previous example changes after the initialization of the ContextMenu when the widget is moved to become a child of the `<body>` element and its additional markup&mdash;the wrapper and the title bar&mdash;is generated.

###### Example

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

## Configuration

### ContextMenu Animations

By default, the ContextMenu uses a slide animation to expand sub-items on a mouse hover event. Animations, along with the animation style and delay, can be customized by using configuration properties. You can also configure Menu items to open on click instead of on hover, and ContextMenu can also be configured to use a different open event than the default `contextmenu` (right click).

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

The [API of the ContextMenu](/api/javascript/ui/contextmenu) provides methods for dynamically adding or removing Menu items.

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

### Scrolling

By default, the items inside the ContextMenu do not scroll. However, you can enable scrolling by setting the [`scrollable` property](/kendo-ui/api/javascript/ui/contextmenu/configuration/scrollable) of the ContextMenu to `true`. Once enabled, the ContextMenu displays buttons which scroll the items if they cannot fit the viewport height.

The following example demonstrates how to enable scrolling within the ContextMenu.

###### Example

    <div id="target">Right Click to Open ContextMenu</div>
    <ul id="context-menu">
        <li>Item 1
        <ul>
            <li>Sub Item 1
            <ul>
                <li>Sub sub Item 1</li>
                <li>Sub sub Item 2</li>
                <li>Sub sub Item 3</li>
            </ul>
            </li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
        </ul>
        </li>
        <li>Item 2
        <ul>
            <li>Sub Item 1</li>
            <li>Sub Item 2</li>
            <li>Sub Item 3</li>
        </ul>
        </li>
    </ul>

    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            scrollable: true
        });
    </script>


You can also customize the scrollable amount by setting a value (in pixels) to the [`distance` property](kendo-ui/api/javascript/ui/contextmenu/configuration/scrollable.scrollabledistance). `distance` defaults to `50`.

###### Example

    <div id="target">Right Click to open the ContextMenu</div>
    <ul id="context-menu">
        <li>Item 1
        <ul>
            <li>Sub Item 1
            <ul>
                <li>Sub sub Item 1</li>
                <li>Sub sub Item 2</li>
                <li>Sub sub Item 3</li>
            </ul>
            </li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
            <li>Sub Item 1</li><li>Sub Item 2</li><li>Sub Item 3</li>
        </ul>
        </li>
        <li>Item 2
        <ul>
            <li>Sub Item 1</li>
            <li>Sub Item 2</li>
            <li>Sub Item 3</li>
        </ul>
        </li>
    </ul>

    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            scrollable: {
                distance: 10
            }
        });
    </script>


## See Also

* [Overview of the Menu Widget]({% slug overview_kendoui_menu_widget %})
* [How to Create Split Button]({% slug howto_createa_split_button_menu %})
* [How to Execute Custom Click Actions Based on Class Name]({% slug howto_execute_custom_click_actions_basedon_classnames_menu %})
* [How to Use FontAwesome Icons]({% slug howto_use_fontawesome_icons_menu %})
* [Menu JavaScript API Reference](/api/javascript/ui/menu)
