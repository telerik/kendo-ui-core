---
title: Editing
page_title: Editing
description: "Learn how to enable editing and alter the Breadcrumb value."
slug: taghelpers_breadcrumb_aspnetcore_editing
position: 4
---

# Editing

The path set through the Breadcrumb widget can be edited if the `Editable` configuration is enabled. When clicking in an empty area of the component or on the current page, the Breadcrumb will enter into editing mode. That will also happen when `enter` is pressed if the Breadcrumb is focused.

Editing mode shows an input field containing the current value of the widget. Users are allowed to type a new path.

The below example demonstrates how to enable editing of the Breadcrumb.

```tagHelper
    <kendo-breadcrumb name="breadcrumb"
                      editable="true">
        <kendo-breadcrumb-items>
            <kendo-breadcrumb-item type="BreadcrumbItemType.RootItem" text="All Components" href="https://demos.telerik.com/kendo-ui/" show-text="true" icon="home" show-icon="true"></kendo-breadcrumb-items>
            <kendo-breadcrumb-item type="BreadcrumbItemType.Item" text="Breadcrumb" href="/breadcrumb"></kendo-breadcrumb-item>
            <kendo-breadcrumb-item type="BreadcrumbItemType.Item" text="Tag Helper" href="/tag-helper"></kendo-breadcrumb-item>
        </kendo-breadcrumb-items>
    </kendo-breadcrumb>
```
