---
title: Overview
page_title: Overview | Kendo UI ListBox HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI ListBox widget for ASP.NET MVC."
slug: overview_listboxhelper_aspnetmvc
position: 1
---

# ListBox HtmlHelper Overview

The ListBox HtmlHelper extension is a server-side wrapper for the [Kendo UI ListBox](http://demos.telerik.com/aspnet-mvc/listbox/index). It displays a list of data contained in a box and allows single or multiple selection, reordering, deleting items and features keyboard navigation as well as drag and drop. The Kendo UI ListBox can be connected with another listbox. The widget can be customized with the use of templates, toolbar positioning, placeholder and hint and command buttons messages to facilitate localization.

## Getting Started

### Initialize the ListBox

### Server Binding with Static Data

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

> **Important**
>
> When using complex data objects, use the `DataTextField("TextField")` and `DataValueField("ValueField")` properties to notify the widget of your preferred binding behaviour.

### Ajax Binding

You can bind the `DataSource` to remote data as shown in the example below.

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

### Selection

The Kendo UI ListBox has a default `single` selection. To configure multiple selection, add `.Selectable(ListBoxSelectable.Multiple)` to its settings. Multiple selected items will move together when selected, i.e. the selected items will be transfered to another Kendo UI ListBox together or reordered as a set among other items.

### Reorder Selected Items

Selected items can be reordered with the toolbar `MoveUp()` and `MoveDown()` command buttons, drag and drop if the widget is `Draggable()` and with keyboard navigation <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>&darr;</kbd> or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>&uarr;</kbd>

> **Important**
>
> Currently multiple selected items cannot be dragged & dropped

### Drag and Drop

The Kendo Ui ListBox drag and drop functionality can be enabled by setting it as `Draggable()` and configuring its `.Draggable().DropSources("dropSourceId")`. The drag and drop behaviour can be customized with a draggable placeholder hint templates which accept the name of a JavaScript function.

##### Example

```tab-Razor

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
```

### Templates

The Kendo UI ListBox supports the use of [templates]({% slug overview_kendoui_templatescomponent %}) for its items passed as function or string.

##### Example

```tab-Razor

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

```

### Localization

The Kendo UI ListBox `Messages()` can be configured for each toolbar command button. The messages serve as tooltip text when a user hovers over the buttons.

##### Example

```tab-Razor

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
     }
     ))
    )

```   

## See Also

Other resources for the Kendo UI ListBox:

* [JavaScript API Reference](/api/javascript/ui/listbox)
* [Official Demos Site](http://demos.telerik.com/aspnet-mvc/listbox/index)
