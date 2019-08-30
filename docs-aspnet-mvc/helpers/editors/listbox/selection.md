---
title: Selection
page_title: Selection | Telerik UI ListBox HtmlHelper for ASP.NET MVC
description: "Get started with the Telerik UI for ASP.NET MVC ListBox and learn how enable the selection functionality."
slug: selection_listboxhelper_aspnetmvc
position: 5
---

# Selection

By default, the ListBox is set into a single-selection mode.

## Enabling Multiple Selection

To enable the multiple-selection mode of the ListBox, add `selectable: "multiple"` to its settings. When selected, multiple selected items move together, that is, the selected items are transferred to another Telerik UI ListBox together or reordered as a set among other items.

## Reordering of Selections

The ListBox allows you to reorder the selected items by using any of the following approaches:

* The `moveUp` and `moveDown` command buttons of the toolbar.
* The drag-and-drop functionality if the widget is `draggable`.
* The `Ctrl`+`Shift`+ <kbd>&darr;</kbd> or `Ctrl`+`Shift`+ <kbd>&uarr;</kbd> keyboard combination.

> Currently, the ListBox does not support the drag-and-drop feature for multiple selected items.

## See Also

* [Server-Side API](/api/listbox)
