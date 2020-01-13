---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ListBox TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_listbox_aspnetcore
previous_url: /helpers/tag-helpers/listbox
position: 1
---

# ListBox TagHelper Overview

The Telerik UI ListBox TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI ListBox widget.

The ListBox provides suggestions depending on the typed text and allows multiple value entries. displays a list of data that is contained in a box and allows single or multiple selection, reordering of selected items, and deleting items and features keyboard navigation as well as the dragging and dropping of items. You can also connect the ListBox with another list-box and customize the widget with the use of templates, toolbar positioning, placeholder and hint, and localization of its command buttons messages.

* [Demo page for the ListBox](https://demos.telerik.com/aspnet-core/listbox/tag-helper)

## Initializing the ListBox

The following example demonstrates how to define the ListBox by using the ListBox TagHelper.

```tagHelper

        <kendo-listbox name="optional" connect-with="selected" bind-to="ViewBag.Attendees">
            <toolbar position="ListBoxToolbarPosition.Right"
                     tools='new string[] {moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"}' />
        </kendo-listbox>

        <kendo-listbox name="selected" selectable="ListBoxSelectable.Multiple" bind-to="new List<string>()">
        </kendo-listbox>

```
```cshtml

        @(Html.Kendo().ListBox().Name("optional")
                .ConnectWith("selected")
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
                .BindTo(ViewBag.Attendees)
        )

        @(Html.Kendo().ListBox().Name("selected")
            .Selectable(ListBoxSelectable.Multiple)
            .BindTo(new List<string>())
        )
```

## Functionality and Features

* [Data binding]({% slug databinding_listbox_aspnetcore %})
* [Selection]({% slug selection_listbox_aspnetcore %})
* [Dragging and dropping]({% slug dragdrops_listbox_aspnetcore %})

## See Also

* [Basic Usage of the ListBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listbox/tag-helper)
* [Server-Side API](/api/listbox)
