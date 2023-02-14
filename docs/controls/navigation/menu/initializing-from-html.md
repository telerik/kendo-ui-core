---
title: Initializing from HTML
page_title: jQuery Menu Documentation - Initializing from HTML Markup
description: "Get started with the jQuery Menu by Kendo UI and learn about the alternative way to initialize the component from HTML."
slug: html_kendoui_menu_component
position: 2
---

# Initializing the Menu from HTML

You can initialize the Menu by using HTML markup or a JSON `data` object.

> As the Menu has to be initialized after the DOM is fully loaded, create the component within a `$(document).ready()` statement.

The following example demonstrates how to initialize the Menu by using HTML markup.

```dojo
    <ul id="menu">
        <li>Normal Item
            <ul>
                <li><span class="k-sprite icon-class"></span>Item with a Sprite</li>
                <li><img src="images/contacts.gif" />Item with an Icon</li>
            </ul>
        </li>
        <li><a href="https://www.google.com">Navigation Item</a></li>
        <li class="k-active">Active Item</li>
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
```

The following example demonstrates the basic approach to build a Menu by using HTML markup.

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


To create a Menu based on the previous example, elaborate on the DOM elements in the following way.

* All `<ul>` and `<li>` elements receive some of the Kendo UI CSS classes.
* If a navigation URL is specified, each menu item text is wrapped in a `span.k-link` element, or `a.k-link` element.
* A drop-down arrow (`<span class="k-icon k-i-arrow-s"></span>`) is appended to the `.k-link` element of each expandable Menu item.

```html
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
```

Once a Menu group is opened, the `ul.k-group` element is wrapped by a `div.k-animation-container` and the DOM structure is transformed in the following way.

```html
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
```

## See Also 

* [Getting Started with the Menu]({% slug getting_started_kendoui_menu_widget %})
* [Demo Page for the jQuery Menu](https://demos.telerik.com/kendo-ui/menu/index)
* [JavaScript API Reference of the Menu](/api/javascript/ui/menu)
* [Knowledge Base Section](/knowledge-base)