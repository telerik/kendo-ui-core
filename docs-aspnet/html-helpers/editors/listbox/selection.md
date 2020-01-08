---
title: Selection
page_title: Selection
description: "Get started with the {{ site.product }} ListBox and learn how enable the selection functionality."
previous_url: /helpers/editors/listbox/selection
slug: htmlhelpers_listbox_selection_aspnetcore
position: 5
---

# Selection

By default, the ListBox is set into a single-selection mode.

## Enabling Multiple Selection

To enable the multiple-selection mode of the ListBox, add `ListBoxSelectable.Multiple` to its settings. When selected, multiple selected items move together, that is, the selected items are transferred to another Telerik UI ListBox together or reordered as a set among other items.

```
    @(Html.Kendo().ListBox()
        .Name("optional")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .DataSource(source => source
            .Read(read => read.Action("GetCustomers", "ListBox"))
        )
        .TemplateId("customer-item-template")
        .Draggable(draggable => draggable.Placeholder("customPlaceholder"))
        .DropSources("selected")
        .ConnectWith("selected")
        .Selectable(ListBoxSelectable.Single) // Enable single selection
        .Toolbar(toolbar =>
        {
            toolbar.Position(ListBoxToolbarPosition.Right);
            toolbar.Tools(tools => tools
                .TransferTo()
                .Remove());
        })
        .BindTo(new List<CustomerViewModel>())
    )

    @(Html.Kendo().ListBox()
        .Name("selected")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .TemplateId("customer-item-template")
        .Draggable(draggable => draggable.Placeholder("customPlaceholder"))
        .DropSources("optional")
        .ConnectWith("optional")
        .Selectable(ListBoxSelectable.Multiple) // Enable multi selection
        .BindTo(new List<CustomerViewModel>())
    )
```

## Reordering of Selections

The ListBox allows you to reorder the selected items by using any of the following approaches:

* The `moveUp` and `moveDown` command buttons of the toolbar.
* The drag-and-drop functionality if the ListBox is `draggable`.
* The `Ctrl`+`Shift`+ <kbd>&darr;</kbd> or `Ctrl`+`Shift`+ <kbd>&uarr;</kbd> keyboard combinations.

> Currently, the ListBox does not support the drag-and-drop feature for multiple selected items.

## See Also

* [Server-Side API](/api/listbox)
