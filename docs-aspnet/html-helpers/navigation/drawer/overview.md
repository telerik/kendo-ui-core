---
title: Overview
page_title: Overview
description: "Discover the Telerik UI Drawer component for {{ site.framework }} that provides various display and interaction modes, item templates, and support for hierarchical structures."
previous_url: /helpers/navigation/drawer/overview
slug: htmlhelpers_drawer_aspnetcore
position: 0
---

# Drawer Overview

{% if site.core %}
The Telerik UI Drawer TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Drawer widget.
{% else %}
The Telerik UI Drawer HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Drawer widget.
{% endif %}

The Drawer is a dismissible panel used for navigation in responsive web applications or changing the content of a section on a specific page.

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

* [Display modes]({% slug displaymodes_drawer_aspnetcore %})&mdash;The component provides three display modes that allow you to control how the Drawer is displayed on the screen.
* [Interaction modes]({% slug interactionmodes_drawer_aspnetcore %})&mdash;The Drawer supports the `overlay` and `push` interaction modes, and you can determine if it will be rendered on left or right side.
* [Templates]({% slug templates_drawer_aspnetcore %})&mdash;With the built-in item templates, you control how the Drawer items are rendered.
* [Hierarchy]({% slug hierarchy_drawer_aspnetcore %})&mdash;The Drawer allows you to display hierarchically organized items.
* [Events]({% slug events_drawer %})&mdash;The Drawer allows you to handle its events and implement custom functionality.

## Next Steps

* [Getting Started with the Drawer]({% slug drawer_getting_started %})
* [Basic Usage of the Drawer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/drawer/index)
{% if site.core %}
* [Basic Usage of the Drawer TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/drawer/tag-helper)
{% endif %}

## See Also

* [Using the API of the Drawer for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/drawer/api)
* [Knowledge Base Section](/knowledge-base)
