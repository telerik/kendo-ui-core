---
title: Columns
page_title: Columns
description: "Set the column width and other settings in the  MultiColumnComboBox component for {{ site.framework }}."
previous_url: /helpers/editors/multicolumncombobox/columns
slug: columns_multicolumncombobox_aspnetcore
position: 4
---

# Columns

The MultiColumnComboBox allows you to predefine the columns that will be rendered in its drop-down list through the `dropDownWidth` option.

The columns also allow you to [set their `columns.width`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox/configuration/columns.width).

> * If the widths of all columns are defined in pixels through their `width` option, the `dropDownWidth` value (if set) is overridden.
> * In all other cases when the widths of all columns are not set, the `dropDownWidth` value is applied to the element.

You can also define which `dataItem` field will be populated and also set a title, a template, and a `headerTemplate`.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-multicolumncombobox  name="multicolumncombobox">
        <multicolumncombobox-columns>
            <column field="ContactName" title="Contact Name" width="200px">
            </column>
            <column field="ContactTitle" title="Contact Title" width="200px">
            </column>
            <column field="CompanyName" title="Company Name" width="200px">
            </column>
            <column field="Country" title="Country" width="200px">
            </column>
        </multicolumncombobox-columns>
        <datasource server-filtering="true">
            <transport>
                <read url="@Url.Action("Products_Read", "MultiColumnComboBox")" />
            </transport>
        </datasource>
    </kendo-multicolumncombobox>
```
{% endif %}

## See Also

* [Server-Side API](/api/multicolumncombobox)
