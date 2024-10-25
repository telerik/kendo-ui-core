---
title: Columns
page_title: Columns
description: "Get started with the Telerik UI for {{ site.framework }} PropertyGrid and learn how to configure its columns."
slug: htmlhelpers_columns_propertygrid
position: 2
---

# Columns

Each PropertyGrid item has a field and value options that are displayed in columns. 

## Column Settings

You can control the width of the columns through the `FieldColumn()` and `ValueColumn()` configurations. 

```HtmlHelper
    @(Html.Kendo().PropertyGrid<PropertyViewModel>()
        .Name("propertyGrid")
        .Columns(columns => 
        {
            columns.FieldColumn(fieldCol => fieldCol.Width(200));
            columns.ValueColumn(valueCol => valueCol.Width(250));
        })
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-propertygrid name="propertyGrid">
        <columns>
            <field-column width="200" />
            <value-column width="250" />
        </columns>
        <!-- Additional configuration -->
    </kendo-propertygrid>

```
{% endif %}

When both columns have widths (the numeric values are treated as pixels) and their sum exceeds the width of the PropertyGrid, a horizontal scrollbar appears. 
The example below shows how to enable the PropetyGrid horizontal scrollbar.

```HtmlHelper
    @(Html.Kendo().PropertyGrid<PropertyViewModel>()
        .Name("propertyGrid")
        .Width(300)
        .Columns(columns => 
        {
            columns.FieldColumn(fieldCol => fieldCol.Width(200));
            columns.ValueColumn(valueCol => valueCol.Width(250));
        })
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-propertygrid name="propertyGrid" width="300">
        <columns>
            <field-column width="200" />
            <value-column width="250" />
        </columns>
        <!-- Additional configuration -->
    </kendo-propertygrid>

```
{% endif %}

When all columns have widths and their sum is less than the width of the PropertyGrid (either the width set through the `Width()` option or the width of its container), the column widths are ignored and the browser expands the columns.

```HtmlHelper
    @(Html.Kendo().PropertyGrid<PropertyViewModel>()
        .Name("propertyGrid")
        .Width(700)
        .Columns(columns => 
        {
            columns.FieldColumn(fieldCol => fieldCol.Width(200));
            columns.ValueColumn(valueCol => valueCol.Width(250));
        })
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-propertygrid name="propertyGrid" width="700">
        <columns>
            <field-column width="200" />
            <value-column width="250" />
        </columns>
        <!-- Additional configuration -->
    </kendo-propertygrid>

```
{% endif %}

## Column Resizing

The PropertyGrid supports column resizing. To allow the user to resize the columns through the component context menu, set up the following options:

* Enable the `Resizable()` option.
* Enable the `ContextMenu()` option.

Right-click on a specified table cell of the PropertyGrid to open the context menu, then select the **Resize Column** option to open the resize column menu dialog.

```HtmlHelper
    @(Html.Kendo().PropertyGrid<PropertyViewModel>()
        .Name("propertyGrid")
        .Width(300)
        .Resizable(true)
        .ContextMenu(true)
        .Columns(columns => 
        {
            columns.FieldColumn(fieldCol => fieldCol.Width(200));
            columns.ValueColumn(valueCol => valueCol.Width(250));
        })
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-propertygrid name="propertyGrid" width="300" resizable="true">
        <context-menu enabled="true"></context-menu>
        <columns>
            <field-column width="200" />
            <value-column width="250" />
        </columns>
        <!-- Additional configuration -->
    </kendo-propertygrid>

```
{% endif %}

## See Also

* [Server-Side API of the PropertyGrid HtmlHelper](/api/propertygrid)
{% if site.core %}
* [Server-Side API of the PropertyGrid TagHelper](/api/taghelpers/propertygrid)
{% endif %}
* [Client-Side API of the PropertyGrid](https://docs.telerik.com/kendo-ui/api/javascript/ui/propertygrid)
