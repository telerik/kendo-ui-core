---
title: Overview
page_title: Overview of Menu UI widget | Kendo UI Documentation
description: Steps that help you initialize the Menu widget using JSON data object and customize animation.
---

# Menu Overview

The Kendo UI Menu displays hierarchical data as a multi-level menu. It provides rich styling for unordered lists
of items, and can be used for both navigation and executing JavaScript commands. Items can be defined and
initialized from HTML, or through the configuration options. The Kendo UI Menu API can be used to add and remove items.


## Getting Started

### Initialize the Kendo UI Menu using HTML markup

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

### Initialize the Kendo UI Menu using JSON data object
    
    <ul id="menu"></ul>

    <script>
      $(document).ready(function() {
        $("#menu").kendoMenu({
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

Initialization of a Menu should occur after the DOM is fully loaded. It is recommended that initialization the Menu is done within a $(document).ready() statement.

## Customize Menu Animations

By default, the Menu uses a slide animation to expand sub-items on mouse hover event. Animations can be changed using configuration properties, along with the animation style and delay. Menu items can also be configured to open on click instead of on hover.

### Change Menu animation and open behavior
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

## Configure dynamic Menu items

The Menu API provides methods for dynamic adding
or removing Menu items. To add items, you need to provide the new item as a JSON
object along with a reference item.


A reference item is a target Menu item HTML element that already exists in the Menu. The reference item will be used to determine the
placement in the hierarchy of the new item. Any valid jQuery selector can be used to obtain a reference to the target item. For examples, see the [Menu API demos](http://demos.telerik.com/kendo-ui/web/menu/api.html).

### How to add a new root Menu item
    <ul id="menu"></ul>

    <script>
        var menu = $("#menu").kendoMenu().data("kendoMenu");
        menu.insertAfter(
            { text: "New Menu Item" },
            menu.element.children("li:last")
        );
    </script>

## Keyboard Navigation

The Menu provides keyboard navigation functionality. When focused the first root item is activated.

The following keys and user actions are supported:

* Left and right arrow keys move the active item left and right on the root level of horizontal Menus.
* Up and down arrow keys move the active item up and down of vertical Menu item groups.
* Down arrow opens an item group a horizontal Menu.
* Right arrow opens an item group of a vertical Menu.
* Left arrow closes an item group.
* Right arrow moves the active state to the next root item of a horizontal Menu, if the previous active item has been inside an item group.
* Escape closes an item group.
* (Shift+) Tab blurs the Menu and moves focus to the next (previous) focusable page element.

## Shrink the Menu to exactly fit the root items

The Menu renders as a `UL` element and expands horizontally by default.
If a horizontal Menu is wider than the total width of its root items, a blank space will remain visible on the right. In order to remove this space, you can use the following CSS rules:


    #menu-id /* for a specific menu instance */
    ,
    .k-menu-horizontal /* for all horizontal menus */
    {
       display: inline-block;
    }

Shrinking the horizontal Menu will make the last root item's border touch the Menu's right border (in left-to-right layouts). The last item border can be removed with:

    #menu-id > .k-last /* for a specific menu instance */
    ,
    .k-menu-horizontal > .k-last /* for all horizontal menus */
    {
       border-width: 0;
    }
