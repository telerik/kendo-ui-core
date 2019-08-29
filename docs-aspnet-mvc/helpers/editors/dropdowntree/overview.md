---
title: Overview
page_title: DropDownTree Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI DropDownTree HtmlHelper for ASP.NET MVC."
slug: overview_dropdowntreehelper_aspnetmvc
position: 1
---

# DropDownTree HtmlHelper Overview

The Telerik UI DropDownTree HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI DropDownTree widget.

The DropDownTree represents an editor of hierarchical data, rendered in a tree-like structure, which provides multiple selection option and custom nodes.

* [Demo page for the DropDownTree](https://demos.telerik.com/aspnet-mvc/dropdowntree)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a DropDownTree.

    ```Razor
        @(Html.Kendo().DropDownTree()
            .Name("dropdowntree") // The name of the DropDownTree is mandatory. It specifies the "id" attribute of the DropDownTree.
            .Items(items =>
            {
                items.Add().Text("Root Item 1")
                    .Items(childred =>
                    {
                        childred.Add().Text("Child Item 1");
                        childred.Add().Text("Child Item 2");
                    });
                items.Add().Text("Root Item 2"); // Add an item with text "Item2".
            })
        )
    ```
    ```ASPX
        <%: Html.Kendo().DropDownTree()
            .Name("dropdowntree") // The name of the DropDownTree is mandatory. It specifies the "id" attribute of the DropDownTree.
            .Items(items =>
            {
                items.Add().Text("Root Item 1")
                    .Items(childred =>
                    {
                        childred.Add().Text("Child Item 1");
                        childred.Add().Text("Child Item 2");
                    });
                items.Add().Text("Root Item 2"); // Add an item with text "Item2".
            })
        %>
    ```

## Functionality and Features

The DropDownTree provides options for [Ajax binding]({% slug ajaxbinding_dropdowntreehelper_aspnetmvc %}).

## Events

You can subscribe to all DropDownTree [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree#events). For a complete example on basic DropDownTree events, refer to the [demo on using the events of the DropDownTree](https://demos.telerik.com/aspnet-mvc/dropdowntree/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```Razor
    @(Html.Kendo().DropDownTree()
            .Name("dropdowntree")
            .Events(e => e
                .Expand("onExpand")
                .Collapse("onCollapse")
            )
    )
    <script>
        function onExpand() {
            // Handle the expand event.
        }

        function onCollapse() {
            // Handle the collapse event.
        }
    </script>
```
```ASPX
    <%: Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .Events(e => e
            .Expand("onExpand")
            .Collapse("onCollapse")
        )
    %>
    <script>
        function onExpand() {
            // Handle the expand event.
        }

        function onCollapse() {
            // Handle the collapse event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
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

To reference an existing DropDownTree instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DropDownTree client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree#methods) to control its behavior.

    // Place the following after the DropDownTree for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the DropDownTree is used to get its client-side instance.
            var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
        });
    </script>

## See Also

* [Basic Usage of the DropDownList HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/dropdowntree)
* [Using the API of the DropDownTree HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/dropdowntree/api)
* [DropDownTreeBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/DropDownTreeBuilder)
* [DropDownTree Server-Side API](/api/dropdowntree)
