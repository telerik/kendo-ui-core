---
title: ListBox
page_title: ListBox | UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the ListBox tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_listbox_aspnetcore
---

# ListBox Tag Helper

The ListBox tag helper is a server-side wrapper for the [Kendo UI ListBox](http://demos.telerik.com/aspnet-mvc/listbox/index).

It displays a list of data that is contained in a box and allows single or multiple selection, reordering of selected items, and deleting items and features keyboard navigation as well as the dragging and dropping of items. You can also connect the ListBox with another list-box and customize the widget with the use of templates, toolbar positioning, placeholder and hint, and localization of its command buttons messages.

For more information, refer to the article on the [ListBox HtmlHelper for ASP.NET MVC]({% slug overview_listboxhelper_aspnetmvc %}).

## Basic Usage

The following example demonstrates how to define the ListBox by using the ListBox tag helper.

###### Example

```tab-Razor
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
```tab-Controller
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

## Configuration

The following example demonstrates the basic configuration for the ListBox tag helper.

###### Example

```tab-Razor

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
```

## See Also

* [JavaScript API Reference of the ListBox](/api/javascript/ui/listbox)
* [ListBox HtmlHelper for ASP.NET MVC]({% slug overview_listboxhelper_aspnetmvc %})
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
