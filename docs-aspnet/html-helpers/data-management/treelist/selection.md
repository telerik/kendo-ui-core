---
title: Selection
page_title: Selection
description: "Get started with the Telerik UI TreeList component for {{ site.framework }} and learn how to configure its select functionality."
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

> As of the 2022 R3 release, the [`Change`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/TreeListEventBuilder#changesystemstring) event will now be fired only when Selection/Deselection is performed.

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

In order to select or deselect all of the child items of the currently selected row, enable the `includeChildren` option:

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


> The TreeList does not support the simultaneous usage of the built-in checkbox-column selection and the selection which is enabled through the `Selectable` option.

## See Also

[Selection of the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/checkbox-selection)
* [Server-Side API](/api/selection)