---
title: Overview
page_title: Overview | Kendo UI Window HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Window widget for ASP.NET MVC."
slug: overview_windowhelper_aspnetmvc
position: 1
---

# Window HtmlHelper Overview

The Window HtmlHelper extension is a server-side wrapper for the [Kendo UI Window](https://demos.telerik.com/kendo-ui/window/index) widget.

## Getting Started

### The Basics

There are two ways to populate the content of the Kendo UI Window for ASP.NET MVC:

* `server`&mdash;Define the content of the Window on the server.
* `ajax`&mdash;The Window gets the content through an Ajax request.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Window.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a Window.

###### Example

```tab-ASPX

        <% Html.Kendo().Window()
               .Name("window") //The name of the Window is mandatory. It specifies the "id" attribute of the widget.
               .Title("About Alvar Aalto") //Set the title of the Window.
               .Content(() => //Define the content of the Window.
               {
                   %>
                       Static content of the Window
                   <%
               })
               .Draggable() //Enable the dragging of the Window.
               .Resizable() //Enable the resizing of the Window.
               .Width(600)  //Set the width of the Window.
               .Render(); //Render the Window.
        %>
```
```tab-Razor

        @(Html.Kendo().Window()
              .Name("window") //The name of the Window is mandatory. It specifies the "id" attribute of the widget.
              .Title("About Alvar Aalto") //Set the title of the Window.
              .Content(@<text> //Define the content of the Window.
                      The static content of the Window.
              </text>)
              .Draggable() //Enable the dragging of the Window.
              .Resizable() //Enable the resizing of the Window.
              .Width(600)  //Set the width of the Window.
        )
```

### Load-on-Demand Content

Below are listed the steps for you to follow when configuring the Kendo UI Window with a load-on-demand content.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Create an action method which renders the content.

###### Example

        public ActionResult AjaxContent()
        {
            return View();
        }

**Step 4** Add a Window.

###### Example

```tab-ASPX

        <% Html.Kendo().Window()
               .Name("window") //The name of the Window is mandatory. It specifies the "id" attribute of the widget.
               .Title("About Alvar Aalto") //Set the title of the Window.
               .LoadContentFrom("AjaxContent", "Window") //Define the Action and Controller names.
        %>
```
```tab-Razor

        @(Html.Kendo().Window()
              .Name("window") //The name of the Window is mandatory. It specifies the "id" attribute of the widget.
              .Title("About Alvar Aalto") //Set the title of the Window.
              .LoadContentFrom("AjaxContent", "Window") //Define the Action and Controller names.
        )
```

### Html.BeginForms inside Windows

When a complete form should be inserted inside a Window, end the Window declaration with `.Render();` and wrap it in a non-rendering code block. This requirement does not apply if the form is defined through plain HTML tags (`&lt;form&gt;...&lt;/form&gt;`).

For more information on this topic, refer to the [article on using the Kendo UI Window with a form]({% slug overview_kendoui_window_widget %}#using-kendo-ui-window-with-a-form).

The example below demonstrates how to insert a complete form inside the Window.

###### Example

```tab-ASPX  

        <% Html.Kendo().Window()
            .Content(() =>
            {
                using (Html.BeginForm(...)) { %>
                    .........
                <% }
            })
            .Render();
        %>
```
```tab-Razor

        @{Html.Kendo().Window()
            .Content(@<text>
                @using (Html.BeginForm(...))
                {
                   .........
                }
            </text>)
            .Render();
        }
```

## Event Handling

You can subscribe to all Window [events](/api/javascript/ui/window#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().Window()
                .Name("window")
                .Events(e => e
                    .Open("window_open")
                .Close("window_close")
            )
        %>
        <script>
        function window_open() {
            //Handle the open event.
        }

        function window_close() {
            //Handle the close event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().Window()
              .Name("window")
              .Events(e => e
                    .Open("window_open")
                    .Close("window_close")
              )
        )
        <script>
        function window_open() {
            //Handle the open event.
        }

        function window_close() {
            //Handle the close event.
        }
        </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

        @(Html.Kendo().Window()
              .Name("window")
              .Events(e => e
                  .Open(@<text>
                    function() {
                        //Handle the open event inline.
                    }
                  </text>)
                  .Close(@<text>
                    function() {
                        //Handle the close event inline.
                    }
                    </text>)
              )
        )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI Window instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Window API](/api/javascript/ui/window#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Window for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the Window is used to get its client-side instance.
            var window = $("#window").data("kendoWindow");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Window:

* [ASP.NET MVC API Reference: WindowBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/WindowBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Window Widget]({% slug overview_kendoui_window_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
