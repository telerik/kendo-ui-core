---
title: Overview
page_title: ListBox Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Telerik UI ListBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/listbox
slug: htmlhelpers_listbox_aspnetcore
position: 1
---

# ListBox HtmlHelper Overview

The Telerik UI ListBox HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI ListBox widget.

The ListBox provides suggestions depending on the typed text and allows multiple value entries. displays a list of data that is contained in a box and allows single or multiple selection, reordering of selected items, and deleting items and features keyboard navigation as well as the dragging and dropping of items. You can also connect the ListBox with another list-box and customize the widget with the use of templates, toolbar positioning, placeholder and hint, and localization of its command buttons messages.

* [Demo page for the ListBox](https://demos.telerik.com/aspnet-core/listbox/index)

## Initializing the ListBox

The following example demonstrates how to define the ListBox by using the ListBox HtmlHelper.

```Razor
   @(Html.Kendo().ListBox()
        .Name("optional")
        .Toolbar(toolbar =>
        {
            toolbar.Position(Kendo.Mvc.UI.Fluent.ListBoxToolbarPosition.Right);
            toolbar.Tools(tools => tools
                .MoveUp()
                .MoveDown()
            );
        })
        .BindTo(ViewBag.Attendees)
    )
```
```Controller
    public ActionResult Index()
    {
        ViewBag.Attendees = new List<string>
        {
            "Steven White",
            "Nancy King",
            "Nancy Davolio",
            "Robert Davolio",
            "Michael Leverling",
            "Andrew Callahan",
            "Michael Suyama"
        };
        return View();
    }
```

## Basic Configuration

The following example demonstrates the basic configuration for the ListBox HtmlHelper.

    @(Html.Kendo().ListBox()
        .Name("optional")
        .Toolbar(toolbar =>
        {
            toolbar.Position(ListBoxToolbarPosition.Right);
            toolbar.Tools(tools => tools
                .MoveUp()
                .MoveDown()
                .TransferTo()
                .TransferFrom()
                .TransferAllTo()
                .TransferAllFrom()
                .Remove()
            );
        })
        .ConnectWith("#selected")
        .Selectable(ListBoxSelectable.Multiple)
        .TemplateId("customer-item-template")
        .Draggable(draggable => draggable.Placeholder("customPlaceholder"))
        .DropSources("selected")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .DataSource(source => source
            .Transport(transport => transport
                .Read(read => read.Action("GetCustomers", "ListBox"))
            )
        )
        .Events(events => events
            .Add("onAdd")
            .Change("onChange")
            .DataBound("onDataBound")
            .DragStart("onDragStart")
            .Drag("onDrag")
            .Drop("onDrop")
            .DragEnd("onDragEnd")
            .Remove("onRemove")
            .Reorder("onReorder")
        )
    )

## Events

For a complete example on basic ListBox events, refer to the [demo on using the events of the ListBox](https://demos.telerik.com/aspnet-core/listbox/events).

## See Also

* [Basic Usage of the ListBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listbox/index)
* [Using the API of the ListBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listbox/api)
* [API Reference of the ListBox HtmlHelper for ASP.NET Core](/api/listbox)
