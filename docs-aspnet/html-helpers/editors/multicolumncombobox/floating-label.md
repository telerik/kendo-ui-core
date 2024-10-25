---
title: Floating Label
page_title: Floating Label
description: "Learn how to initialize a floating label for the Telerik UI MultiColumnComboBox component for {{ site.framework }}."
slug: htmlhelpers_multicolumncombobox_floatinglabel_aspnetcore
position: 7
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field.

To implement a floating label in the Telerik UI MultiColumnComboBox for {{ site.framework }}, define it either as a string or from a function handler.

The following example demonstrates how to set the floating label as a string:

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("products")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Label(label => {
            label.Content("Select a product...");
            label.Floating(true);
        })
        .Columns(columns =>
        {
            columns.Add().Field("ProductName").Title("Name");
            columns.Add().Field("ProductID").Title("ID");
        })
        .HtmlAttributes(new { style = "width:100%;" })
        .Filter(FilterType.Contains)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("ServerFiltering_GetProducts", "MultiColumnComboBox");
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-multicolumncombobox name="products"
                               datatextfield="ProductName"
                               datavaluefield="ProductID"
                               filter="FilterType.Contains" style="width:100%;">
            <label content="Select a product..." floating="true" />
            <multicolumncombobox-columns>
                <column field="ProductName" title="Name">
                </column>
                <column field="ProductID" title="ID">
                </column>
            </multicolumncombobox-columns>
            <datasource>
                <transport>
                    <read url="@Url.Action("ServerFiltering_GetProducts", "MultiColumnComboBox")" />
                </transport>
            </datasource>
     </kendo-multicolumncombobox>
```
{% endif %}

The following example demonstrates how to set the floating label from a function handler:

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("products")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Label(label => {
            label.ContentHandler("contentHandler");
            label.Floating(true);
        })
        .Columns(columns =>
        {
            columns.Add().Field("ProductName").Title("Name");
            columns.Add().Field("ProductID").Title("ID");
        })
        .HtmlAttributes(new { style = "width:100%;" })
        .Filter(FilterType.Contains)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("ServerFiltering_GetProducts", "MultiColumnComboBox");
            });
        })
    )

    <script>
        function contentHandler(){
            return "Select a product...";
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-multicolumncombobox name="products"
                               datatextfield="ProductName"
                               datavaluefield="ProductID"
                               filter="FilterType.Contains" style="width:100%;">
            <label content-handler="contentHandler" floating="true" />
            <multicolumncombobox-columns>
                <column field="ProductName" title="Name">
                </column>
                <column field="ProductID" title="ID">
                </column>
            </multicolumncombobox-columns>
            <datasource>
                <transport>
                    <read url="@Url.Action("ServerFiltering_GetProducts", "MultiColumnComboBox")" />
                </transport>
            </datasource>
    </kendo-multicolumncombobox>

    <script>
        function contentHandler(){
            return "Select a product...";
        }
    </script>
```
{% endif %}

## See Also

* [MultiColumnComboBox Floating Label (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/floating-label)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/multicolumncombobox)