---
title: Columns
page_title: Columns
description: "Set the column width and other settings in the  MultiColumnComboBox HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/multicolumncombobox/columns
slug: columns_multicolumncombobox_aspnetcore
position: 3
---

# Columns

The MultiColumnComboBox allows you to predefine the columns that will be rendered in its drop-down list through the `dropDownWidth` option.

The columns also allow you to [set their `columns.width`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox/configuration/columns.width).

> * If the widths of all columns are defined in pixels through their `width` option, the `dropDownWidth` value (if set) is overridden.
> * In all other cases when the widths of all columns are not set, the `dropDownWidth` value is applied to the element.

You can also define which `dataItem` field will be populated and also set a title, a template, and a `headerTemplate`.

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

## See Also

* [Server-Side API](/api/multicolumncombobox)
