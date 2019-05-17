---
title: Overview
page_title: Drawer | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Drawer tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_drawer_aspnetcore
position: 1
---

# Drawer Tag Helper Overview

The Drawer tag helper helps you configure the Kendo UI Drawer widget in ASP.NET Core applications. It allows you to configure the Kendo UI Drawer widget from server-side code. The Draweris a dismissible panel used for navigation in responsive web applications or for changing a content of a section in the page.

## Interaction

The drawer widget has two modes of interaction - `overlay`(*default*) and `push` and two positions - `left`(*default*) and `right` which determine the side from which the drawer will appear. It has gesture support and also features `mini` mode which makes the drawer always partly visible and allows the user to reveal its full content either with a gesture or by calling the `show()` method of the widget.

## Display Modes

### Overlay Mode

The `overlay` mode is not associated with any content. The drawer appears on top of the page contents from the side which is configured with the `position` attribute. To show the drawer either swipe or drag with mouse or call the [`show()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer/methods/show) method of the widget. The drawer closes on click/tap of any of the options or on the overlay.

### Push Mode

The `push` mode is associated with specific page content and the element from which the widget is initialized should wrap that content. To use the `push` mode, nest the `<content></content>` tag and place the associated content in it. When the drawer opens it will push that content to the side. It is designed for wider screens (desktop/tablet). To show the drawer either swipe or drag with mouse or call the [`show()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer/methods/show) method of the widget. The drawer closes on click/tap of any of the options or on the associated content.

The height of the widget is determined by the higher content of the two - the template of the widget or the wrapped content it is associated with. The `min-height` attribute can be used to prevent the content from changing its height as the user toggles the drawer options.

### Mini Mode

The `mini` option can be used with both `overlay` and `push` modes by nesting the `<mini/>` tag helper. If `<mini enabled="true"/>`, the always visible portion of the Drawer will take up the default width of `50px` and the main template. To change the width of the `mini` always visible portion, use the `width` and `template`/`template-id` attributes.

###### Example

     <mini width="100" template-id="mini-template"/>

## Templates

To distinguish the items within the template when the user interacts with the drawer, add the `data-role="drawer-item"` attribute to each item HTML template. If you wish to add a separator between the drawer items use the `data-role="drawer-separator"` attribute.

The Kendo UI Drawer widget has two configurable templates - the main `template` attribute of the root tag helper and the `<mini template="<div>Mini Template</div>"/>`.

Icons can be added with a span with class `k-icon` combined with the desired [web font icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web#list-of-font-icons) class. To ensure that the icons and text have sufficient padding wrap the item template text in a span with class `k-item-text`.

###### Example

     <kendo-drawer 
        name="drawer" 
        template="<ul><li data-role='drawer-item'><span class='k-icon k-i-eye'></span><span class='k-item-text'>See More</span></li></ul>" 
        mode="push"
        position="left"
        min-height="330">
        <content>
            <h1 class="my-content">Swipe or drag me to the right <span class="k-icon k-i-arrow-chevron-right"></span></h1>
        </content>
     </kendo-drawer>

## Basic Usage

The following example demonstrates how to define the Drawer by using the Drawer tag helper.

###### Example

```TagHelper
     <kendo-drawer name="drawer" template-id="template" mode="overlay" position="left">
     </kendo-drawer>
```
```Template
    <script id="template" type="text/x-kendo-template">
        <ul>
            <li data-role='drawer-item'>First Item</li>
            <li data-role='drawer-separator'></li>
            <li data-role='drawer-item'>Second Item</li>
            <li data-role='drawer-item' class='k-state-selected'>Third Item</li>
        </ul>
```

## Configuration

The Drawer tag helper configuration options are passed as strongly-typed attributes of the tag that come with IntelliSense. 

```TagHelper
    <kendo-drawer name="drawer" template-id="template" mode="push" position="left" min-height="330" swipe-to-open="true" on-item-click="onItemClick">
        <mini enabled="true"/>
        <content>
            <h1 class="my-content">Swipe or drag me to the right <span class="k-icon k-i-arrow-chevron-right"></span></h1>
        </content>
    </kendo-drawer>
```
```EventHandler
    <script>
        function onItemClick(e) {
            // logs the selected drawer item text
            console.log(e.item.text());
        }
    </script>
```
```Template
     <script id="template" type="text/x-kendo-template">
        <ul>
            <li data-role='drawer-item' class='k-state-selected'><span class='k-icon k-i-inbox'></span><span class='k-item-text'>Inbox</span></li>
            <li data-role='drawer-separator'></li>
            <li data-role='drawer-item'><span class='k-icon k-i-eye'></span><span class='k-item-text'>See more</span></li>
        </ul>
    </script>
```

## Get the Drawer Instance

The following example demonstrates the basic configuration of the Drawer Tag Helper and how to get the Drawer instance.

```TagHelper
    <kendo-drawer name="drawer" template-id="template" mode="push" position="left" min-height="330" swipe-to-open="true" on-item-click="onItemClick">
        <mini enabled="true"/>
        <content>
            <h1 class="my-content">Swipe or drag me to the right <span class="k-icon k-i-arrow-chevron-right"></span></h1>
        </content>
    </kendo-drawer>

    <script type="text/javascript">
        $(function () {
            //Notice that the name of the Drawer is used to get its client-side instance.
            var drawer = $("#drawer").data("kendoDrawer");
            console.log(drawer);
        });
    </script>
```

## See Also

* [UI for ASP.NET Core API Reference of the Drawer](/api/drawer)
* [JavaScript API Reference of the Drawer](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer)
* [UI for ASP.NET Core Demos of the Drawer](https://demos.telerik.com/aspnet-core/drawer/index)
* [Tag Helpers Overview]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
