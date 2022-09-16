---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Breadcrumb component for {{ site.framework }}."
slug: htmlhelpers_breadcrumb_aspnetcore_overview
position: 1
---

# Breadcrumb Overview

{% if site.core %}
The Telerik UI Breadcrumb TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Breadcrumb widget.
{% else %}
The Telerik UI Breadcrumb HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Breadcrumb widget.
{% endif %}

The Breadcrumb is an intuitive UI component that allows navigation within a folder structure or web page. It provides an easy way to navigate backwards by one or multiple steps.

* [Demo page for the Breadcrumb HtmlHelper](https://demos.telerik.com/{{ site.platform }}/breadcrumb/index)
{% if site.core %}
* [Demo page for the Breadcrumb TagHelper](https://demos.telerik.com/aspnet-core/breadcrumb/tag-helper)
{% endif %}

## Initializing the Breadcrumb

The following example demonstrates how to define the Breadcrumb.

```HtmlHelper
    @(Html.Kendo().Breadcrumb()
        .Name("breadcrumb")
    )
```
{% if site.core %}
```TagHelper
    <kendo-breadcrumb name="breadcrumb"></kendo-breadcrumb>
```
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration for the Breadcrumb.

```HtmlHelper
    @(Html.Kendo().Breadcrumb()
        .Name("breadcrumb")
        .Items(items =>
        {
            items.Add()
                .Type(BreadcrumbItemType.RootItem)
                .Href("https://demos.telerik.com/kendo-ui/")
                .Text("All Components")
                .Icon("home")
                .ShowIcon(true);
            items.Add()
                .Type(BreadcrumbItemType.Item)
                .Href("/breadcrumb")
                .Text("Breadcrumb")
                .ShowText(true);
            items.Add()
                .Type(BreadcrumbItemType.Item)
                .Href("/index")
                .Text("Basic Usage")
                .ShowText(true);
        })
    )

    <script>
    $(function() {
        // The Name() of the Breadcrumb is used to get its client-side instance.
        var breadcrumb = $("#breadcrumb").data("kendoBreadcrumb");
    });
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-breadcrumb name="breadcrumb">
        <kendo-breadcrumb-items>
            <kendo-breadcrumb-item type="BreadcrumbItemType.RootItem" text="All Components" href="https://demos.telerik.com/kendo-ui/" show-text="true" icon="home" show-icon="true"></kendo-breadcrumb-items>
            <kendo-breadcrumb-item type="BreadcrumbItemType.Item" text="Breadcrumb" href="/breadcrumb"></kendo-breadcrumb-item>
            <kendo-breadcrumb-item type="BreadcrumbItemType.Item" text="Tag Helper" href="/tag-helper"></kendo-breadcrumb-item>
        </kendo-breadcrumb-items>
    </kendo-breadcrumb>
```
{% endif %}

## Functionality and Features

* [Icons]({% slug htmlhelpers_breadcrumb_aspnetcore_icons %})
* [Items]({% slug htmlhelpers_breadcrumb_aspnetcore_items %})
* [Editing]({% slug htmlhelpers_breadcrumb_aspnetcore_editing %})
* [Navigation]({% slug htmlhelpers_breadcrumb_aspnetcore_navigation %})
* [Accessibility]({% slug accessibility_aspnetcore_breadcrumb %})

{% if site.core %}
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
{% endif %}

## See Also

* [Basic Usage of the Breadcrumb HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/breadcrumb/index)
{% if site.core %}
* [Basic Usage of the Breadcrumb Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/breadcrumb/tag-helper)
{% endif %}
* [Using the API of the Breadcrumb HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/breadcrumb/api)
