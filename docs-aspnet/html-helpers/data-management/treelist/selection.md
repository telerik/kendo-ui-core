---
title: Selection
page_title: Selection
description: "Get started with the Telerik UI TreeList HtmlHelper for {{ site.framework }} and learn how to configure its select functionality."
slug: htmlhelpers_treelist_selection
position: 7
---

# Selection

By default, selection in the TreeList is disabled.

> To boost the performance of the TreeList when it is rendering a huge number of items and selection is enabled, use paging and a reasonable page size.

The Kendo UI Treelist exposes different modes of row selection:

* [Row Selection](#row-selection)
* [Row Checkbox Selection](#single-row-checkbox-selection)

## Row Selection

To enable the selection functionality of the TreeList, set the `Selectable` option to `true`. As a result, the default single-row selection functionality will be applied.

```
    .Selectable(true)
```

## Single Row Checkbox Selection

To enable checkbox selection, add a column to the `columns` collection of the TreeList and set the `Selectable` option to `true`:
 
```
    columns.Add().Selectable(true);
```
In order to select or deselect all of the child items of the currently selected row, enable the `includeChildren` option:

```
    columns.Add().Selectable(true).IncludeChildren();
```

> The TreeList does not support the simultaneous usage of the built-in checkbox-column selection and the selection which is enabled through the `Selectable` option.

## See Also

[Selection of the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/checkbox-selection)
* [Server-Side API](/api/selection)