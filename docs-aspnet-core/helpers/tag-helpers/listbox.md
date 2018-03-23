---
title: ListBox
page_title: ListBox | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the ListBox tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_listbox_aspnetcore
---

# ListBox Tag Helper Overview

The ListBox tag helper helps you configure the Kendo UI ListBox widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the ListBox by using the ListBox tag helper.

###### Example

```tab-tagHelper

        <kendo-listbox name="optional" connect-with="selected" bind-to="ViewBag.Attendees">
            <toolbar position="ListBoxToolbarPosition.Right"
                     tools='new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"}' />
        </kendo-listbox>

        <kendo-listbox name="selected" selectable="ListBoxSelectable.Multiple" bind-to="new List<string>()">
        </kendo-listbox>

```
```tab-cshtml

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

### Bind to Server-side Array

The following example demonstrates how to initialize the ListBox and bind it to a server-side array.

```tab-tagHelper

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
```tab-cshtml

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

When you use complex data objects, use the `dataTextField` and `dataValueField` properties to notify the widget of your preferred binding behavior.

### Bind to Client-side Array

The following example demonstrates how to initialize the ListBox and bind it to a client-side array.

```tab-tagHelper

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
```tab-cshtml

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

### Bind to Remote Data

You can also bind the `DataSource` to remote data. The following example demonstrates how to bind the Kendo ListBox tag helper to a remote service.

```tab-tagHelper

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
```tab-cshtml

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

### Selection

The ListBox has a default `single` selection. To configure multiple selection, add `selectable="ListBoxSelectable.Multiple" ` to its settings. When selected, multiple selected items move together, that is, the selected items are transferred to another Kendo ListBox tag helper together or reordered as a set among other items.

### Reordering of Selections

Selected items can be reordered by using any of the following approaches:

1. The `moveUp` and `moveDown` command buttons of the toolbar.
1. The drag-and-drop functionality if the widget is `draggable`.
1. The `Ctrl`+`Shift`+ <kbd>&darr;</kbd> or `Ctrl`+`Shift`+ <kbd>&uarr;</kbd> keyboard combination.

> **Important**
>
> Currently, the widget does not support the drag-and-drop feature for multiple selected items.

###### Example

```tab-tagHelper

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
```tab-cshtml

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

##### Example

```tab-tagHelper

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
```tab-cshtml

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

### Item Templates

The ListBox supports the use of templates for its items that are passed as а function or string.

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
