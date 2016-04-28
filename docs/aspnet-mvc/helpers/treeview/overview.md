---
title: Overview
page_title: Overview | Kendo UI TreeView HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI TreeView widget for ASP.NET MVC."
slug: overview_treeviewhelper_aspnetmvc
position: 1
---

# TreeView HtmlHelper Overview

The TreeView HtmlHelper extension is a server-side wrapper for the [Kendo UI TreeView](https://demos.telerik.com/kendo-ui/treeview/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TreeView.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a TtreeView.

###### Example

```tab-ASPX

        <%: Html.Kendo().TreeView()
                .Name("treeview") //The name of the treeview is mandatory. It specifies the "id" attribute of the widget.
                .Items(items =>
                {
                    items.Add().Text("Item 1"); //Add item with text "Item1")
                    items.Add().Text("Item 2"); //Add item with text "Item2")
                })
        %>
```
```tab-Razor

        @(Html.Kendo().TreeView()
              .Name("treeview") //The name of the treeview is mandatory. It specifies the "id" attribute of the widget.
              .Items(items =>
              {
                  items.Add().Text("Item 1"); //Add item with text "Item1")
                  items.Add().Text("Item 2"); //Add item with text "Item2")
              })
        )
```

### Security Trimming

The Kendo UI TreeView widget has a built-in security trimming functionality, which is enabled by default. If the URL, which the TreeView item points to, is not authorized, then it is hidden. Security trimming depends on the [ASP.NET MVC Authorization](http://www.asp.net/mvc/tutorials/mvc-music-store/mvc-music-store-part-7). Every `action` method decorated with [`AuthorizeAttribute`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.aspx) checks whether the user is authorized and allows or forbids the request.

For more information on the ASP.NET MVC Authorization, refer to [this link](http://weblogs.asp.net/jgalloway/archive/2011/04/28/looking-at-how-asp-net-mvc-authorize-interacts-with-asp-net-forms-authorization.aspx).

The TreeView hides the Menu item if the [`OnAuthorization`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.onauthorization.aspx) method returns
[`HttpUnauthorizedResult`](http://msdn.microsoft.com/en-us/library/system.web.mvc.httpunauthorizedresult.aspx).

To use a custom `AuthorizeAttribute`, refer to [this link](https://github.com/telerik/kendo-examples-asp-net-mvc/tree/master/kendo-menu-with-custom-authorization-attribute).

## Event Handling

You can subscribe to all TreeView [events](/api/javascript/ui/treeview#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().TreeView()
                .Name("treeview")
                .Events(e => e
                    .Expand("treeview_expand")
                    .Collapse("treeview_collapse")
                )
        %>
        <script>
        function treeview_collapse() {
            //Handle the collapse event
        }

        function treeview_expand() {
            //Handle the expand event
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().TreeView()
              .Name("treeview")
              .Events(e => e
                    .Expand("treeview_expand")
                    .Collapse("treeview_collapse")
              )
        )
        <script>
        function treeview_collapse() {
            //Handle the collapse event
        }

        function treeview_expand() {
            //Handle the expand event
        }
        </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

        @(Html.Kendo().TreeView()
              .Name("treeview")
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
```

## Reference

### Existing Instances

You can reference an existing Kendo UI TreeView instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [TreeView API](/api/javascript/ui/treeview#methods) to control its behavior.

###### Example

        //Put this after your Kendo TreeView for ASP.NET MVC declaration
        <script>
        $(function() {
            // Notice that the Name() of the treeview is used to get its client-side instance
            var treeview = $("#treeview").data("kendoTreeView");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the TreeView:

* [ASP.NET MVC API Reference: TreeViewBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/TreeViewBuilder)
* [Ajax Binding of the TreeView HtmlHelper]({% slug ajaxbinding_treeviewhelper_aspnetmvc %})
* [How to Bind TreeViews to XML]({% slug howto_bindtoaml_treeviewaspnetmvc %})
* [How to Integrate with Sharepoint]({% slug howto_integratewithsharepoint_treeviewaspnetmvc %})
* [How to Save the State of TreeView Items]({% slug howto_savetreeviewitemsstate_treeviewaspnetmvc %})
* [Overview of the Kendo UI TreeView Widget]({% slug overview_kendoui_treeview_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
