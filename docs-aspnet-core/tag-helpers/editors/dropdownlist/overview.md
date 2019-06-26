---
title: Overview
page_title: DropDownList Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI DropDownList tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/dropdownlist, /aspnet-core/helpers/tag-helpers/dropdownlist
slug: taghelpers_dropdownlist_aspnetcore
position: 1
---

# DropDownList Tag Helper Overview

The [DropDownList](http://docs.telerik.com/kendo-ui/controls/editors/dropdownlist/overview) displays a list of values and allows for a single selection from the list.

The user input is restricted within the predefined options.

The DropDownList tag helper extension is a server-side wrapper for the [Kendo UI DropDownList](http://demos.telerik.com/kendo-ui/dropdownlist/index) widget and enables you to configure the Kendo UI DropDownList widget in ASP.NET Core applications.

## Initializing the DropDownList

The following example demonstrates how to define the DropDownList by using the DropDownList tag helper.

        <kendo-dropdownlist name="products" filter="FilterType.StartsWith"></kendo-dropdownlist>

## Basic Configuration

The DropDownList tag helper configuration options are passed as attributes of the tag.

```cshtml

    @(Html.Kendo().DropDownList()
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

    <kendo-dropdownlist name="products" filter="FilterType.Contains"
                        placeholder="Select product"
                        datatextfield="ProductName"
                        datavaluefield="ProductID"
                        style="width: 100%;">
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("GetProducts", "Home")" />
            </transport>
        </datasource>
    </kendo-dropdownlist>
```

## See Also

* [Basic Usage of the DropDownList Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/dropdownlist/tag-helper)
* [JavaScript API Reference of the DropDownList](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
