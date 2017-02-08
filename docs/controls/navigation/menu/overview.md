---
title: Overview
page_title: Overview | Kendo UI Menu
description: "Learn how to initialize the Kendo UI Menu widget, configure its behaviors and customize animations."
slug: overview_kendoui_menu_widget
position: 1
---

# Menu Overview

The [Kendo UI Menu widget](http://demos.telerik.com/kendo-ui/menu/index) displays hierarchical data as a multi-level menu. It provides rich styling for unordered lists of items, and can be used for both navigation and executing JavaScript commands. Items can be defined and initialized from HTML, or through the configuration options. [Kendo UI Menu API](/api/javascript/ui/menu) can be used to add and remove items.

## Getting Started

### Initialize the Menu

The Kendo UI Menu widget can be initialized in two ways:

* Through HTML markup
* Through a JSON data object

> **Important**  
>
> As Menu should be initialized after the DOM is fully loaded, make sure you create it within a `$(document).ready()` statement.

#### Using HTML Markup

The example below demonstrates how to initialize the Menu by using HTML markup.

###### Example

    <ul id="menu">
        <li>Normal Item
            <ul>
                <li><span class="k-sprite icon-class"></span>Item with a Sprite</li>
                <li><img src="Icons/contacts.gif" />Item with an Icon</li>
            </ul>
        </li>
        <li><a href="http://www.google.com">Navigation Item</a></li>
        <li class="k-state-active">Active Item</li>
        <li>Template Item
            <div class="k-group k-content">
                Test button - <a class="k-button">Button</a>
            </div>
        </li>
    </ul>

    <script>
        $(document).ready(function() {
            $("#menu").kendoMenu();
        });
    </script>

#### Using JSON Data Object

The example below demonstrates how to initialize the Menu by using a JSON data object

By initializing the Menu using JSON, you can use assign a select handler for each item by assigning a function to the `select` property.

###### Example

    <ul id="menu"></ul>

    <script>
      $(document).ready(function() {
        $("#menu").kendoMenu({
          dataSource:
          [{
            text: "Item 1",
            cssClass: "myClass",                         // (Optional) Add custom CSS class to the item, added 2012 Q3 SP1
            url: "http://www.telerik.com"                // (Optional) Link URL if navigation is needed
          },
           {
             text: "<b>Item 2</b>",
             encoded: false,                              // Allows the use of HTML for item text
             content: "text"                              // Content within an item
           },
           {
             text: "Item 3",
             imageUrl: "http://www.telerik.com/test.jpg", // (Optional) Item image URL
             items: [{                                    // Sub-item collection
                    text: "Sub Item 1"
                },
                {
                    text: "Sub Item 2"
                }]
           },
           {
             text: "Item 4",
             spriteCssClass: "imageClass3"                // (Optional) Item image sprite CSS class
           },
           {
             text: "Item 5",
             select: function(e) {                        // Item select event handler, optional 
                // e.sender - returns reference to the Kendo Menu widget
                // e.target - returns the clicked element. Typically, the span.k-link element.
                
                // handle event
             }]
        })
      });
    </script>

### Sample Case

The example below demonstrates the basic approach to build a Menu by using HTML markup.

###### Example

    <ul id="MenuID">
        <li>root item 1</li>
        <liroot item 2
            <ul>
                <li>child item 1</li>
                <li>child item 2</li>
            </ul>
        </li>
        <li>root item 3
            <ul>
                <li>
                    <div>Menu template content</div>
                </li>
            </ul>
        </li>
    </ul>


To create a Kendo UI Menu based on the example above, elaborate on the DOM elements in the way demonstrated by the code below.

###### Example

    <ul id="MenuID" class="k-widget k-menu">
        <li class="k-item k-state-default"><span class="k-link">root item 1</span></li>
        <li class="k-item k-state-default">
            <span class="k-link">root item 2
                <span class="k-icon k-i-arrow-s"></span>
            </span>
            <ul class="k-group k-menu-group">
                <li class="k-item k-state-default"><span class="k-link">child item 1</span></li>
                <li class="k-item k-state-default"><span class="k-link">child item 2</span></li>
            </ul>
        </li>
        <li class="k-item k-state-default">
            <span class="k-link">root item 3
                <span class="k-icon k-i-arrow-s"></span>
            </span>
            <ul class="k-group k-menu-group">
                <li class="k-item k-state-default">
                    <div>Menu template content</div>
                </li>
            </ul>
        </li>
    </ul>


The basic emphasis is on the following changes:

* All `<ul>` and `<li>` elements receive some of the Kendo UI CSS classes.
* Each menu item text is wrapped in a `span.k-link` element, or `a.k-link` element, if a navigation URL is specified.
* A dropdown arrow (`<span class="k-icon k-i-arrow-s"></span>`) is appended to the `.k-link` element of each expandable menu item.

Once a menu group is opened, the `ul.k-group` element is wrapped by a `div.k-animation-container` and the DOM structure is transformed in the way demonstrated below.

###### Example

    <li class="k-item k-state-default">
        <span class="k-link">root item 2
            <span class="k-icon k-i-arrow-s"></span>
        </span>
        <div class="k-animation-container">
            <ul class="k-group k-menu-group">
                <li class="k-item k-state-default"><span class="k-link">child item 1</span></li>
                <li class="k-item k-state-default"><span class="k-link">child item 2</span></li>
            </ul>
        </div>
    </li>

## Configuration

### Menu Animations

By default, the Menu uses a slide animation to expand sub-items on a mouse hover event. Animations, along with the animation style and delay, can be customized by using configuration properties. You can also configure Menu items to open on click instead of on hover.

The example below demonstrates how to change Menu animation and open behavior.

###### Example

    <ul id="menu"></ul>

    <script>
        $("#menu").kendoMenu({
            animation: {
                open: { effects: "fadeIn" },
                duration: 500
            },
            openOnClick: true
        });
    </script>

### Dynamic Items

[The Kendo UI Menu API](/api/javascript/ui/menu) provides methods for dynamically adding or removing Menu items.

To add items, provide the new item as a JSON object along with a reference item. A reference item is a target Menu item HTML element that already exists in the Menu. The reference item will be used to determine the placement in the hierarchy of the new item. Any valid jQuery selector can be used to obtain a reference to the target item.

For more information on configuring Menu items, see the [Menu API demos](http://demos.telerik.com/kendo-ui/web/menu/api.html).

The example below demonstrates how to add a new root Menu item.

###### Example

    <ul id="menu"></ul>

    <script>
        var menu = $("#menu").kendoMenu().data("kendoMenu");
        menu.insertAfter(
            { text: "New Menu Item" },
            menu.element.children("li:last")
        );
    </script>

## Display

### Shrink Menu to Exactly Fit Root Items

The Menu renders as a `<ul>` element and expands horizontally by default. If a horizontal Menu is wider than the total width of its root items, a blank space will remain visible on the right. To remove this space, use the CSS rules in the example below.

###### Example

    #menu-id /* for a specific menu instance */
    ,
    .k-menu-horizontal /* for all horizontal menus */
    {
       display: inline-block;
    }

In left-to-right layouts, shrinking the horizontal Menu will make the border of the last root item touch the right border of the Menu. The last item border can be removed as shown int he example below.

###### Example

    #menu-id > .k-last /* for a specific menu instance */
    ,
    .k-menu-horizontal > .k-last /* for all horizontal menus */
    {
       border-width: 0;
    }

<!--*-->
## Keyboard Navigation

The Menu provides a keyboard navigation functionality. When on focus, the first root item is activated.

Kendo UI Menu supports the following keyboard shortcuts and user actions:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---                           |:---                                                                               |
| Left `Arrow` key              | <ul><li>Moves the active item on the root level of horizontal Menus to the left</li> <li>Closes an item group</li></ul> |
| Right `Arrow` key             | <ul><li>Moves the active item on the root level of horizontal Menus to the right</li> <li>opens an item group of a vertical Menu</li> <li>Moves the active state to the next root item of a horizontal Menu, if the previous active item has been inside an item group</li></ul>        |
| Up `Arrow` key                | Moves the active item of vertical Menu item groups upwards                        |
| Down `Arrow` key              | <ul><li>Moves the active item of vertical Menu item groups downwards</li> <li>Opens an item group of a horizontal Menu</li></ul> |
| `Esc`                         | Closes an item group                                                              |
| (`Shift`+) `Tab`              | Blurs the Menu and moves the focus to the next (previous) focusable page element  |

## See Also

Other articles and how-to examples on Kendo UI Menu:

* [Context Menu]({% slug overview_kendoui_contextmenu_widget %})
* [How to Create Split Button]({% slug howto_createa_split_button_menu %})
* [How to Execute Custom Click Actions Based on Class Name]({% slug howto_execute_custom_click_actions_basedon_classnames_menu %})
* [How to Use FontAwesome Icons]({% slug howto_use_fontawesome_icons_menu %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Menu Widget](/aspnet-mvc/helpers/menu/overview)
* [Overview of the Menu JSP Tag]({% slug overview_menu_uiforjsp %})
* [Overview of the Menu PHP Class](/php/widgets/menu/overview)
* [Menu JavaScript API Reference](/api/javascript/ui/menu)
