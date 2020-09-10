---
title: Selection
page_title: Selection
description: "Get started with the Kendo UI TreeList for jQuery and learn how to configure its select functionality."
slug: selection_kendoui_treelist
position: 7
---

# Selection

By default, selection in the TreeList is disabled.

> To boost the performance of the TreeList when it is rendering a huge number of items and selection is enabled, use paging and a reasonable page size.

The Kendo UI Treelist exposes different modes of row selection:

* [Row Selection](#row-selection)
* [Row Checkbox Selection](#single-row-checkbox-selection)

## Row Selection

To enable the selection functionality of the TreeList, set the `selectable` option to `true`. As a result, the default single-row selection functionality will be applied.

```
    selectable: true,
```

## Single Row Checkbox Selection

To enable checkbox selection, add a column to the `columns` collection of the TreeList and set the `selectable` option to `true`:
 
```
    <script>
        $("#treelist").kendoTreeList({
            columns: [
                { selectable: true },
            // ...
            ]
        });
    </script>
```
In order to select or deselect all of the child items of the currently selected row, enable the `includeChildren` option:

```
    <script>
        $("#treelist").kendoTreeList({
            columns: [
                { selectable: true, includeChildren: true },
            //  ...
            ]
        });
	</script>
```

> The TreeList does not support the simultaneous usage of the built-in checkbox-column selection and the selection which is enabled through the selectable option.

## See Also

[Selection of the Kendo UI TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/checkbox-selection)
* [TreeList JavaScript API Reference](/api/selection)