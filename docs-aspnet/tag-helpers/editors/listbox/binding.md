---
title: Data Binding
page_title: Data Binding
description: "Bind the Telerik UI ListBox TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC) to server-side arrays or client-side arrays, and to remote data."
slug: databinding_listbox_aspnetcore
position: 2
---

# Data Binding

The ListBox provides options for binding it to [server-side arrays](#server-side-arrays), [client-side arrays](#client-side-arrays), and to [remote data](#remote-data).

## Server-Side Arrays

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

## Client-Side Arrays

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

## Remote Data

The following example demonstrates how to bind the Kendo UI ListBox TagHelper to a remote service.

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

## See Also

* [Basic Usage of the ListBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listbox/tag-helper)
* [Server-Side API](/api/listbox)
