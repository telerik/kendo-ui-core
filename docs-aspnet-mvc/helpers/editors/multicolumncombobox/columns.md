---
title: Columns
page_title: Columns | Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET MVC
description: "Set the column width and other settings in the  MultiColumnComboBox HtmlHelper for ASP.NET MVC."
slug: columns_multicolumncombobox_aspnetmvc
position: 3
---

# Columns

The MultiColumnComboBox allows you to predefine the columns that will be rendered in its drop-down list through the `dropDownWidth` option.

## Getting Started

You can set which field from the `dataItem` will be populated by defining a title, template, `headerTemplate`, and width.

```
    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .Columns(columns =>
        {
            columns.Add().Field("ContactName").Title("Contact Name").Width("200px")
            columns.Add().Field("ContactTitle").Title("Contact Title").Width("200px");
            columns.Add().Field("CompanyName").Title("Company Name").Width("200px");
            columns.Add().Field("Country").Title("Country").Width("200px");
        })
        .DataSource(source => source
            .Read(read => read.Action("Products_Read", "MultiColumnComboBox"))
            .ServerFiltering(true)
        )
    )
```

## Setting Column Widths

The MultiColumnComboBox allows you to set the width of the drop-down through its [`dropDownWidth`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox/configuration/dropdownwidth) option. The columns also allow you to [set their `columns.width`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox/configuration/columns.width).

> * If the widths of all columns are defined in pixels through their `width` option, the `dropDownWidth` value (if set) is overridden.
> * In all other cases when the widths of all columns are not set, the `dropDownWidth` value is applied to the element.

## See Also

* [MultiColumnComboBoxBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiColumnComboBoxBuilder)
* [MultiColumnComboBox Server-Side API](/api/multicolumncombobox)
