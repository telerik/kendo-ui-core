---
title: Cascading MultiColumnComboBoxes
page_title: Cascading MultiColumnComboBoxes
description: "Learn how to initialize cascading multiColumnComboBoxes for the Telerik UI {{ site.framework }}."
slug: htmlhelpers_multicolumncombobox_cascading
position: 8
---

# Cascading 

The cascading MultiColumnComboBox is a series of two or more MultiColumnComboBoxes in which each MultiColumnComboBox is filtered according to the selected options that are based on the DataValueField in the previous MultiColumnComboBox.

## Basic Configuration

The child MultiColumnComboBox cascades from the parent one if the `CascadeFrom` option is defined. The `CascadeFrom` option has to refer to the parent ID.

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("products")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
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

## Cascading on Custom Parent Input 

To allow custom input in the MultiColumnComboBox, set the `CascadeOnCustomValue` of the parent MultiColumnComboBox in а cascading scenario to `true`. As a result, cascading will be triggered upon custom input in the parent component. When `CascadeOnCustomValue` is set to its default `false` configuration, the child will not cascade and will be disabled upon setting custom input in the parent MultiColumnComboBox. Cascading on custom values works only when `CascadeFromParentField` is not set for the child component or points to the `DataValueField` of the parent.

The following example shows how to implement the cascading functionality of the MultiColumnComboBox based on custom parent input. 

```HtmlHelper
	@(Html.Kendo().MultiColumnComboBox()
             .Name("categories")
             .HtmlAttributes(new { style = "width:100%;" })
             .Placeholder("Select category...")
             .DataTextField("CategoryName")
             .DataValueField("CategoryId")
             .CascadeOnCustomValue(true)
             .Columns(columns =>
             {
                   columns.Add().Field("CategoryName").Title("Name");
                   columns.Add().Field("CategoryId").Title("ID");
             })
             .Filter(FilterType.Contains)
             .DataSource(source =>
             {
                 source.Read(read =>
                 {
                     read.Action("GetCascadeCategories", "MultiColumnComboBox");
                 });
             })
       )
```
{% if site.core %}
```TagHelper
	<kendo-multicolumncombobox datatextfield="CategoryName" datavaluefield="CategoryId" placeholder="Select category..." filter="FilterType.Contains" name="categories" style="width:100%; cascade-on-custom-value=" true"">
        <multicolumncombobox-columns>
            <column field="CategoryName" title="Name">
            </column>
            <column field="CategoryId" title="ID">
            </column>
        </multicolumncombobox-columns>
        <datasource>
            <transport>
                <read url="@Url.Action("GetCascadeCategories", "MultiColumnComboBox")" />
            </transport>
        </datasource>
    </kendo-multicolumncombobox>
```
{% endif %}

## See Also

* [MultiColumnComboBox Cascading MultiColumnComboBoxes (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/cascadingmulticolumncombobox)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/multicolumncombobox)