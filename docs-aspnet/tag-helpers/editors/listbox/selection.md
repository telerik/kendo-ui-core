---
title: Selection
page_title: Selection
description: "Enable the signle or multiple selection mode of the Telerik UI ListBox TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: selection_listbox_aspnetcore
position: 3
---

# Selection

The ListBox provides a single and a multiple selection mode.

By default, the `single` selection mode of the ListBox is enabled. To set the multiple selection mode, add `selectable="ListBoxSelectable.Multiple" `. When the multiple selectino mode is enabled, all selected items move together, that is, the selected items are transferred to another Telerik UI ListBox TagHelper together or reordered as a set among other items.

You can reorder selected items by using any of the following approaches:

* The **Move Up** and **Move Down** command buttons of the toolbar.
* The drag-and-drop functionality if the widget is `draggable`.
* The `Ctrl`+`Shift`+ <kbd>&darr;</kbd> or `Ctrl`+`Shift`+ <kbd>&uarr;</kbd> keyboard combinations.

> Currently, the ListBox does not support the drag-and-drop feature for multiple selected items.

```tagHelper

    <kendo-listbox name="listbox" datatextfield="ProductName" datavaluefield="ProductID">
        <datasource>
            <transport>
                <read datatype="jsonp" url="https://demos.telerik.com/kendo-ui/service/Products" />
            </transport>
        </datasource>
        <toolbar position="ListBoxToolbarPosition.Right"
                    tools='new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"}' />
    </kendo-listbox>
```
```cshtml

        @(Html.Kendo().ListBox().Name("listbox")
                    .DataTextField("ProductName")
                    .Selectable(ListBoxSelectable.Multiple)
                    .DataValueField("ProductID")
                    .Toolbar(x => x.Position(ListBoxToolbarPosition.Right)
                        .Tools(y =>
                        {
                            y.MoveUp();
                            y.MoveDown();
                            y.TransferTo();
                            y.TransferFrom();
                            y.TransferAllTo();
                            y.TransferAllFrom();
                            y.Remove();

                        }))
                    .DataSource(x=>
                        x.Custom()
                        .Transport(y=> y.Read(z=> z.Url("https://demos.telerik.com/kendo-ui/service/Products").DataType("jsonp"))))
            )
```

## See Also

* [Basic Usage of the ListBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listbox/tag-helper)
* [Server-Side API](/api/listbox)
