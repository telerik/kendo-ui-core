---
title: ListBox
page_title: ListBox | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the ListBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_listbox_aspnetcore
---

# ListBox HtmlHelper Overview

The ListBox HtmlHelper extension is a server-side wrapper for the [Kendo UI ListBox](https://demos.telerik.com/kendo-ui/listbox/index).

It displays a list of data that is contained in a box and allows single or multiple selection, reordering of selected items, and deleting items and features keyboard navigation as well as the dragging and dropping of items. You can also connect the ListBox with another list-box and customize the widget with the use of templates, toolbar positioning, placeholder and hint, and localization of its command buttons messages.

For more information on the HtmlHelper, refer to the article on the [ListBox HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/listbox/overview).

## Basic Usage

The following example demonstrates how to define the ListBox by using the ListBox HtmlHelper.

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

The following example demonstrates the basic configuration for the ListBox HtmlHelper.

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

* [JavaScript API Reference of the ListBox](http://docs.telerik.com/kendo-ui/api/javascript/ui/listbox)
* [ListBox HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/listbox/overview)
* [ListBox Official Demos](http://demos.telerik.com/aspnet-core/listbox/index)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
