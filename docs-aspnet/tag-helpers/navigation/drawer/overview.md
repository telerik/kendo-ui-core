---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Drawer TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_drawer_aspnetcore
position: 1
---

# Drawer TagHelper Overview

The Telerik UI Drawer TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Drawer widget.

The Drawer is a dismissible panel used for navigation in responsive web applications or for changing a content of a section in the page.

* [Demo page for the Drawer](https://demos.telerik.com/aspnet-core/drawer/index)

## Initializing the Drawer

The following example demonstrates how to define the Drawer by using the Drawer TagHelper.

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

## Basic Configuration

The Drawer TagHelper configuration options are passed as strongly-typed attributes of the tag that come with IntelliSense.

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
            // Logs the selected drawer item text.
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

## Functionality and Features

* [Display modes]({% slug displaymodes_drawer_aspnetcoretaghelper %})
* [Interaction modes]({% slug interactionmodes_drawer_aspnetcoretaghelper %})
* [Templates]({% slug templates_drawer_aspnetcoretaghelper %})

## Referencing Existing Instances

The following example demonstrates the basic configuration of the Drawer TagHelper and how to get the Drawer instance.
To reference an existing Kendo UI Drawer instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Drawer client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer#methods) to control its behavior.

```TagHelper
    <kendo-drawer name="drawer" template-id="template" mode="push" position="left" min-height="330" swipe-to-open="true" on-item-click="onItemClick">
        <mini enabled="true"/>
        <content>
            <h1 class="my-content">Swipe or drag me to the right <span class="k-icon k-i-arrow-chevron-right"></span></h1>
        </content>
    </kendo-drawer>

    <script type="text/javascript">
        $(function () {
            // The name of the Drawer is used to get its client-side instance.
            var drawer = $("#drawer").data("kendoDrawer");
            console.log(drawer);
        });
    </script>
```

## See Also

* [Basic Usage of the Drawer Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/drawer/index)
* [Server-Side API](/api/drawer)
