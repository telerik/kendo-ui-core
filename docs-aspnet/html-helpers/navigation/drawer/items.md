---
title: Items
page_title: Items
description: "Learn how to configure the items of the Telerik UI Drawer component for {{ site.framework }}."
components: ["drawer"]
previous_url: /helpers/navigation/drawer/items
slug: htmlhelpers_drawer_items_aspnetcore
position: 3
---

# Items

The `Items()` configuration lets you populate the Drawer from a data array instead of writing a full HTML template. Each item supports text, an icon, separator, selected and enabled state, custom CSS classes, custom HTML attributes, per-item templates, and nested child items.

> When `Template()` or `TemplateId()` is configured it takes precedence and the `Items()` configuration is ignored.

## Basic Item Configuration

The following example shows a Drawer with a flat list of navigation items using icons and a separator.

```HtmlHelper
    @(Html.Kendo().Drawer()
        .Name("drawer")
        .Mode("push")
        .Position("left")
        .Items(items =>
        {
            items.Add().Text("Overview").Icon("home").Selected(true);
            items.Add().Text("Analytics").Icon("chart-bar");
            items.Add().Separator(true);
            items.Add().Text("Settings").Icon("gear");
            items.Add().Text("Help").Icon("question-circle");
        })
        .Content("<div><p id='drawer-content'>Select a section from the navigation.</p></div>")
    )
```
{% if site.core %}
```TagHelper
    <kendo-drawer name="drawer" mode="push" position="left">
        <drawer-items>
            <drawer-item text="Overview" icon="home" selected="true"></drawer-item>
            <drawer-item text="Analytics" icon="chart-bar"></drawer-item>
            <drawer-item separator="true"></drawer-item>
            <drawer-item text="Settings" icon="gear"></drawer-item>
            <drawer-item text="Help" icon="question-circle"></drawer-item>
        </drawer-items>
        <content>
            <div><p id="drawer-content">Select a section from the navigation.</p></div>
        </content>
    </kendo-drawer>
```
{% endif %}

## Disabled Items

Set `Enabled(false)` on any item to prevent interaction. Disabled items are rendered visually distinct and do not respond to clicks.

```HtmlHelper
    @(Html.Kendo().Drawer()
        .Name("drawer")
        .Mode("push")
        .Items(items =>
        {
            items.Add().Text("Dashboard").Icon("grid");
            items.Add().Text("Billing").Icon("dollar").Enabled(false);
            items.Add().Separator(true);
            items.Add().Text("Reports").Icon("chart-bar");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-drawer name="drawer" mode="push">
        <drawer-items>
            <drawer-item text="Dashboard" icon="grid"></drawer-item>
            <drawer-item text="Billing" icon="dollar" enabled="false"></drawer-item>
            <drawer-item separator="true"></drawer-item>
            <drawer-item text="Reports" icon="chart-bar"></drawer-item>
        </drawer-items>
    </kendo-drawer>
```
{% endif %}

## Custom CSS Classes and HTML Attributes

Use `CssClass()` to apply styling hooks and `Attributes()` to add arbitrary HTML attributes such as `data-*` or `title`.

```HtmlHelper
    @(Html.Kendo().Drawer()
        .Name("drawer")
        .Mode("push")
        .Items(items =>
        {
            items.Add()
                .Text("Alerts")
                .Icon("bell")
                .CssClass("urgent-item")
                .Attributes(new { data_section = "alerts", title = "View Alerts" });
            items.Add().Text("Archive").Icon("folder");
        })
    )
```
{% if site.core %}
```TagHelper
    @{
        var attributes = new { data_section = "alerts", title = "View Alerts" };
    }
    <kendo-drawer name="drawer" mode="push">
        <drawer-items>
            <drawer-item text="Alerts" icon="bell" css-class="urgent-item" attributes ="@attributes" ></drawer-item>
            <drawer-item text="Archive" icon="folder"></drawer-item>
        </drawer-items>
    </kendo-drawer>
```
{% endif %}

## Per-Item Templates

When you need full control over a single item's markup without switching the whole Drawer to the top-level `Template()` method, provide a JavaScript handler name through `TemplateHandler()`. The handler receives the item data object and must return the complete `<li>` markup.

```HtmlHelper
    @(Html.Kendo().Drawer()
        .Name("drawer")
        .Mode("push")
        .Items(items =>
        {
            items.Add().Text("Profile").Icon("user").TemplateHandler("profileItemTemplate");
            items.Add().Text("Notifications").Icon("bell");
        })
    )

    <script>
        function profileItemTemplate(item) {
            return "<li data-role='drawer-item'>" +
                kendo.ui.icon({ icon: item.icon }) +
                "<span class='k-item-text'>" + kendo.htmlEncode(item.text) + "</span>" +
                "<span class='k-badge'>3</span>" +
                "</li>";
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-drawer name="drawer" mode="push">
        <drawer-items>
            <drawer-item text="Profile" icon="user" template-handler="profileItemTemplate"></drawer-item>
            <drawer-item text="Notifications" icon="bell"></drawer-item>
        </drawer-items>
    </kendo-drawer>

    <script>
        function profileItemTemplate(item) {
            return "<li data-role='drawer-item'>" +
                kendo.ui.icon({ icon: item.icon }) +
                "<span class='k-item-text'>" + kendo.htmlEncode(item.text) + "</span>" +
                "<span class='k-badge'>3</span>" +
                "</li>";
        }
    </script>
```
{% endif %}

## Nested Items

Pass a nested `Items()` configurator inside any item to create a multi-level navigation structure. The Drawer renders child items using the same configuration surface recursively.

```HtmlHelper
    @(Html.Kendo().Drawer()
        .Name("drawer")
        .Mode("push")
        .Expanded(true)
        .Items(items =>
        {
            items.Add().Text("Products").Icon("folder").Items(children =>
            {
                children.Add().Text("Inventory").Icon("list-unordered").Selected(true);
                children.Add().Text("Orders").Icon("cart");
            });
            items.Add().Separator(true);
            items.Add().Text("Customers").Icon("user");
            items.Add().Text("Reports").Icon("chart-bar");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-drawer name="drawer" mode="push" expanded="true">
        <drawer-items>
            <drawer-item text="Products" icon="folder">
                <drawer-items>
                    <drawer-item text="Inventory" icon="list-unordered" selected="true"></drawer-item>
                    <drawer-item text="Orders" icon="cart"></drawer-item>
                </drawer-items>
            </drawer-item>
            <drawer-item separator="true"></drawer-item>
            <drawer-item text="Customers" icon="user"></drawer-item>
            <drawer-item text="Reports" icon="chart-bar"></drawer-item>
        </drawer-items>
    </kendo-drawer>
```
{% endif %}

## See Also

* [Items of the Drawer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/drawer/index)
* [Templates of the Drawer HtmlHelper for {{ site.framework }}]({% slug templates_drawer_aspnetcore %})
* [Hierarchy of the Drawer HtmlHelper for {{ site.framework }}]({% slug hierarchy_drawer_aspnetcore %})
* [Server-Side API of the Drawer](/api/drawer)
