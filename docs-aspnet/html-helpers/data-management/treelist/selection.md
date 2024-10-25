---
title: Selection
page_title: Selection
description: "Get started with the Telerik UI TreeList component for {{ site.framework }} and learn how to configure its select functionality."
slug: htmlhelpers_treelist_selection
position: 7
---

# Selection

By default, selection in the TreeList is disabled.

> To boost the performance of the TreeList when it loads a large dataset and the selection functionality is enabled, use paging and a reasonable page size.

The TreeList exposes different modes of row selection:

* [Row Selection](#row-selection)
* [Cell Selection](#cell-selection)
* [Row Checkbox Selection](#single-row-checkbox-selection)

## Row Selection

To enable the selection functionality of the TreeList, set the `Selectable` option to `true`. As a result, the default single-row selection functionality will be applied.

```HtmlHelper
    .Selectable(true)
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist" selectable="true">
        ...
    </kendo-treelist>
```
{% endif %}

To enable the multiple row selection, set the `Mode` option of the `Selectable` configuration to the `enum` value `Multiple`:

```HtmlHelper
     .Selectable(s => s.Mode(TreeListSelectionMode.Multiple))
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist" selectable="multiple">
        ...
    </kendo-treelist>
```
{% endif %}

> As of the 2022 R3 release, the [`Change`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/treelisteventbuilder#changesystemstring) event will now be fired only when Selection/Deselection is performed.

## Cell Selection

The TreeList component allows you to select a single or multiple cells at a time through the `Selectable()` and `Type()` methods.

```HtmlHelper
     .Selectable(s => s.Mode(TreeListSelectionMode.Multiple).Type(TreeListSelectionType.Cell))
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist" selectable="multiple,cell">
        ...
    </kendo-treelist>
```
{% endif %}

## Single Row Checkbox Selection

To enable checkbox selection, add a column to the `columns` collection of the TreeList and set the `Selectable` option to `true`:
 
```HtmlHelper
    columns.Add().Selectable(true);
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist">
        <columns>
            <treelist-column selectable="true" width="65px"></treelist-column>
            ...
        </columns>
        ...
    </kendo-treelist>
```
{% endif %}

> The TreeList does not support the simultaneous usage of the built-in checkbox-column selection and the selection which is enabled through the `Selectable` option.

To get the currently selected items, you can use the [TreeList client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist#methods). The following example demonstrates how to access and store the data items of the selected TreeList items.

 1. Call the [`select()` client-side API method](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/methods/select).  The method will return an array with the elements of the selected items.
 1. Loop through the selected items and call the [dataItem()](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/methods/dataitem) method for each element to access the data item.

```Script
    var treeListWidget = $("#treeList").data("kendoTreeList"); // Get a reference to the defined TreeList component.
    var selectedItemsElements = treeListWidget.select();
    var selectedDataItems = [];
    $.each(selectedItemsElements, function(){
        let dataItem = treeListWidget.dataItem($(this)); // Access the data item.
        selectedDataItems.push(dataItem); //Store the data item in an array.
    });
    console.log(selectedDataItems);
```

To select or deselect all child items of the currently selected row, enable the `IncludeChildren()` option:

```HtmlHelper
    columns.Add().Selectable(true).IncludeChildren();
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist">
        <columns>
            <treelist-column selectable="true" width="65px" include-children="true"></treelist-column>
            ...
        </columns>
        ...
    </kendo-treelist>
```
{% endif %}

In some scenarios, the specified TreeList rows must be selected by default. The following example demonstrates how to initially select rows based in the value of a data item property.

```HtmlHelper
    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
    .Name("treelist")
    .Columns(columns =>
    {
        columns.Add().Selectable(true);
        columns.Add().Field(e => e.EmployeeId);
    })
    .Events(evt => evt.DataBound("onDataBound"))
    ...
    )

    <script>
        function onDataBound(e) {
            var treeList = e.sender;
            var items = treeList.items();
            for (var i = 0; i < items.length; i++) {
                var dataItem = treeList.dataItem(items[i]);
                if(dataItem.EmployeeId % 2 == 0) {
                    treeList.select($(items[i]));
                }
            }
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist" on-data-bound="onDataBound">
        <columns>
            <treelist-column selectable="true"></treelist-column>
            <treelist-column field="EmployeeId"></treelist-column>
        </columns>
        <!-- Other configuration-->
    </kendo-treelist>

    <script>
        function onDataBound(e) {
            var treeList = e.sender;
            var items = treeList.items();
            for (var i = 0; i < items.length; i++) {
                var dataItem = treeList.dataItem(items[i]);
                if(dataItem.EmployeeId % 2 == 0) {
                    treeList.select($(items[i]));
                }
            }
        }
    </script>
```
{% endif %}


## See Also

* [Selection of the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/checkbox-selection)
* [Server-Side API](/api/selection)