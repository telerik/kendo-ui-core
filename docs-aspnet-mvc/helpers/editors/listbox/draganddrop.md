---
title: Dragging and Dropping
page_title: Dragging and Dropping | Telerik UI ListBox HtmlHelper for ASP.NET MVC
description: "Get started with the Telerik UI for ASP.NET MVC ListBox and learn how to enable the drag-and-drop functionality."
slug: draganddrop_listboxhelper_aspnetmvc
position: 4
---

# Dragging and Dropping

To enable the drag-and-drop feature of the ListBox, set it as `Draggable()` and configure its `.Draggable().DropSources("dropSourceId")` option.

You can also customize the drag-and-drop appearance of the ListBox by using its `Draggable.Placeholder` and `Draggable.Hint` templates which accept the name of a JavaScript function.

    @(Html.Kendo().ListBox()
        .Name("selected")
        .Draggable(draggable => draggable
            .Placeholder("customPlaceholder")
            .Hint("customHint")
            )
        .DropSources(new string[]{ "dropSourceId", "anotherDropSourceId" })
        .ConnectWith("#optional")
        .BindTo(new List<CustomerViewModel>())
    )
    <script>
        function customPlaceholder(draggedItem) {
            return draggedItem
                .clone()
                .addClass("custom-placeholder");
        }

        function customHint(draggedItem) {
            return draggedItem
                .clone()
                .addClass("custom-hint");
        }
    </script>

## See Also

* [Dragging and Dropping by the ListBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/listbox/drag-and-drop)
* [Server-Side API](/api/listbox)
