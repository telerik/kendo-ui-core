---
title: Overview
page_title: MultiColumnComboBox Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI MultiColumnComboBox tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_multicolumncombobox_aspnetcore
position: 1
---

# MultiColumnComboBox Tag Helper Overview

The MultiColumnComboBox visualizes huge sets of data in a grid-like table.

The MultiColumnComboBox tag helper extension is a server-side wrapper for the [Kendo UI MultiColumnComboBox](http://demos.telerik.com/kendo-ui/multicolumncombobox/index) widget and enables you to configure the Kendo UI MultiColumnComboBox widget in ASP.NET Core applications.

## Initializing the MultiColumnComboBox

The following example demonstrates how to define the MultiColumnComboBox by using the MultiColumnComboBox tag helper.

    <kendo-multicolumncombobox name="products" filter="FilterType.StartsWith"></kendo-multicolumncombobox>

## Basic Configuration

The MultiColumnComboBox tag helper configuration options are passed as attributes of the tag.

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

* [Basic Usage of the MultiColumnComboBox Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multicolumncombobox/tag-helper)
* [JavaScript API Reference of the MultiColumnComboBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox)
