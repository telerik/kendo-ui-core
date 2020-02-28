---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Breadcrumb tag helper for ASP.NET Core."
slug: taghelpers_breadcrumb_aspnetcore_overview
position: 1
---

# Breadcrumb Tag Helper Overview

The Telerik UI Breadcrumb tag helper for ASP.NET Core is a server-side wrapper for the Kendo UI Breadcrumb widget.

The Breadcrumb is an intuitive UI component that allows navigation within a folder structure or web page. It provides an easy way to navigate backwards by one or multiple steps.

* [Demo page for the Breadcrumb](https://demos.telerik.com/aspnet-core/breadcrumb/tag-helper)

## Initializing the Breadcrumb

The following example demonstrates how to define the Breadcrumb by using the Breadcrumb tag helpers.

```tagHelper
    <kendo-breadcrumb name="breadcrumb"></kendo-breadcrumb>
```

## Basic Configuration

The following example demonstrates the basic configuration for the Breadcrumb tag helper.

```tagHelper
    <kendo-breadcrumb name="breadcrumb">
        <kendo-breadcrumb-items>
            <kendo-breadcrumb-item type="BreadcrumbItemType.RootItem" text="All Components" href="https://demos.telerik.com/kendo-ui/" show-text="true" icon="home" show-icon="true"></kendo-breadcrumb-items>
            <kendo-breadcrumb-item type="BreadcrumbItemType.Item" text="Breadcrumb" href="/breadcrumb"></kendo-breadcrumb-item>
            <kendo-breadcrumb-item type="BreadcrumbItemType.Item" text="Tag Helper" href="/tag-helper"></kendo-breadcrumb-item>
        </kendo-breadcrumb-items>
    </kendo-breadcrumb>
```

## Functionality and Features

* [Icons]({% slug taghelpers_breadcrumb_aspnetcore_icons %})
* [Items]({% slug taghelpers_breadcrumb_aspnetcore_items %})
* [Editing]({% slug taghelpers_breadcrumb_aspnetcore_editing %})
* [Navigation]({% slug taghelpers_breadcrumb_aspnetcore_navigation %})

## Events

You can subscribe to all Breadcrumb events.

```tagHelpers
    <kendo-breadcrumb name="breadcrumb"
                    on-change="onChange"
                    on-click="onClick">
        <kendo-breadcrumb-items>
            <kendo-breadcrumb-item type="BreadcrumbItemType.RootItem" text="All Components" href="https://demos.telerik.com/kendo-ui/" show-text="true" icon="home" show-icon="true"></kendo-breadcrumb-items>
            <kendo-breadcrumb-item type="BreadcrumbItemType.Item" text="Breadcrumb" href="/breadcrumb"></kendo-breadcrumb-item>
            <kendo-breadcrumb-item type="BreadcrumbItemType.Item" text="Tag Helper" href="/tag-helper"></kendo-breadcrumb-item>
        </kendo-breadcrumb-items>
    </kendo-breadcrumb>

    <script>
        function onClick(e) {
            kendoConsole.log("Clicked. :: target: " + e.item.text + ". Type :: " + e.item.type);
        }

        function onChange(e) {
            kendoConsole.log("Changed. New Value :: " + e.value);
        }

    </script>
```

## See Also

* [Basic Usage of the Breadcrumb Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/breadcrumb/tag-helper)

