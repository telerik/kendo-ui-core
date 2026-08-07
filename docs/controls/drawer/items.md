---
title: Items
page_title: jQuery Drawer Documentation - Items
description: "Get started with the jQuery Drawer by Kendo UI and learn how to configure its items."
components: ["drawer"]
slug: items_kendoui_drawer
position: 3
---

# Items

The [`items`](/api/javascript/ui/drawer/configuration/items) configuration lets you populate the Drawer from a data array instead of writing a full HTML [`template`](/api/javascript/ui/drawer/configuration/template). Each item supports text, an icon, separator, selected and enabled state, custom CSS classes, custom HTML attributes, per-item templates, and nested child items.

> When `template` is configured it takes precedence and the `items` array is ignored.

## Basic Item Configuration

The following example shows a Drawer with a flat list of navigation items using icons and a separator.

```dojo
    <div id="drawer">
        <div id="drawer-content">
            <p>Select a section from the navigation.</p>
        </div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            position: "left",
            items: [
                { text: "Overview", icon: "home", selected: true },
                { text: "Analytics", icon: "chart-bar" },
                { separator: true },
                { text: "Settings", icon: "gear" },
                { text: "Help", icon: "question-circle" }
            ],
            itemClick: function(e) {
                if (e.dataItem && !e.dataItem.separator) {
                    $("#drawer-content p").text("Selected: " + e.dataItem.text);
                }
            }
        });
    </script>
```

## Disabled Items

Set `enabled: false` on any item to prevent interaction. Disabled items are rendered visually distinct and do not fire `itemClick`.

```dojo
    <div id="drawer">
        <div>Content area.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            items: [
                { text: "Dashboard", icon: "grid" },
                { text: "Billing", icon: "dollar", enabled: false },
                { separator: true },
                { text: "Reports", icon: "chart-bar" }
            ]
        });
    </script>
```

## Custom CSS Classes and HTML Attributes

Use `cssClass` to apply styling hooks and `attr` to add arbitrary HTML attributes such as `data-*` or `title`.

```dojo
    <div id="drawer">
        <div>Content area.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            items: [
                {
                    text: "Alerts",
                    icon: "bell",
                    cssClass: "urgent-item",
                    attr: { "data-section": "alerts", "title": "View Alerts" }
                },
                { text: "Archive", icon: "folder" }
            ]
        });
    </script>
```

## Per-Item Templates

When you need full control over a single item's markup without switching the whole Drawer to the top-level `template` option, provide a `template` function on the item. The function receives the item data object and must return the complete `<li>` markup.

```dojo
    <div id="drawer">
        <div>Content area.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            items: [
                {
                    text: "Profile",
                    icon: "user",
                    template: function(item) {
                        return "<li data-role='drawer-item'>" +
                            kendo.ui.icon({ icon: item.icon }) +
                            "<span class='k-item-text'>" + kendo.htmlEncode(item.text) + "</span>" +
                            "<span class='k-badge'>3</span>" +
                            "</li>";
                    }
                },
                { text: "Notifications", icon: "bell" }
            ]
        });
    </script>
```

## Mini-Mode Per-Item Templates

When the Drawer is configured with [`mini`](/api/javascript/ui/drawer/configuration/mini) mode, supply `miniTemplate` on individual items to control their collapsed appearance. If [`mini.template`](/api/javascript/ui/drawer/configuration/mini.template) is also set, it takes precedence over per-item `miniTemplate` values.

```dojo
    <div id="drawer">
        <div>Content area.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            mini: { width: 60 },
            items: [
                {
                    text: "Inbox",
                    icon: "inbox",
                    miniTemplate: function(item) {
                        return "<li data-role='drawer-item' title='" + kendo.htmlEncode(item.text) + "'>" +
                            kendo.ui.icon({ icon: item.icon }) +
                            "</li>";
                    }
                },
                { text: "Sent", icon: "folder" },
                { text: "Trash", icon: "delete" }
            ]
        });
    </script>
```

## Nested Items

Pass an `items` array inside any item to create a multi-level navigation structure. The Drawer renders child items using the same configuration surface recursively.

```dojo
    <div id="drawer">
        <div>Content area.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            expanded: true,
            items: [
                {
                    text: "Products",
                    icon: "folder",
                    items: [
                        { text: "Inventory", icon: "list-unordered", selected: true },
                        { text: "Orders", icon: "cart" }
                    ]
                },
                { separator: true },
                { text: "Customers", icon: "user" },
                { text: "Reports", icon: "chart-bar" }
            ]
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Drawer — items](/api/javascript/ui/drawer/configuration/items)
* [Templates of the Drawer]({% slug templates_kendoui_drawer %})
* [Hierarchy of the Drawer]({% slug hierarchy_kendoui_drawer %})
* [Basic Usage of the Drawer (Demo)](https://demos.telerik.com/kendo-ui/drawer/index)
