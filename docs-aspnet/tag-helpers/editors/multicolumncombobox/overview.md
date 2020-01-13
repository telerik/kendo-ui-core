---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Kendo UI MultiColumnComboBox TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_multicolumncombobox_aspnetcore
position: 1
---

# MultiColumnComboBox TagHelper Overview

The Telerik UI MultiColumnComboBox TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI MultiColumnComboBox widget.

The MultiColumnComboBox visualizes huge sets of data in a grid-like table.

* [Demo page for the MultiColumnComboBox](https://demos.telerik.com/aspnet-core/multicolumncombobox/tag-helper)

## Initializing the MultiColumnComboBox

The following example demonstrates how to define the MultiColumnComboBox by using the MultiColumnComboBox TagHelper.

    <kendo-multicolumncombobox name="products" filter="FilterType.StartsWith"></kendo-multicolumncombobox>

## Basic Configuration

The MultiColumnComboBox TagHelper configuration options are passed as attributes of the tag.

```tagHelper

    <kendo-multicolumnmulticolumncombobox name="products" filter="FilterType.Contains"
                        placeholder="Select product"
                        datatextfield="ProductName"
                        datavaluefield="ProductID"
                        auto-bind="false"
                        min-length="3" style="width: 100%;">
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("GetProducts", "Home")" />
            </transport>
        </datasource>
    </kendo-multicolumnmulticolumncombobox>
```
```cshtml

    @(Html.Kendo().ComboBox()
          .Name("products")
          .Placeholder("Select product")
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .HtmlAttributes(new { style = "width:100%;" })
          .Filter(FilterType.Contains)
          .AutoBind(false)
          .MinLength(3)
          .DataSource(source => source
              .Read(read => read.Action("GetProducts", "Home"))
          )
    )
```

## See Also

* [Basic Usage of the MultiColumnComboBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multicolumncombobox/tag-helper)
* [Server-Side API](/api/multicolumncombobox)
