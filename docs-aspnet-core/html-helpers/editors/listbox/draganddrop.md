---
title: Dragging and Dropping
page_title: Dragging and Dropping | Telerik UI ListBox HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI for ASP.NET Core ListBox and learn how to enable the drag-and-drop functionality."
slug: htmlhelpers_listbox_draganddrop_aspnetcore
position: 4
---

# Dragging and Dropping

To enable the drag-and-drop feature of the ListBox, set its `Draggable` property to `true`.

You can also customize the drag-and-drop appearance of the ListBox by using its `Draggable.Placeholder` and `Draggable.Hint` options.

```
    @(Html.Kendo().ListBox()
        .Name("listbox1")
        .DataValueField("ProductID")
        .DataTextField("ProductName")
        .Draggable(true) // Enable drag and drop
        .DropSources("listbox2") // Specify the drop target
        .Events(ev=>ev
            .Add("function(e){setDiscontinued(e, true)}")
            .Remove("function(e){setDiscontinued(e, false)}"))
        .ConnectWith("listbox2")
        .BindTo(new List<string>())
        .Selectable(ListBoxSelectable.Single)
    )

    @(Html.Kendo().ListBox()
        .Name("listbox2")
        .Draggable(true)
        .DropSources("listbox1")
        .DataValueField("ProductID")
        .DataTextField("ProductName")
        .ConnectWith("listbox1")
        .BindTo(new List<string>())
        .Selectable(ListBoxSelectable.Single)
    )
```

## See Also

* [Dragging and Dropping by the ListBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listbox/drag-and-drop)
* [Server-Side API](/api/listbox)
