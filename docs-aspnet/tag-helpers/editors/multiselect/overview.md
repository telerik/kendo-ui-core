---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI MultiSelect TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/multiselect, /helpers/tag-helpers/multiselect
slug: taghelpers_multiselect_aspnetcore
position: 1
---

# MultiSelect TagHelper Overview

The Telerik UI MultiSelect TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI MultiSelect widget.

The MultiSelect displays a list of options and allows multiple selections from this list. The widget represents a richer version of the `<select>` element and provides support for local and remote data binding, item and tag templates, and configurable options for controlling the list behavior.

* [Demo page for the MultiSelect](https://demos.telerik.com/aspnet-core/multiselect/tag-helper)

## Initializing the MultiSelect

The following example demonstrates how to define the MultiSelect by using the MultiSelect TagHelper.

      <kendo-multiselect name="products" filter="FilterType.StartsWith"></kendo-multiselect>

## Basic Configuration

The MultiSelect TagHelper configuration options are passed as attributes of the tag.

```cshtml

    @(Html.Kendo().MultiSelect()
          .Name("products")
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .HtmlAttributes(new { style = "width:100%;" })
          .Filter(FilterType.Contains)
          .DataSource(source => source
              .Read(read => read.Action("GetProducts", "Home"))
          )
    )
```
```tagHelper

    <kendo-multiselect name="products" filter="FilterType.Contains"
                       placeholder="Select product"
                       datatextfield="ProductName"
                       datavaluefield="ProductID"
                       style="width: 100%;">
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("GetProducts", "Home")" />
            </transport>
        </datasource>
    </kendo-multiselect>
```

## See Also

* [Basic Usage of the MultiSelect TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multiselect/tag-helper)
* [Server-Side API](/api/multiselect)
