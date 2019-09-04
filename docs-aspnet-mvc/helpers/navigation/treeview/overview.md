---
title: Overview
page_title: TreeView Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI TreeView HtmlHelper for ASP.NET MVC."
slug: overview_treeviewhelper_aspnetmvc
position: 1
---

# TreeView HtmlHelper Overview

The Telerik UI TreeView HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI TreeView widget.

The TreeView displays hierarchical data in a traditional tree structure.

* [Demo page for the TreeView](https://demos.telerik.com/aspnet-mvc/treeview)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a TtreeView.

    ```ASPX
        <%: Html.Kendo().TreeView()
            .Name("treeview") // The name of the TreeView is mandatory. It specifies the "id" attribute of the TreeView.
            .Items(items =>
            {
                items.Add().Text("Item 1"); // Add item with text "Item1".
                items.Add().Text("Item 2"); // Add item with text "Item2".
            })
        %>
    ```
    ```Razor
        @(Html.Kendo().TreeView()
            .Name("treeview") // The name of the TreeView is mandatory. It specifies the "id" attribute of the TreeView.
            .Items(items =>
            {
                items.Add().Text("Item 1"); // Add item with text "Item1".
                items.Add().Text("Item 2"); // Add item with text "Item2".
            })
        )
    ```

## Functionality and Features

* [Ajax binding]({% slug ajaxbinding_treeviewhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldingtreeview_aspnetmvc %})
* [Security trimming]({% slug securitytrimmings_treeviewhelper_aspnetmvc %})

## Events

You can subscribe to all TreeView [events](/api/treeview). For a complete example on basic TreeView events, refer to the [demo on using the events of the TreeView](https://demos.telerik.com/aspnet-mvc/treeview/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().TreeView()
            .Name("treeview")
            .Events(e => e
                .Expand("treeview_expand")
                .Collapse("treeview_collapse")
            )
    %>
    <script>
        function treeview_collapse() {
            // Handle the collapse event.
        }

        function treeview_expand() {
            // Handle the expand event.
        }
    </script>
```
```Razor
    @(Html.Kendo().TreeView()
            .Name("treeview")
            .Events(e => e
                .Expand("treeview_expand")
                .Collapse("treeview_collapse")
            )
    )
    <script>
        function treeview_collapse() {
            // Handle the collapse event.
        }

        function treeview_expand() {
            // Handle the expand event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().TreeView()
        .Name("treeview")
        .Events(e => e
            .Expand(@<text>
            function() {
                // Handle the expand event inline.
            }
            </text>)
            .Collapse(@<text>
            function() {
                // Handle the collapse event inline.
            }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing TreeView instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [TreeView client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/treeview#methods) to control its behavior.

    // Place this after the TreeView for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the TreeView is used to get its client-side instance.
            var treeview = $("#treeview").data("kendoTreeView");
        });
    </script>

## See Also

* [Basic Usage of the TreeView HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/treeview/index)
* [Using the API of the TreeView HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/treeview/api)
* [TreeViewBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TreeViewBuilder)
* [TreeView Server-Side API](/api/treeview)
