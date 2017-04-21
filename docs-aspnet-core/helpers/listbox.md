---
title: ListBox
page_title: ListBox | UI for ASP.NET Core Tag Helpers
description: "Learn how to configure the ListBox html helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_listbox_aspnetcore
---

# ListBox HtmlHelper Overview

The ListBox HtmlHelper extension is a server-side wrapper for the [Kendo UI ListBox](http://demos.telerik.com/aspnet-core/listbox/index). It displays a list of data contained in a box and allows single or multiple selection, reordering, deleting items and features keyboard navigation as well as drag and drop. The Kendo UI ListBox can be connected with another listbox. The widget can be customized with the use of templates, toolbar positioning, placeholder and hint and command buttons messages localization.
For a more detailed overview of the ListBox HtmlHelper check the ASP.NET MVC section of the documentation at [The ListBox HtmlHelper Overview]({% slug overview_listboxhelper_aspnetmvc %}).

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

### Configuration

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

* [JavaScript API Reference](/api/javascript/ui/listbox)
* [The ListBox HtmlHelper in details]({% slug overview_listboxhelper_aspnetmvc %})
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
