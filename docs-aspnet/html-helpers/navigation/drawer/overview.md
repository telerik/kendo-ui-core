---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Drawer component for {{ site.framework }}."
previous_url: /helpers/navigation/drawer/overview
slug: htmlhelpers_drawer_aspnetcore
position: 1
---

# Drawer Overview

{% if site.core %}
The Telerik UI Drawer TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Drawer widget.
{% else %}
The Telerik UI Drawer HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Drawer widget.
{% endif %}

The Drawer is a dismissible panel used for navigation in responsive web applications or for changing a content of a section in the page.

* [Demo page for the Drawer HtmlHelper](https://demos.telerik.com/{{ site.platform }}/drawer/index)
{% if site.core %}
* [Demo page for the Drawer TagHelper](https://demos.telerik.com/aspnet-core/drawer/index)
{% endif %}

## Initializing the Drawer

The following example demonstrates how to define the Drawer.

```HtmlHelper
    @(Html.Kendo().Drawer()
        .Name("drawer")
        .Template(@"<ul>
                <li data-role='drawer-item'>First Item</li>
                <li data-role='drawer-separator'></li>
                <li data-role='drawer-item'>Second Item</li>
                <li data-role='drawer-item' class='k-selected'>Third Item</li>
            </ul>")
        .Mode("push")
        .Position("left")
        .SwipeToOpen(true)
        .Content(@"<div style='height: 200px;'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error accusantium odit, optio nulla maiores quo neque fugit debitis dignissimos incidunt maxime?</div>")
    )
```
{% if site.core %}
```TagHelper
    <kendo-drawer name="drawer"
                template-id="template"
                mode="push"
                position="left"
                swipe-to-open="true">
        <content>
            <div style='height: 200px;'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error accusantium odit, optio nulla maiores quo neque fugit debitis dignissimos incidunt maxime?</div>
        </content>
    </kendo-drawer>
```
```Template
    <script id="template" type="text/x-kendo-template">
        <ul>
            <li data-role='drawer-item'>First Item</li>
            <li data-role='drawer-separator'></li>
            <li data-role='drawer-item'>Second Item</li>
            <li data-role='drawer-item' class='k-selected'>Third Item</li>
        </ul>
```
{% endif %}

## Functionality and Features

* [Display modes]({% slug displaymodes_drawer_aspnetcore %})
* [Interaction modes]({% slug interactionmodes_drawer_aspnetcore %})
* [Templates]({% slug templates_drawer_aspnetcore %})
* [Hierarchy]({% slug hierarchy_drawer_aspnetcore %})

## Referencing Existing Instances

The following example demonstrates how to get the Drawer instance.

```HtmlHelper
    @(Html.Kendo().Drawer()
        .Name("drawer")
        .Template(@"<ul>
                <li data-role='drawer-item'>First Item</li>
                <li data-role='drawer-separator'></li>
                <li data-role='drawer-item'>Second Item</li>
            </ul>")
        .Content(@"<div style='height: 200px;'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error accusantium odit, optio nulla maiores quo neque fugit debitis dignissimos incidunt maxime?</div>")
    )

    <script type="text/javascript">
        $(function () {
            // The Name() of the Drawer is used to get its client-side instance.
            var drawer = $("#drawer").data("kendoDrawer");
            console.log(drawer);
        });
    </script>
```
{% if site.core %}
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
{% endif %}

## See Also

* [Basic Usage of the Drawer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/drawer)
{% if site.core %}
* [Basic Usage of the Drawer Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/drawer/index)
{% endif %}
* [Using the API of the Drawer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/drawer/api)
* [Server-Side API](/api/drawer)
