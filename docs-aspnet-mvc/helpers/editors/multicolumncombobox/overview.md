---
title: Overview
page_title: MultiColumnComboBox Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET MVC."
slug: overview_multicolumncombobox_aspnetmvc
position: 1
---

# MultiColumnComboBox HtmlHelper Overview

The Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI MultiColumnComboBox widget.

The MultiColumnComboBox visualizes huge sets of data in a grid-like table.

* [Demo page for the MultiColumnComboBox](https://demos.telerik.com/aspnet-mvc/multicolumncombobox)

## Basic Configuration

The following example demonstrates the basic configuration of the MultiColumnComboBox HtmlHelper and how to get the MultiColumnComboBox instance.

```
    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .Placeholder("Select product")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .HtmlAttributes(new { style = "width:100%;" })
        .Filter("contains")
        .AutoBind(true)
        .MinLength(3)
        .Height(400)
        .DataSource(source => source
            .Read(read => read.Action("Products_Read", "MultiColumnComboBox"))
            .ServerFiltering(true)
        )
        .Events(events => events
            .Change("onChange")
            .Select("onSelect")
            .Open("onOpen")
            .Close("onClose")
            .DataBound("onDataBound")
            .Filtering("onFiltering")
        )
    )

    <script type="text/javascript">
        $(function () {
            // The Name() of the MultiColumnComboBox is used to get its client-side instance.
            var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
            console.log(multicolumncombobox);
        });
    </script>
```

## Functionality and Features

* [Data binding]({% slug binding_multicolumncombo_aspnetmvc %})
* [Columns]({% slug columns_multicolumncombobox_aspnetmvc %})
* [Filtering]({% slug filtering_multicolumncombobox_aspnetmvc %})
* [Virtualization]({% slug virtualization_multicolumncombobox_aspnetmvc %})
* [Grouping]({% slug grouping_multicolumncombobox_aspnetmvc %})

## Events

You can subscribe to all MultiColumnComboBox [events](/api/multicolumncombobox). For a complete example on basic MultiColumnComboBox events, refer to the [demo on using the events of the MultiColumnComboBox](https://demos.telerik.com/aspnet-mvc/multicolumncombobox/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```Razor
    @(Html.Kendo().MultiColumnComboBox()
      .Name("multicolumncombobox")
      .BindTo(new string[] { "Item1", "Item2", "Item3" })
      .Events(e => e
            .Select("multicolumncombobox_select")
            .Change("multicolumncombobox_change")
      )
    )
    <script>
        function multicolumncombobox_select() {
            // Handle the select event.
        }

        function multicolumncombobox_change() {
            // Handle the change event.
        }
    </script>
```
```ASPX
    <%: Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("multicolumncombobox_select")
            .Change("multicolumncombobox_change")
        )
    %>
    <script>
        function multicolumncombobox_select() {
            // Handle the select event.
        }

        function multicolumncombobox_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select(@<text>
                function() {
                    // Handle the select event inline.
                }
            </text>)
            .Change(@<text>
                function() {
                    // Handle the change event inline.
                }
                </text>)
        )
    )

## Referencing Existing Instances

To reference an existing Kendo UI MultiColumnComboBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [MultiColumnComboBox API](http://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox#methods) to control its behavior.

    // Place the following after the MultiColumnComboBox for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the MultiColumnComboBox is used to get its client-side instance.
            var multicolumncombobox = $("#productMultiColumnComboBox").data("kendoMultiColumnComboBox");
        });
    </script>

## See Also

* [Basic Usage of the MultiColumnComboBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multicolumncombobox/index)
* [Using the API of the MultiColumnComboBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multicolumncombobox/api)
* [MultiColumnComboBoxBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiColumnComboBoxBuilder)
* [MultiColumnComboBox Server-Side API](/api/multicolumncombobox)
