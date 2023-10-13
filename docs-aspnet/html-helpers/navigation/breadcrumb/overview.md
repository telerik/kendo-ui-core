---
title: Overview
page_title: Overview
description: "Discover the Telerik UI Breadcrumb component for {{ site.framework }} that provides features like icons, path editing, and numerous built-in configuration options"
slug: htmlhelpers_breadcrumb_aspnetcore_overview
position: 0
---

# {{ site.framework }} Breadcrumb Overview

{% if site.core %}
The Telerik UI Breadcrumb TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Breadcrumb widget.
{% else %}
The Telerik UI Breadcrumb HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Breadcrumb widget.
{% endif %}

The Breadcrumb is an intuitive UI component that allows navigation within a folder structure or web page. It helps the user to understand the hierarchy and provides an easy way to go back one or several steps.

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

* [Icons]({% slug htmlhelpers_breadcrumb_aspnetcore_icons %})&mdash;You can configure the icons of the items and the delimiter that separates them.
* [Items]({% slug htmlhelpers_breadcrumb_aspnetcore_items %})&mdash;The `items` configuration allows you to take full control over the Breadcrumb items by setting their icons, text content, and other attributes.
* [Editing]({% slug htmlhelpers_breadcrumb_aspnetcore_editing %})&mdash;You can allow the users to edit the paths that the Breadcrumb sets.
* [Navigation]({% slug htmlhelpers_breadcrumb_aspnetcore_navigation %})&mdash;By using the `Navigational` configuration, you can enable automatic navigation.
* [Accessibility]({% slug accessibility_aspnetcore_breadcrumb %})&mdash;The Breadcrumb is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

## Next Steps

* [Getting Started with the Breadcrumb]({% slug breadcrumb_getting_started %})
* [Basic Usage of the Breadcrumb HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/breadcrumb/index)
{% if site.core %}
* [Basic Usage of the Breadcrumb Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/breadcrumb/tag-helper)
{% endif %}

## See Also

* [Using the API of the Breadcrumb for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/breadcrumb/api)
* [Knowledge Base Section](/knowledge-base)
