---
title: Overview
page_title: ListBox | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI ListBox widget for ASP.NET MVC."
slug: overview_listboxhelper_aspnetmvc
position: 1
---

# ListBox HtmlHelper Overview

The ListBox HtmlHelper extension is a server-side wrapper for the [Kendo UI ListBox](http://demos.telerik.com/aspnet-mvc/listbox/index).

It displays a list of data that is contained in a box and allows single or multiple selection, reordering of selected items, and deleting items and features keyboard navigation as well as the dragging and dropping of items. You can also connect the ListBox with another list-box and customize the widget with the use of templates, toolbar positioning, placeholder and hint, and localization of its command buttons messages.

## Getting Started

To start using the ListBox, you can use either:

* [Server-binding with static data](#server-binding-with-static-data), or
* [Ajax binding](#ajax-binding).

> **Important**
>
> When you use complex data objects, set the `DataTextField("TextField")` and `DataValueField("ValueField")` properties to notify the widget of your preferred binding behavior.

### Server-Binding with Static Data

The following example demonstrates how to bind the ListBox on the server when you use static data.

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

### Ajax Binding

The following example demonstrates how to bind the `DataSource` component to remote data.

###### Example

    @(Html.Kendo().ListBox()
        .Name("listbox")
        .Toolbar(toolbar => toolbar.Tools(
            tools => tools
                .MoveUp()
                .MoveDown()
                .Remove()
         ))
        .DataValueField("ProductID")
        .DataTextField("ProductName")
        .DataSource(source => source
            .Read(r => r.Action("GetProducts", "ListBox"))
        )
    )

## Features

The ListBox delivers the following features:

* [Selection](#selection)
* [Reordering of selected items](#reordering-of-selections)
* [Dragging and dropping of items](#dragging-and-dropping)
* [Item templates](#item-templates)
* [Localization](#localization)

### Selection

The ListBox has a default `single` selection. To configure multiple selection, add `selectable: "multiple"` to its settings. When selected, multiple selected items move together, that is, the selected items are transferred to another Kendo UI ListBox together or reordered as a set among other items.

### Reordering of Selections

Selected items can be reordered by using any of the following approaches:

1. The `moveUp` and `moveDown` command buttons of the toolbar.
1. The drag-and-drop functionality if the widget is `draggable`.
1. The `Ctrl`+`Shift`+ <kbd>&darr;</kbd> or `Ctrl`+`Shift`+ <kbd>&uarr;</kbd> keyboard combination.

> **Important**
>
> Currently, the widget does not support the drag-and-drop feature for multiple selected items.

### Dragging and Dropping

To enable the drag-and-drop feature of the ListBox, set it as `Draggable()` and configure its `.Draggable().DropSources("dropSourceId")` option. You can also customize the drag-and-drop behavior of the widget by using a draggable placeholder hint templates which accept the name of a JavaScript function.

###### Example

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

### Item Templates

The ListBox supports the use of [templates](https://docs.telerik.com/kendo-ui/framework/templates/overview) for its items that are passed as а function or string.

###### Example

    <script id="customer-item-template" type="text/x-kendo-template">
        <span class="k-state-default" style="background-image: url('../content/web/Customers/#:data.CustomerID#.jpg')"></span>
        <span class="k-state-default"><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>
    </script>

    @(Html.Kendo().ListBox()
        .Name("selected")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .TemplateId("customer-item-template")
        .BindTo(new List<CustomerViewModel>())
    )

### Localization

You can configure the ListBox `Messages()` for each toolbar command button. The messages serve as tooltip text when the user hovers over the buttons.

###### Example

    @(Html.Kendo().ListBox()
        .Name("listbox")
        .Toolbar(toolbar => toolbar.Tools(
            tools => tools
                .MoveUp()
                .MoveDown()
                .TransferTo()
                .TransferFrom()
                .TransferAllTo()
                .TransferAllFrom()
                .Remove()
        ))
        .Messages(messages => messages.Tools(tools => {
            tools.MoveUp("Up");
            tools.MoveDown("Down");
            tools.TransferTo("Move To");
            tools.TransferFrom("Move From");
            tools.Remove("Delete");
        }))
    )

## See Also

* [JavaScript API Reference of the ListBox](http://docs.telerik.com/kendo-ui/api/javascript/ui/listbox)
* [ListBox Official Demo](http://demos.telerik.com/aspnet-mvc/listbox/index)
