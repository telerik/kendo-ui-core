---
title: Overview
page_title: DropDownTree | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI DropDownTree widget for ASP.NET MVC."
slug: overview_dropdowntreehelper_aspnetmvc
position: 1
---

# DropDownTree HtmlHelper Overview

The DropDownTree HtmlHelper extension is a server-side wrapper for the [Kendo UI DropDownTree](https://demos.telerik.com/kendo-ui/dropdowntree/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DropDownTree.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

        public ActionResult Index()
        {
            return View();
        }

1. Add a DropDownTree.

    ```Razor
        @(Html.Kendo().DropDownTree()
            .Name("dropdowntree") //The name of the dropdowntree is mandatory. It specifies the "id" attribute of the widget.
            .Items(items =>
            {
                items.Add().Text("Root Item 1")
                    .Items(childred =>
                    {
                        childred.Add().Text("Child Item 1");
                        childred.Add().Text("Child Item 2");
                    });
                items.Add().Text("Root Item 2"); //Add item with text "Item2")
            })
        )
    ```
    ```ASPX
        <%: Html.Kendo().DropDownTree()
            .Name("dropdowntree") //The name of the dropdowntree is mandatory. It specifies the "id" attribute of the widget.
            .Items(items =>
            {
                items.Add().Text("Root Item 1")
                    .Items(childred =>
                    {
                        childred.Add().Text("Child Item 1");
                        childred.Add().Text("Child Item 2");
                    });
                items.Add().Text("Root Item 2"); //Add item with text "Item2")
            })
        %>
    ```

## Event Handling

You can subscribe to all DropDownTree [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree#events).

### By Handler Name

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
            //Handle the expand event
        }

        function onCollapse() {
            //Handle the collapse event
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
            //Handle the expand event
        }

        function onCollapse() {
            //Handle the collapse event
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .Events(e => e
            .Expand(@<text>
            function() {
                //Handle the expand event inline
            }
            </text>)
            .Collapse(@<text>
            function() {
                //Handle the collapse event inline
            }
            </text>)
        )
    )

## Reference

### Existing Instances

To reference an existing Kendo UI DropDownTree instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DropDownTree API](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree#methods) to control its behavior.

###### Example

    //Put this after your Kendo DropDownTree for ASP.NET MVC declaration
    <script>
        $(function() {
            // Notice that the Name() of the dropdowntree is used to get its client-side instance
            var dropdowntree = $("#dropdowntree").data("kendoDropDownTree");
        });
    </script>

## See Also

* [Telerik UI for ASP.NET MVC API Reference: DropDownTreeBuilder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/DropDownTreeBuilder)
* [Ajax Binding of the DropDownTree HtmlHelper]({% slug ajaxbinding_dropdowntreehelper_aspnetmvc %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
