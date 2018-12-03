---
title: Overview
page_title: ListBox | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI ListBox tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_listbox_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/listbox
position: 1
---

# ListBox Tag Helper Overview

The ListBox tag helper helps you configure the Kendo UI ListBox widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the ListBox by using the ListBox tag helper.

```tagHelper

        <kendo-listbox name="optional" connect-with="selected" bind-to="ViewBag.Attendees">
            <toolbar position="ListBoxToolbarPosition.Right"
                     tools='new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"}' />
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

## Data Binding

You can bind the ListBox to:

* [Server-side arrays](#binding-to-server-side-arrays)
* [Client-side arrays](#binding-to-client-side-arrays)
* [Remote data](#binding-to-remote-data)

### Binding to Server-Side Arrays

When you use complex data objects, apply the `dataTextField` and `dataValueField` properties to notify the widget of your preferred binding behavior.

The following example demonstrates how to initialize the ListBox and bind it to a server-side array.

```tagHelper

    var data = new string[] {
        "Washington",
        "London",
        "Canberra",
        "Ottawa",
        "Sofia",
        "Moscow",
        "Madrid"
    };

    <kendo-listbox name="listbox"  bind-to="data">
        <toolbar position="ListBoxToolbarPosition.Right"
                    tools='new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"}' />
    </kendo-listbox>

```
```cshtml

    var data = new string[] {
        "Washington",
        "London",
        "Canberra",
        "Ottawa",
        "Sofia",
        "Moscow",
        "Madrid"
    };

    @(Html.Kendo().ListBox().Name("listbox")
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
            .BindTo(data)
    )
```

### Binding to Client-Side Arrays

The following example demonstrates how to initialize the ListBox and bind it to a client-side array.

```tagHelper

    <kendo-listbox name="listbox" datasource-id="dataSource">
        <toolbar position="ListBoxToolbarPosition.Right"
                    tools='new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"}' />
    </kendo-listbox>

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                "Washington",
                "London",
                "Canberra",
                "Ottawa",
                "Sofia",
                "Moscow",
                "Madrid"]
        })
    </script>
```
```cshtml

    @(Html.Kendo().ListBox().Name("listbox")
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
                .DataSource("dataSource")
        )

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                "Washington",
                "London",
                "Canberra",
                "Ottawa",
                "Sofia",
                "Moscow",
                "Madrid"]
        })
    </script>
```

### Binding to Remote Data

The following example demonstrates how to bind the Kendo UI ListBox tag helper to a remote service.

```tagHelper

    <kendo-listbox name="listbox"  datatextfield="ProductName" datavaluefield="ProductID">
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

## Selection

The ListBox has a default `single` selection mode. To configure a multiple selection, add `selectable="ListBoxSelectable.Multiple" ` to its settings. When selected, multiple selected items move together, that is, the selected items are transferred to another Kendo UI ListBox tag helper together or reordered as a set among other items.

### Reordering of Selections

You can reorder selected items by using any of the following approaches:

* The **Move Up** and **Move Down** command buttons of the toolbar.
* The drag-and-drop functionality if the widget is `draggable`.
* The `Ctrl`+`Shift`+ <kbd>&darr;</kbd> or `Ctrl`+`Shift`+ <kbd>&uarr;</kbd> keyboard combinations.

> **Important**
>
> Currently, the ListBox widget does not support the drag-and-drop feature for multiple selected items.

```tagHelper

    <kendo-listbox name="listbox"  datatextfield="ProductName" datavaluefield="ProductID">
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

### Dragging and Dropping

To enable the drag-and-drop feature of the ListBox, set its `draggable` property to `true`. You can also customize the drag-and-drop behavior of the widget by using its `draggable.placeholder` and `draggable.hint` options.

```tagHelper

    <kendo-listbox name="listbox" template-id="template" selectable="ListBoxSelectable.Multiple"  datatextfield="ProductName" datavaluefield="ProductID">
            <draggable hint="hint" enabled="true" placeholder="placeholder" />
            <datasource>
                <transport>
                    <read datatype="jsonp" url="https://demos.telerik.com/kendo-ui/service/Products" />
                </transport>
            </datasource>
            <toolbar position="ListBoxToolbarPosition.Right"
                        tools='new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"}' />
        </kendo-listbox>

    <script type="text/kendo-x-tmpl" id="template">
        <h5 style="background-color:aqua">#=ProductName#</h5>
    </script>

```
```cshtml

    @(Html.Kendo().ListBox().Name("listbox")
                        .DataTextField("ProductName")
                        .TemplateId("template")
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
                        .DataSource(x =>
                            x.Custom()
                            .Transport(y => y.Read(z => z.Url("https://demos.telerik.com/kendo-ui/service/Products").DataType("jsonp"))))
    )

    <script type="text/kendo-x-tmpl" id="template">
        <h5 style="background-color:aqua">#=ProductName#</h5>
    </script>
```

## Item Templates

The ListBox supports the use of templates for its items that are passed as а function or string.

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
