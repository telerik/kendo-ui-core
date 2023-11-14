---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode of the the Telerik UI MultiColumnComboBox component for {{ site.framework }}."
slug: htmlhelpers_multicolumncombobox_adaptive_mode_aspnetcore
position: 5
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} MultiColumnComboBox supports an adaptive mode that provides a mobile-friendly rendering of its popup. Which will accommodate its content based on the current screen size.

To set the adaptive mode, use the `AdaptiveMode()` option.

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("products")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .AdaptiveMode(AdaptiveMode.Auto)
        .Columns(columns =>
        {
            columns.Add().Field("ProductName").Title("Name");
            columns.Add().Field("ProductID").Title("ID");
        })
        .HtmlAttributes(new { style = "width:100%;" })
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("AdaptiveMode_GetProducts", "MultiColumnComboBox");
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-multicolumncombobox name="products"
                            datatextfield="ProductName"
                            datavaluefield="ProductID"
                            adaptive-mode="AdaptiveMode.Auto"
                            style="width:100%;">
        <multicolumncombobox-columns>
            <column field="ProductName" title="Name">
            </column>
            <column field="ProductID" title="ID">
            </column>
        </multicolumncombobox-columns>
        <datasource>
            <transport>
                <read url="@Url.Action("AdaptiveMode_GetProducts", "MultiColumnComboBox")" />
            </transport>
        </datasource>
    </kendo-multicolumncombobox>
```
{% endif %}

## See Also

* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/combobox)